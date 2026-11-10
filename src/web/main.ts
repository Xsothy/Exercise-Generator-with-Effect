import { Catalog, Check, Entry, Problem } from "../core/index.js"
import type { Topic } from "../core/index.js"
import { h } from "./dom.js"
import { renderToken, renderTokens } from "./render.js"
import "./style.css"

// ---------------------------------------------------------------------------
// State: the worksheet is fully described by the URL hash, so a link (or the
// code printed on the sheet) always reproduces the same questions and answers.
// ---------------------------------------------------------------------------

const newSeed = (): string => Math.random().toString(36).slice(2, 8).padEnd(6, "0")

const readSpec = (): Catalog.WorksheetSpec => {
    const params = new URLSearchParams(location.hash.slice(1))
    const fallback = Catalog.defaultSpec(newSeed())
    return Catalog.normalizeSpec({
        topicId: params.get("topic") ?? fallback.topicId,
        level: Number(params.get("level") ?? fallback.level),
        count: Number(params.get("count") ?? fallback.count),
        seed: (params.get("seed") ?? "").replace(/[^a-z0-9]/gi, "").slice(0, 12) || fallback.seed
    })
}

const specHash = (spec: Catalog.WorksheetSpec): string =>
    "#" + new URLSearchParams({
        topic: spec.topicId,
        level: String(spec.level),
        count: String(spec.count),
        seed: spec.seed
    }).toString()

let spec = readSpec()
let problems: Array<Problem.Problem> = []
/** What the student has entered so far: one string per answer box, by question index. */
let responses: Array<Array<string>> = []
let checked = false

const app = document.getElementById("app")!

const update = (changes: Partial<Catalog.WorksheetSpec>): void => {
    spec = Catalog.normalizeSpec({ ...spec, ...changes })
    history.replaceState(null, "", specHash(spec))
    regenerate()
}

const regenerate = (): void => {
    problems = Catalog.generateWorksheet(spec)
    responses = problems.map((problem) => Entry.fields(problem).map(() => ""))
    checked = false
    render()
}

// ---------------------------------------------------------------------------
// Controls
// ---------------------------------------------------------------------------

const topicOf = (): Topic => Catalog.findTopic(spec.topicId)!

const groupedTopics = (): Map<string, Array<Topic>> => {
    const groups = new Map<string, Array<Topic>>()
    for (const topic of Catalog.topics) {
        groups.set(topic.group, [...(groups.get(topic.group) ?? []), topic])
    }
    return groups
}

const renderControls = (): HTMLElement => {
    const topic = topicOf()

    const topicSelect = h(
        "select",
        {
            id: "topic",
            onchange: (event) => update({ topicId: (event.target as HTMLSelectElement).value, level: 1 })
        },
        [...groupedTopics()].map(([group, topics]) =>
            h(
                "optgroup",
                { label: group },
                topics.map((item) => h("option", { value: item.id, selected: item.id === topic.id }, item.title))
            )
        )
    )

    const levels = h(
        "div",
        { class: "levels", role: "radiogroup", "aria-label": "Level" },
        topic.levels.map((_, index) =>
            h("button", {
                type: "button",
                role: "radio",
                "aria-checked": String(index + 1 === spec.level),
                class: index + 1 === spec.level ? "selected" : "",
                onclick: () => update({ level: index + 1 })
            }, String(index + 1))
        )
    )

    const count = h("input", {
        id: "count",
        type: "number",
        min: 1,
        max: Catalog.MAX_QUESTIONS,
        value: spec.count,
        inputmode: "numeric",
        onchange: (event) => update({ count: Number((event.target as HTMLInputElement).value) })
    })

    const printKey = h("input", { type: "checkbox", id: "print-key", checked: printAnswerKey })
    printKey.addEventListener("change", () => {
        printAnswerKey = printKey.checked
        document.body.classList.toggle("print-key", printAnswerKey)
    })

    return h(
        "aside",
        { class: "controls", "aria-label": "Worksheet settings" },
        h("h1", {}, "Math Exercise Generator"),
        h("p", { class: "tagline" }, "Make a worksheet, print it, or answer here and check your work."),
        h("div", { class: "field" }, h("label", { for: "topic" }, "Topic"), topicSelect),
        h(
            "div",
            { class: "field" },
            h("span", { class: "label" }, "Level"),
            levels,
            h("p", { class: "level-description" }, topic.levels[spec.level - 1]!.description)
        ),
        h("div", { class: "field" }, h("label", { for: "count" }, "Number of questions"), count),
        h(
            "button",
            { type: "button", class: "primary", onclick: () => update({ seed: newSeed() }) },
            "New questions"
        ),
        h("hr"),
        h("button", { type: "button", onclick: () => window.print() }, "Print worksheet"),
        h("label", { class: "checkbox" }, printKey, "Include answer key when printing")
    )
}

// ---------------------------------------------------------------------------
// Worksheet
// ---------------------------------------------------------------------------

let printAnswerKey = true
let showAnswerKey = false

const verdictOf = (index: number): Check.Verdict =>
    Check.check(problems[index]!.answer, Entry.compose(Entry.fields(problems[index]!), responses[index]!))

const feedback = (index: number): HTMLElement | false => {
    if (!checked) return false
    const verdict = verdictOf(index)
    const modelAnswer = () =>
        h("span", { class: "model" }, "Answer: ", renderTokens(Problem.answerTokens(problems[index]!.answer)))
    switch (verdict._tag) {
        case "Empty":
            return h(
                "p",
                { class: "feedback skipped" },
                h("span", { class: "mark" }, "–"),
                "Not answered. ",
                modelAnswer()
            )
        case "Correct":
            return h("p", { class: "feedback correct" }, h("span", { class: "mark" }, "✓"), "Correct")
        case "Almost":
            return h("p", { class: "feedback almost" }, h("span", { class: "mark" }, "!"), verdict.hint)
        case "Invalid":
            return h("p", { class: "feedback incorrect" }, h("span", { class: "mark" }, "✗"), verdict.hint)
        case "Incorrect":
            return h("p", { class: "feedback incorrect" }, h("span", { class: "mark" }, "✗"), modelAnswer())
    }
}

const boxLabels: Record<Entry.Field, string> = {
    value: "Answer",
    whole: "Whole number",
    numerator: "Numerator",
    denominator: "Denominator",
    quotient: "Quotient",
    remainder: "Remainder",
    sign: "Sign"
}

const focusBox = (index: number, part: number): void => {
    const box = app.querySelector<HTMLInputElement>(`.sheet input.box[data-index="${index}"][data-part="${part}"]`)
    box?.focus()
    box?.select()
}

/** Every answer box on the sheet, in reading order. */
const allBoxes = (): Array<HTMLInputElement> => [...app.querySelectorAll<HTMLInputElement>(".sheet input.box")]

/**
 * One masked answer box. Only characters that can belong to the answer are
 * kept, and editing after marking clears the marks so stale ticks never linger.
 */
const box = (index: number, part: number, field: Entry.Field): HTMLInputElement => {
    const input = h("input", {
        type: "text",
        class: `box box-${field}`,
        value: responses[index]![part]!,
        inputmode: field === "value" ? "decimal" : "numeric",
        maxlength: field === "value" ? 14 : 4,
        "data-index": index,
        "data-part": part,
        "aria-label": `Question ${index + 1}: ${boxLabels[field]}`,
        autocomplete: "off"
    })
    input.addEventListener("input", () => {
        const masked = Entry.mask(field, input.value)
        if (masked !== input.value) {
            const caret = Math.max(0, (input.selectionStart ?? masked.length) - (input.value.length - masked.length))
            input.value = masked
            input.setSelectionRange(caret, caret)
        }
        responses[index]![part] = masked
        if (checked) {
            checked = false
            render({ index, part, caret: input.selectionStart ?? masked.length })
        }
    })
    input.addEventListener("keydown", (event) => {
        const fields = Entry.fields(problems[index]!)
        // Typing the way a fraction is said aloud walks through its boxes: "1 3/4".
        const advances = (event.key === " " && field === "whole") ||
            (event.key === "/" && field === "numerator") ||
            (event.key.toLowerCase() === "r" && field === "quotient")
        if (advances && part + 1 < fields.length) {
            event.preventDefault()
            focusBox(index, part + 1)
        } else if (event.key === "Enter") {
            const boxes = allBoxes()
            const next = boxes[boxes.indexOf(input) + 1]
            if (next) {
                next.focus()
                next.select()
            } else checkAnswers()
        } else if (event.key === "Backspace" && input.value === "" && part > 0) {
            event.preventDefault()
            focusBox(index, part - 1)
        }
    })
    return input
}

const comparisonInput = (index: number): HTMLElement =>
    h(
        "span",
        { class: "compare", role: "radiogroup", "aria-label": `Question ${index + 1}: choose a sign` },
        h("span", { class: "compare-print" }, responses[index]![0]!),
        (["<", "=", ">"] as const).map((symbol) =>
            h("button", {
                type: "button",
                role: "radio",
                "aria-checked": String(responses[index]![0] === symbol),
                "aria-label": symbol === "<" ? "less than" : symbol === ">" ? "greater than" : "equal to",
                class: responses[index]![0] === symbol ? "selected" : "",
                onclick: () => {
                    responses[index]![0] = responses[index]![0] === symbol ? "" : symbol
                    checked = false
                    render({ index })
                }
            }, symbol)
        )
    )

/** The answer boxes for one question, laid out like the answer itself. */
const answerInput = (problem: Problem.Problem, index: number): HTMLElement => {
    const fields = Entry.fields(problem)
    const boxOf = (field: Entry.Field) => box(index, fields.indexOf(field), field)
    if (fields.includes("numerator")) {
        return h(
            "span",
            { class: "mixed entry" },
            fields.includes("whole") && boxOf("whole"),
            h("span", { class: "frac" }, boxOf("numerator"), h("span", { class: "frac-bar" }), boxOf("denominator"))
        )
    }
    if (fields.includes("quotient")) {
        return h("span", { class: "entry" }, boxOf("quotient"), h("span", { class: "op" }, "R"), boxOf("remainder"))
    }
    return h("span", { class: "entry" }, boxOf("value"))
}

const renderQuestion = (problem: Problem.Problem, index: number): HTMLElement => {
    const comparison = problem.answer._tag === "Comparison"
    const status = checked ? verdictOf(index)._tag.toLowerCase() : ""
    return h(
        "li",
        { class: `question ${status}`, "data-index": index },
        h(
            "div",
            { class: "expression" },
            problem.tokens.map((token) => (token._tag === "Blank" ? comparisonInput(index) : renderToken(token))),
            !comparison && h("span", { class: "op" }, "="),
            !comparison && answerInput(problem, index)
        ),
        feedback(index)
    )
}

const renderScore = (): HTMLElement | false => {
    if (!checked) return false
    const verdicts = problems.map((_, index) => verdictOf(index)._tag)
    const correct = verdicts.filter((tag) => tag === "Correct").length
    const almost = verdicts.filter((tag) => tag === "Almost").length
    const skipped = verdicts.filter((tag) => tag === "Empty").length
    const notes = [
        almost > 0 && `${almost} nearly right`,
        skipped > 0 && `${skipped} not answered`
    ].filter(Boolean).join(" · ")
    return h(
        "p",
        { class: "score", role: "status" },
        h("strong", {}, `${correct} / ${problems.length} correct`),
        notes && h("span", {}, notes)
    )
}

const renderSheet = (): HTMLElement => {
    const topic = topicOf()
    const shortBy = spec.count - problems.length

    return h(
        "main",
        { class: "sheet" },
        h(
            "header",
            { class: "sheet-header" },
            h(
                "div",
                {},
                h("h2", {}, topic.title),
                h("p", { class: "sheet-meta" }, `Level ${spec.level} · ${topic.levels[spec.level - 1]!.description}`)
            ),
            h(
                "dl",
                { class: "sheet-fields" },
                h("div", {}, h("dt", {}, "Name"), h("dd", {})),
                h("div", {}, h("dt", {}, "Date"), h("dd", {})),
                h("div", {}, h("dt", {}, "Score"), h("dd", {}, `/ ${problems.length}`))
            )
        ),
        shortBy > 0 &&
            h(
                "p",
                { class: "notice" },
                `This level only has ${problems.length} different questions, so the sheet is ${shortBy} short.`
            ),
        h("ol", { class: "questions" }, problems.map(renderQuestion)),
        h(
            "div",
            { class: "actions" },
            h(
                "button",
                { type: "button", class: "primary", onclick: checkAnswers },
                "Check answers"
            ),
            h("button", { type: "button", onclick: clearAnswers }, "Clear answers"),
            h(
                "button",
                {
                    type: "button",
                    "aria-expanded": String(showAnswerKey),
                    onclick: () => {
                        showAnswerKey = !showAnswerKey
                        render()
                    }
                },
                showAnswerKey ? "Hide answer key" : "Show answer key"
            ),
            renderScore()
        ),
        h("p", { class: "sheet-code" }, `Worksheet ${spec.topicId}-${spec.level}-${spec.seed}`)
    )
}

const renderAnswerKey = (): HTMLElement =>
    h(
        "section",
        { class: `key ${showAnswerKey ? "open" : ""}`, "aria-label": "Answer key" },
        h("h2", {}, `Answer key — ${topicOf().title}, level ${spec.level}`),
        h(
            "ol",
            { class: "questions" },
            problems.map((problem) => {
                const answer = renderTokens(Problem.answerTokens(problem.answer))
                return h(
                    "li",
                    { class: "question" },
                    h(
                        "div",
                        { class: "expression" },
                        problem.answer._tag === "Comparison"
                            ? problem.tokens.map((token) => (token._tag === "Blank" ? answer : renderToken(token)))
                                .flat()
                            : [...renderTokens(problem.tokens), h("span", { class: "op" }, "="), ...answer]
                    )
                )
            })
        ),
        h("p", { class: "sheet-code" }, `Worksheet ${spec.topicId}-${spec.level}-${spec.seed}`)
    )

const checkAnswers = (): void => {
    checked = true
    render()
    document.querySelector<HTMLElement>(".score")?.scrollIntoView({ block: "nearest", behavior: "smooth" })
}

const clearAnswers = (): void => {
    responses = problems.map((problem) => Entry.fields(problem).map(() => ""))
    checked = false
    render()
}

const render = (focus?: { index: number; part?: number; caret?: number }): void => {
    document.body.classList.toggle("print-key", printAnswerKey)
    app.replaceChildren(renderControls(), h("div", { class: "pages" }, renderSheet(), renderAnswerKey()))
    if (focus === undefined) return
    const question = app.querySelector<HTMLElement>(`.sheet .question[data-index="${focus.index}"]`)
    const target = question?.querySelector<HTMLElement>(
        focus.part === undefined ? ".compare button.selected, .compare button" : `input.box[data-part="${focus.part}"]`
    )
    target?.focus()
    if (target instanceof HTMLInputElement && focus.caret !== undefined) {
        target.setSelectionRange(focus.caret, focus.caret)
    }
}

window.addEventListener("hashchange", () => {
    spec = readSpec()
    regenerate()
})

history.replaceState(null, "", specHash(spec))
regenerate()
