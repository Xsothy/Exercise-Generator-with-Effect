import { Effect } from "effect"
import type { Generator } from "../Generator.js"
import { int, skipWhen } from "../Generator.js"
import type { Problem } from "../Problem.js"
import { formatDecimal, num, op } from "../Problem.js"
import type { Topic } from "../Topic.js"

const GROUP = "Arithmetic"

const whole = (a: number, symbol: string, b: number, answer: number): Problem => ({
    tokens: [num(a), op(symbol), num(b)],
    answer: { _tag: "Decimal", value: String(answer) }
})

const digitRanges: ReadonlyArray<readonly [number, number]> = [[1, 9], [10, 99], [100, 999], [1000, 9999]]

/** Two amounts with two decimal places, as integers counted in hundredths. */
const hundredths = Effect.all([int(101, 9999), int(101, 9999)])

const additionLevel = ([min, max]: readonly [number, number]): Generator =>
    Effect.gen(function*() {
        const a = yield* int(min, max)
        const b = yield* int(min, max)
        return whole(a, "+", b, a + b)
    })

export const addition: Topic = {
    id: "add",
    group: GROUP,
    title: "Addition",
    answerHint: "e.g. 42",
    levels: [
        { description: "Add two 1-digit numbers (e.g., 7 + 8)", generate: additionLevel(digitRanges[0]!) },
        { description: "Add two 2-digit numbers (e.g., 46 + 37)", generate: additionLevel(digitRanges[1]!) },
        { description: "Add two 3-digit numbers (e.g., 358 + 276)", generate: additionLevel(digitRanges[2]!) },
        { description: "Add two 4-digit numbers (e.g., 4,829 + 3,756)", generate: additionLevel(digitRanges[3]!) },
        {
            description: "Add decimals (e.g., 12.34 + 5.6)",
            generate: Effect.gen(function*() {
                const [a, b] = yield* hundredths
                return {
                    tokens: [num(formatDecimal(a, 2)), op("+"), num(formatDecimal(b, 2))],
                    answer: { _tag: "Decimal", value: formatDecimal(a + b, 2) }
                }
            })
        }
    ]
}

const subtractionLevel = ([min, max]: readonly [number, number]): Generator =>
    Effect.gen(function*() {
        const a = yield* int(min, max)
        const b = yield* int(min, max)
        yield* skipWhen(a <= b)
        return whole(a, "−", b, a - b)
    })

export const subtraction: Topic = {
    id: "subtract",
    group: GROUP,
    title: "Subtraction",
    answerHint: "e.g. 42",
    levels: [
        { description: "Subtract 1-digit numbers (e.g., 9 − 4)", generate: subtractionLevel(digitRanges[0]!) },
        { description: "Subtract 2-digit numbers (e.g., 83 − 47)", generate: subtractionLevel(digitRanges[1]!) },
        { description: "Subtract 3-digit numbers (e.g., 612 − 378)", generate: subtractionLevel(digitRanges[2]!) },
        { description: "Subtract 4-digit numbers (e.g., 7,204 − 3,568)", generate: subtractionLevel(digitRanges[3]!) },
        {
            description: "Subtract decimals (e.g., 12.34 − 5.6)",
            generate: Effect.gen(function*() {
                const [a, b] = yield* hundredths
                yield* skipWhen(a <= b)
                return {
                    tokens: [num(formatDecimal(a, 2)), op("−"), num(formatDecimal(b, 2))],
                    answer: { _tag: "Decimal", value: formatDecimal(a - b, 2) }
                }
            })
        }
    ]
}

const multiplicationLevel = (first: readonly [number, number], second: readonly [number, number]): Generator =>
    Effect.gen(function*() {
        const a = yield* int(first[0], first[1])
        const b = yield* int(second[0], second[1])
        return whole(a, "×", b, a * b)
    })

export const multiplication: Topic = {
    id: "multiply",
    group: GROUP,
    title: "Multiplication",
    answerHint: "e.g. 42",
    levels: [
        {
            description: "Multiply a 2-digit number by a 1-digit number (e.g., 34 × 6)",
            generate: multiplicationLevel([10, 99], [2, 9])
        },
        {
            description: "Multiply two 2-digit numbers (e.g., 34 × 56)",
            generate: multiplicationLevel([10, 99], [10, 99])
        },
        {
            description: "Multiply a 4-digit number by a 3-digit number (e.g., 1234 × 567)",
            generate: multiplicationLevel([1000, 9999], [100, 999])
        },
        {
            description: "Multiply a 5-digit number by a 5-digit number (e.g., 12345 × 67890)",
            generate: multiplicationLevel([10000, 99999], [10000, 99999])
        },
        {
            description: "Multiply two numbers with decimals (e.g., 12.34 × 5.67)",
            generate: Effect.gen(function*() {
                const a = yield* int(1001, 9999)
                const b = yield* int(101, 999)
                return {
                    tokens: [num(formatDecimal(a, 2)), op("×"), num(formatDecimal(b, 2))],
                    answer: { _tag: "Decimal", value: formatDecimal(a * b, 4) }
                }
            })
        }
    ]
}

const withRemainder = (a: number, b: number): Problem => ({
    tokens: [num(a), op("÷"), num(b)],
    answer: { _tag: "Remainder", quotient: Math.floor(a / b), remainder: a % b }
})

export const division: Topic = {
    id: "divide",
    group: GROUP,
    title: "Division",
    answerHint: "e.g. 5 R4",
    levels: [
        {
            description: "Simple division with no remainders, using small numbers (e.g., 24 ÷ 6 = 4)",
            generate: Effect.gen(function*() {
                const quotient = yield* int(2, 9)
                const divisor = yield* int(2, 9)
                return whole(quotient * divisor, "÷", divisor, quotient)
            })
        },
        {
            description: "Division of 2-digit numbers with a remainder (e.g., 29 ÷ 5 = 5 R4)",
            generate: Effect.gen(function*() {
                const a = yield* int(10, 99)
                const b = yield* int(2, 9)
                yield* skipWhen(a % b === 0)
                return withRemainder(a, b)
            })
        },
        {
            description: "Long division of 3-digit numbers by 1-digit numbers (e.g., 345 ÷ 7 = 49 R2)",
            generate: Effect.gen(function*() {
                const a = yield* int(100, 999)
                const b = yield* int(2, 9)
                return withRemainder(a, b)
            })
        },
        {
            description: "Division of 5-digit numbers by 2-digit numbers, no remainder (e.g., 86,352 ÷ 56)",
            generate: Effect.gen(function*() {
                const quotient = yield* int(100, 999)
                const divisor = (yield* int(2, 9)) * (yield* int(2, 9))
                yield* skipWhen(divisor < 10)
                return whole(quotient * divisor, "÷", divisor, quotient)
            })
        },
        {
            description: "Division with decimals in the result (e.g., 47 ÷ 8 = 5.875)",
            generate: Effect.gen(function*() {
                const a = yield* int(10, 999)
                const b = yield* int(2, 9)
                // Keep only quotients that terminate within three decimal places.
                yield* skipWhen(a % b === 0 || (a * 1000) % b !== 0)
                return {
                    tokens: [num(a), op("÷"), num(b)],
                    answer: { _tag: "Decimal", value: formatDecimal((a * 1000) / b, 3) }
                }
            })
        }
    ]
}

export const topics: ReadonlyArray<Topic> = [addition, subtraction, multiplication, division]
