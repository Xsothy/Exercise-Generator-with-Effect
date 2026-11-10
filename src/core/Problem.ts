import * as Rational from "./Rational.js"

/** A piece of a question (or answer) that the UI knows how to draw. */
export type Token =
    | { readonly _tag: "Num"; readonly text: string }
    | { readonly _tag: "Frac"; readonly whole?: number; readonly n: number; readonly d: number }
    | { readonly _tag: "Op"; readonly symbol: string }
    /** The empty slot between the two sides of a comparison. */
    | { readonly _tag: "Blank" }

/**
 * How strictly the *shape* of a fraction answer is judged, on top of its value:
 * - `simplest`: lowest terms; a mixed number or an improper fraction are both fine
 * - `mixed`: lowest terms and written as a mixed number
 * - `improper`: lowest terms and written as a single fraction
 */
export type FractionForm = "simplest" | "mixed" | "improper"

export type Comparison = "<" | "=" | ">"

export type Answer =
    | { readonly _tag: "Decimal"; readonly value: string }
    | { readonly _tag: "Remainder"; readonly quotient: number; readonly remainder: number }
    | { readonly _tag: "Fraction"; readonly value: Rational.Rational; readonly form: FractionForm }
    | { readonly _tag: "Comparison"; readonly value: Comparison }

export interface Problem {
    readonly tokens: ReadonlyArray<Token>
    readonly answer: Answer
}

export const num = (value: number | string): Token => ({ _tag: "Num", text: String(value) })

export const frac = (n: number, d: number): Token => ({ _tag: "Frac", n, d })

export const mixed = (whole: number, n: number, d: number): Token => ({ _tag: "Frac", whole, n, d })

export const op = (symbol: string): Token => ({ _tag: "Op", symbol })

export const blank: Token = { _tag: "Blank" }

/** Formats `value / 10^scale` exactly, without trailing zeros. */
export const formatDecimal = (value: number, scale: number): string => {
    const sign = value < 0 ? "-" : ""
    const digits = String(Math.abs(value)).padStart(scale + 1, "0")
    const whole = digits.slice(0, digits.length - scale)
    const fraction = digits.slice(digits.length - scale).replace(/0+$/, "")
    return sign + whole + (fraction ? "." + fraction : "")
}

export const tokenText = (token: Token): string => {
    switch (token._tag) {
        case "Num":
            return token.text
        case "Op":
            return token.symbol
        case "Blank":
            return "__"
        case "Frac":
            return (token.whole === undefined ? "" : `${token.whole} `) + `${token.n}/${token.d}`
    }
}

/** Plain-text form of a question, also used to detect duplicates. */
export const questionText = (problem: Problem): string => problem.tokens.map(tokenText).join(" ")

/** The model answer, drawn the way we would like a student to write it. */
export const answerTokens = (answer: Answer): ReadonlyArray<Token> => {
    switch (answer._tag) {
        case "Decimal":
            return [num(answer.value)]
        case "Remainder":
            return [num(answer.remainder === 0 ? answer.quotient : `${answer.quotient} R${answer.remainder}`)]
        case "Comparison":
            return [op(answer.value)]
        case "Fraction": {
            const value = Rational.reduce(answer.value)
            if (Rational.isInteger(value)) return [num(value.n / value.d)]
            const asMixed = Rational.toMixed(value)
            const mixedToken = asMixed.whole === 0
                ? frac(asMixed.n, asMixed.d)
                : mixed(asMixed.whole, asMixed.n, asMixed.d)
            if (answer.form === "mixed") return [mixedToken]
            if (answer.form === "improper" || asMixed.whole === 0) return [frac(value.n, value.d)]
            return [frac(value.n, value.d), op("="), mixedToken]
        }
    }
}

/** The model answer as a student would type it; always accepted by `Check.check`. */
export const answerText = (answer: Answer): string => tokenText(answerTokens(answer)[0]!)
