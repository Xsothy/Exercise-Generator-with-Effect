import { describe, expect, it } from "@effect/vitest"
import { Catalog, Check, Entry, Problem, Rational } from "../src/core/index.js"

const fraction = (n: number, d: number, form: Problem.FractionForm): Problem.Answer => ({
    _tag: "Fraction",
    value: Rational.make(n, d),
    form
})

describe("Catalog", () => {
    for (const topic of Catalog.topics) {
        topic.levels.forEach((_, index) => {
            const spec = { topicId: topic.id, level: index + 1, count: 30, seed: "test" }

            it(`${topic.id} level ${index + 1} makes 30 unique, self-consistent questions`, () => {
                const problems = Catalog.generateWorksheet(spec)
                expect(problems).toHaveLength(30)
                expect(new Set(problems.map(Problem.questionText)).size).toBe(30)
                for (const problem of problems) {
                    const model = Problem.answerText(problem.answer)
                    expect(Check.check(problem.answer, model), `${Problem.questionText(problem)} = ${model}`)
                        .toEqual({ _tag: "Correct" })
                }
            })

            it(`${topic.id} level ${index + 1} is reproducible from its seed`, () => {
                expect(Catalog.generateWorksheet(spec)).toEqual(Catalog.generateWorksheet(spec))
                expect(Catalog.generateWorksheet({ ...spec, seed: "other" })).not.toEqual(
                    Catalog.generateWorksheet(spec)
                )
            })
        })
    }

    it("keeps arithmetic honest", () => {
        const evaluate: Record<string, (a: number, b: number) => number> = {
            "+": (a, b) => a + b,
            "−": (a, b) => a - b,
            "×": (a, b) => a * b
        }
        for (const topicId of ["add", "subtract", "multiply"]) {
            for (let level = 1; level <= 5; level++) {
                for (const problem of Catalog.generateWorksheet({ topicId, level, count: 20, seed: "math" })) {
                    const [a, symbol, b] = problem.tokens.map(Problem.tokenText)
                    const expected = evaluate[symbol!]!(Number(a), Number(b))
                    expect(Number(Problem.answerText(problem.answer))).toBeCloseTo(expected, 6)
                }
            }
        }
    })

    it("clamps specs that are out of range", () => {
        expect(Catalog.normalizeSpec({ topicId: "nope", level: 99, count: 1000, seed: "x" })).toEqual({
            topicId: "add",
            level: 5,
            count: Catalog.MAX_QUESTIONS,
            seed: "x"
        })
    })
})

describe("Check", () => {
    const tag = (answer: Problem.Answer, input: string) => Check.check(answer, input)._tag

    it("treats blank input as unanswered", () => {
        expect(tag({ _tag: "Decimal", value: "7" }, "   ")).toBe("Empty")
    })

    it("marks decimals regardless of formatting", () => {
        const answer: Problem.Answer = { _tag: "Decimal", value: "1234.5" }
        expect(tag(answer, "1234.5")).toBe("Correct")
        expect(tag(answer, " 1,234.50 ")).toBe("Correct")
        expect(tag(answer, "1234.6")).toBe("Incorrect")
        expect(tag(answer, "twelve")).toBe("Invalid")
        expect(tag({ _tag: "Decimal", value: "0.5" }, ".5")).toBe("Correct")
    })

    it("marks quotients with remainders", () => {
        const answer: Problem.Answer = { _tag: "Remainder", quotient: 5, remainder: 4 }
        expect(tag(answer, "5 R4")).toBe("Correct")
        expect(tag(answer, "5r 4")).toBe("Correct")
        expect(tag(answer, "5 remainder 4")).toBe("Correct")
        expect(tag(answer, "5")).toBe("Incorrect")
        expect(tag(answer, "4 R5")).toBe("Incorrect")
        expect(tag({ _tag: "Remainder", quotient: 49, remainder: 0 }, "49")).toBe("Correct")
        expect(tag({ _tag: "Remainder", quotient: 49, remainder: 0 }, "49 R0")).toBe("Correct")
    })

    it("accepts mixed or improper answers in simplest form", () => {
        const answer = fraction(17, 12, "simplest")
        expect(tag(answer, "17/12")).toBe("Correct")
        expect(tag(answer, "1 5/12")).toBe("Correct")
        expect(tag(answer, "34/24")).toBe("Almost")
        expect(tag(answer, "1 10/24")).toBe("Almost")
        expect(tag(answer, "0 17/12")).toBe("Almost")
        expect(tag(answer, "5/12")).toBe("Incorrect")
        expect(tag(answer, "1/0")).toBe("Invalid")
        expect(tag(answer, "1.4")).toBe("Invalid")
        expect(tag(fraction(4, 2, "simplest"), "2")).toBe("Correct")
        expect(tag(fraction(4, 2, "simplest"), "4/2")).toBe("Almost")
    })

    it("insists on the requested form for conversions", () => {
        expect(tag(fraction(7, 4, "mixed"), "1 3/4")).toBe("Correct")
        expect(tag(fraction(7, 4, "mixed"), "7/4")).toBe("Almost")
        expect(tag(fraction(7, 4, "improper"), "7/4")).toBe("Correct")
        expect(tag(fraction(7, 4, "improper"), "1 3/4")).toBe("Almost")
        expect(tag(fraction(7, 4, "improper"), "14/8")).toBe("Almost")
    })

    it("marks comparisons", () => {
        const answer: Problem.Answer = { _tag: "Comparison", value: "<" }
        expect(tag(answer, "<")).toBe("Correct")
        expect(tag(answer, ">")).toBe("Incorrect")
    })
})

describe("Problem", () => {
    it("formats decimals exactly", () => {
        expect(Problem.formatDecimal(123456, 4)).toBe("12.3456")
        expect(Problem.formatDecimal(1230, 2)).toBe("12.3")
        expect(Problem.formatDecimal(5, 3)).toBe("0.005")
        expect(Problem.formatDecimal(2000, 3)).toBe("2")
    })

    it("shows improper answers alongside their mixed form", () => {
        expect(Problem.answerTokens(fraction(34, 24, "simplest")).map(Problem.tokenText)).toEqual([
            "17/12",
            "=",
            "1 5/12"
        ])
        expect(Problem.answerTokens(fraction(6, 3, "mixed")).map(Problem.tokenText)).toEqual(["2"])
    })
})

describe("Entry", () => {
    const first = (topicId: string, level: number) =>
        Catalog.generateWorksheet({ topicId, level, count: 1, seed: "boxes" })[0]!

    it("chooses boxes that match the shape of the answer", () => {
        expect(Entry.fields(first("add", 1))).toEqual(["value"])
        expect(Entry.fields(first("divide", 2))).toEqual(["quotient", "remainder"])
        expect(Entry.fields(first("fraction-add", 2))).toEqual(["whole", "numerator", "denominator"])
        expect(Entry.fields(first("fraction-to-mixed", 1))).toEqual(["whole", "numerator", "denominator"])
        expect(Entry.fields(first("fraction-simplify", 1))).toEqual(["numerator", "denominator"])
        expect(Entry.fields(first("fraction-to-improper", 1))).toEqual(["numerator", "denominator"])
        expect(Entry.fields(first("fraction-compare", 1))).toEqual(["sign"])
    })

    it("only lets valid characters into a box", () => {
        expect(Entry.mask("numerator", "1a2/ 3")).toBe("123")
        expect(Entry.mask("value", "1,234.5x.6")).toBe("1,234.56")
        expect(Entry.mask("value", "-12")).toBe("12")
    })

    it("joins boxes into an answer", () => {
        const mixed: ReadonlyArray<Entry.Field> = ["whole", "numerator", "denominator"]
        expect(Entry.compose(mixed, ["1", "3", "4"])).toBe("1 3/4")
        expect(Entry.compose(mixed, ["", "3", "4"])).toBe("3/4")
        expect(Entry.compose(mixed, ["2", "", ""])).toBe("2")
        expect(Entry.compose(mixed, ["", "", ""])).toBe("")
        expect(Entry.compose(["quotient", "remainder"], ["5", "4"])).toBe("5 R4")
        expect(Entry.compose(["quotient", "remainder"], ["5", ""])).toBe("5")
    })

    it("marks a half-filled fraction as incomplete rather than wrong", () => {
        const answer = fraction(3, 4, "simplest")
        const boxes: ReadonlyArray<Entry.Field> = ["whole", "numerator", "denominator"]
        expect(Check.check(answer, Entry.compose(boxes, ["", "3", ""]))._tag).toBe("Invalid")
        expect(Check.check(answer, Entry.compose(boxes, ["", "", "4"]))._tag).toBe("Invalid")
        expect(Check.check(answer, Entry.compose(boxes, ["", "3", "4"]))._tag).toBe("Correct")
        expect(
            Check.check(
                { _tag: "Remainder", quotient: 5, remainder: 4 },
                Entry.compose(["quotient", "remainder"], ["", "4"])
            )._tag
        )
            .toBe("Invalid")
    })
})
