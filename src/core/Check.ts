import type { Answer, FractionForm } from "./Problem.js"
import * as Rational from "./Rational.js"

export type Verdict =
    | { readonly _tag: "Empty" }
    | { readonly _tag: "Correct" }
    | { readonly _tag: "Incorrect" }
    /** The right value in the wrong shape, e.g. `2/4` where `1/2` is wanted. */
    | { readonly _tag: "Almost"; readonly hint: string }
    /** We could not read the input as an answer at all. */
    | { readonly _tag: "Invalid"; readonly hint: string }

const correct: Verdict = { _tag: "Correct" }
const incorrect: Verdict = { _tag: "Incorrect" }
const almost = (hint: string): Verdict => ({ _tag: "Almost", hint })
const invalid = (hint: string): Verdict => ({ _tag: "Invalid", hint })

const clean = (input: string): string => input.replace(/[−–]/g, "-").replace(/\s+/g, " ").trim()

/** Canonical form of a decimal string: no separators, no redundant zeros. */
const normalizeDecimal = (input: string): string | undefined => {
    const text = input.replace(/[,\s]/g, "")
    const match = /^(-?)(\d*)(?:\.(\d*))?$/.exec(text)
    if (!match || (match[2] === "" && (match[3] ?? "") === "")) return undefined
    const whole = match[2]!.replace(/^0+(?=\d)/, "") || "0"
    const fraction = (match[3] ?? "").replace(/0+$/, "")
    const sign = match[1] === "-" && /[1-9]/.test(whole + fraction) ? "-" : ""
    return sign + whole + (fraction ? "." + fraction : "")
}

interface ParsedFraction {
    readonly whole?: number
    readonly n: number
    readonly d: number
}

export const parseFraction = (input: string): ParsedFraction | undefined => {
    const text = clean(input)
    let match = /^(-?\d+) (\d+) ?\/ ?(\d+)$/.exec(text)
    if (match) return { whole: Number(match[1]), n: Number(match[2]), d: Number(match[3]) }
    match = /^(-?\d+) ?\/ ?(\d+)$/.exec(text)
    if (match) return { n: Number(match[1]), d: Number(match[2]) }
    match = /^-?\d+$/.exec(text)
    if (match) return { n: Number(text), d: 1 }
    return undefined
}

const checkFraction = (expected: Rational.Rational, form: FractionForm, input: string): Verdict => {
    const parsed = parseFraction(input)
    if (!parsed || parsed.d === 0) return invalid("Fill in both the numerator and the denominator")
    const { d, n, whole } = parsed
    const sign = whole !== undefined && whole < 0 ? -1 : 1
    const value = Rational.make((whole ?? 0) * d + sign * n, d)
    if (!Rational.equals(value, expected)) return incorrect
    // A whole-number answer has only one sensible way to be written.
    if (d === 1 || n === 0) return correct
    if (Rational.gcd(n, d) !== 1) return almost("Right value — now simplify it")
    if (whole !== undefined && n >= d) return almost("The fraction part of a mixed number must be less than 1")
    if (form === "mixed" && whole === undefined && Math.abs(n) > d) {
        return almost("Right value — write it as a mixed number")
    }
    if (form === "improper" && whole !== undefined) return almost("Right value — write it as a single fraction")
    return correct
}

const checkRemainder = (quotient: number, remainder: number, input: string): Verdict => {
    const match = /^(\d+)(?: ?r(?:em(?:ainder)?)? ?(\d+))?$/i.exec(clean(input).replace(/,/g, ""))
    if (!match) return invalid("Fill in the quotient")
    return Number(match[1]) === quotient && Number(match[2] ?? 0) === remainder ? correct : incorrect
}

/** Marks what a student typed against the model answer. */
export const check = (answer: Answer, input: string): Verdict => {
    if (clean(input) === "") return { _tag: "Empty" }
    switch (answer._tag) {
        case "Decimal": {
            const value = normalizeDecimal(clean(input))
            if (value === undefined) return invalid("Enter a number")
            return value === answer.value ? correct : incorrect
        }
        case "Remainder":
            return checkRemainder(answer.quotient, answer.remainder, input)
        case "Fraction":
            return checkFraction(answer.value, answer.form, input)
        case "Comparison": {
            const value = clean(input)
            if (value !== "<" && value !== "=" && value !== ">") return invalid("Choose <, = or >")
            return value === answer.value ? correct : incorrect
        }
    }
}
