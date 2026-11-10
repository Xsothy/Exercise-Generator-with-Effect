import type { Problem } from "./Problem.js"

/**
 * One box a student fills in. A fraction is entered as separate numerator and
 * denominator boxes (plus a whole-number box where a mixed number may be the
 * answer) rather than typed as free text such as `1 3/4`.
 */
export type Field = "value" | "whole" | "numerator" | "denominator" | "quotient" | "remainder" | "sign"

/** The boxes needed to answer a problem, in reading order. */
export const fields = (problem: Problem): ReadonlyArray<Field> => {
    const { answer } = problem
    switch (answer._tag) {
        case "Decimal":
            return ["value"]
        case "Remainder":
            return ["quotient", "remainder"]
        case "Comparison":
            return ["sign"]
        case "Fraction": {
            // Converting to an improper fraction, or simplifying a single fraction,
            // never calls for a whole part; the result of a calculation may.
            const wholePart = answer.form === "mixed" || (answer.form === "simplest" && problem.tokens.length > 1)
            return wholePart ? ["whole", "numerator", "denominator"] : ["numerator", "denominator"]
        }
    }
}

/** Strips characters that cannot appear in a box, so only valid input can be typed. */
export const mask = (field: Field, input: string): string => {
    switch (field) {
        case "sign":
            return input
        case "value": {
            const [whole, ...rest] = input.replace(/[^0-9.,]/g, "").split(".")
            return rest.length === 0 ? whole! : `${whole}.${rest.join("").replace(/,/g, "")}`
        }
        default:
            return input.replace(/\D/g, "")
    }
}

/** Joins the boxes into the text form understood by `Check.check`. */
export const compose = (boxes: ReadonlyArray<Field>, parts: ReadonlyArray<string>): string => {
    const part = (field: Field): string => {
        const index = boxes.indexOf(field)
        return index === -1 ? "" : (parts[index] ?? "").trim()
    }
    if (boxes.includes("numerator")) {
        const [whole, n, d] = [part("whole"), part("numerator"), part("denominator")]
        // A whole number on its own is a complete answer; half a fraction is not.
        const fraction = n === "" && d === "" ? "" : `${n}/${d}`
        return [whole, fraction].filter((text) => text !== "").join(" ")
    }
    if (boxes.includes("quotient")) {
        const [quotient, remainder] = [part("quotient"), part("remainder")]
        return remainder === "" ? quotient : `${quotient} R${remainder}`
    }
    return part(boxes[0]!)
}
