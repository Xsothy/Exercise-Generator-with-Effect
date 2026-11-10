import { Effect } from "effect"
import type { Generator } from "../Generator.js"
import { int, pick, properFraction, skipWhen } from "../Generator.js"
import type { Comparison, FractionForm, Problem, Token } from "../Problem.js"
import { blank, frac, mixed, num, op } from "../Problem.js"
import * as Rational from "../Rational.js"
import type { Topic } from "../Topic.js"

const GROUP = "Fractions"
const HINT = "e.g. 3/4 or 1 3/4"

/** A number as it is printed in the question, together with its exact value. */
interface Operand {
    readonly token: Token
    readonly value: Rational.Rational
}

const fraction = (n: number, d: number): Operand => ({ token: frac(n, d), value: Rational.make(n, d) })

const wholeNumber = (n: number): Operand => ({ token: num(n), value: Rational.make(n) })

const mixedNumber = (whole: number, n: number, d: number): Operand => ({
    token: mixed(whole, n, d),
    value: Rational.make(whole * d + n, d)
})

const proper = (minDenominator: number, maxDenominator: number): Generator<Operand> =>
    Effect.map(properFraction(minDenominator, maxDenominator), ({ d, n }) => fraction(n, d))

/** `whole + proper fraction`, with the whole part drawn from the given range. */
const mixedOperand = (
    wholes: readonly [number, number],
    denominators: readonly [number, number]
): Generator<Operand> =>
    Effect.gen(function*() {
        const whole = yield* int(wholes[0], wholes[1])
        const { d, n } = yield* properFraction(denominators[0], denominators[1])
        return mixedNumber(whole, n, d)
    })

/** A fraction in lowest terms between 1 and 3 that is not a whole number. */
const improper = (minDenominator: number, maxDenominator: number): Generator<Operand> =>
    Effect.gen(function*() {
        const d = yield* int(minDenominator, maxDenominator)
        const n = yield* int(d + 1, d * 3 - 1)
        yield* skipWhen(Rational.gcd(n, d) !== 1)
        return fraction(n, d)
    })

type Operation = (a: Rational.Rational, b: Rational.Rational) => Rational.Rational

const binary = (symbol: string, operation: Operation) =>
(
    operands: Generator<readonly [Operand, Operand]>,
    options: { readonly positive?: boolean; readonly differentDenominators?: boolean } = {}
): Generator =>
    Effect.gen(function*() {
        const [a, b] = yield* operands
        yield* skipWhen(options.differentDenominators === true && a.value.d === b.value.d)
        const value = operation(a.value, b.value)
        yield* skipWhen(options.positive === true && value.n <= 0)
        return {
            tokens: [a.token, op(symbol), b.token],
            answer: { _tag: "Fraction", value, form: "simplest" }
        }
    })

const pair = (a: Generator<Operand>, b: Generator<Operand> = a): Generator<readonly [Operand, Operand]> =>
    Effect.all([a, b])

/** Two proper fractions that share one denominator (not necessarily in lowest terms). */
const sameDenominator: Generator<readonly [Operand, Operand]> = Effect.gen(function*() {
    const d = yield* int(3, 12)
    const a = yield* int(1, d - 1)
    const b = yield* int(1, d - 1)
    return [fraction(a, d), fraction(b, d)]
})

const add = binary("+", Rational.add)

export const addition: Topic = {
    id: "fraction-add",
    group: GROUP,
    title: "Adding fractions",
    answerHint: HINT,
    levels: [
        { description: "Add fractions with the same denominator (e.g., 1/4 + 2/4)", generate: add(sameDenominator) },
        {
            description: "Add fractions with different denominators (e.g., 2/5 + 1/3)",
            generate: add(pair(proper(2, 10)), { differentDenominators: true })
        },
        {
            description: "Add mixed numbers (e.g., 1 1/2 + 2 2/3)",
            generate: add(pair(mixedOperand([1, 3], [2, 10])), { differentDenominators: true })
        },
        {
            description: "Add improper fractions and simplify (e.g., 9/4 + 11/6)",
            generate: add(pair(improper(2, 12)), { differentDenominators: true })
        }
    ]
}

const subtract = binary("−", Rational.subtract)

export const subtraction: Topic = {
    id: "fraction-subtract",
    group: GROUP,
    title: "Subtracting fractions",
    answerHint: HINT,
    levels: [
        {
            description: "Subtract fractions with the same denominator (e.g., 3/4 − 1/4)",
            generate: subtract(sameDenominator, { positive: true })
        },
        {
            description: "Subtract fractions with different denominators (e.g., 7/10 − 2/5)",
            generate: subtract(pair(proper(2, 10)), { positive: true, differentDenominators: true })
        },
        {
            description: "Subtract mixed numbers (e.g., 3 1/2 − 2 2/3)",
            generate: subtract(pair(mixedOperand([1, 5], [2, 10])), { positive: true, differentDenominators: true })
        },
        {
            description: "Subtract improper fractions and simplify (e.g., 13/8 − 5/4)",
            generate: subtract(pair(improper(2, 12)), { positive: true, differentDenominators: true })
        }
    ]
}

const multiply = binary("×", Rational.multiply)

export const multiplication: Topic = {
    id: "fraction-multiply",
    group: GROUP,
    title: "Multiplying fractions",
    answerHint: HINT,
    levels: [
        {
            description: "Multiply fractions with small numbers (e.g., 1/4 × 3/5)",
            generate: multiply(pair(proper(2, 9)))
        },
        {
            description: "Multiply fractions and whole numbers (e.g., 3 × 2/5)",
            generate: multiply(pair(Effect.map(int(2, 9), wholeNumber), proper(2, 9)))
        },
        {
            description: "Multiply mixed numbers (e.g., 1 1/3 × 2 2/5)",
            generate: multiply(pair(mixedOperand([1, 3], [2, 6])))
        },
        { description: "Multiply improper fractions (e.g., 11/6 × 13/8)", generate: multiply(pair(improper(2, 9))) }
    ]
}

const divide = binary("÷", Rational.divide)

export const division: Topic = {
    id: "fraction-divide",
    group: GROUP,
    title: "Dividing fractions",
    answerHint: HINT,
    levels: [
        { description: "Divide fractions with small numbers (e.g., 3/4 ÷ 2/5)", generate: divide(pair(proper(2, 9))) },
        {
            description: "Divide whole numbers by fractions (e.g., 2 ÷ 3/5)",
            generate: divide(pair(Effect.map(int(2, 9), wholeNumber), proper(2, 9)))
        },
        {
            description: "Divide mixed numbers (e.g., 3 1/2 ÷ 2 2/3)",
            generate: divide(pair(mixedOperand([1, 3], [2, 6])))
        },
        { description: "Divide improper fractions (e.g., 9/4 ÷ 7/6)", generate: divide(pair(improper(2, 9))) }
    ]
}

const convert = (token: Token, value: Rational.Rational, form: FractionForm): Problem => ({
    tokens: [token],
    answer: { _tag: "Fraction", value, form }
})

/** Scales a fraction that is already in lowest terms by a common factor. */
const unsimplified = (base: Generator<Operand>, factors: readonly [number, number]): Generator =>
    Effect.gen(function*() {
        const { value } = yield* base
        const factor = yield* int(factors[0], factors[1])
        return convert(frac(value.n * factor, value.d * factor), value, "simplest")
    })

const primes = [7, 11, 13, 17, 19, 23] as const

export const simplifying: Topic = {
    id: "fraction-simplify",
    group: GROUP,
    title: "Simplifying fractions",
    answerHint: "e.g. 2/3",
    levels: [
        {
            description: "Simplify fractions with small numerators and denominators (e.g., 4/6 to 2/3)",
            generate: unsimplified(proper(2, 6), [2, 4])
        },
        {
            description: "Simplify fractions with larger numbers (e.g., 20/60 to 1/3)",
            generate: unsimplified(proper(2, 9), [5, 12])
        },
        {
            description: "Simplify improper fractions to simplest form (e.g., 45/30 to 3/2)",
            generate: unsimplified(improper(2, 9), [2, 9])
        },
        {
            description: "Simplify fractions with large common factors (e.g., 96/144 to 2/3)",
            generate: unsimplified(proper(2, 9), [12, 48])
        },
        {
            description: "Simplify fractions with a hidden prime factor (e.g., 77/143 to 7/11)",
            generate: Effect.gen(function*() {
                const { value } = yield* proper(3, 13)
                const prime = yield* pick(primes)
                yield* skipWhen(value.n === 1)
                return convert(frac(value.n * prime, value.d * prime), value, "simplest")
            })
        }
    ]
}

const toMixedLevel = (
    wholes: readonly [number, number],
    denominator: Effect.Effect<number>,
    factors: readonly [number, number] = [1, 1]
): Generator =>
    Effect.gen(function*() {
        const d = yield* denominator
        const n = yield* int(1, d - 1)
        yield* skipWhen(Rational.gcd(n, d) !== 1)
        const whole = yield* int(wholes[0], wholes[1])
        const factor = yield* int(factors[0], factors[1])
        const value = Rational.make(whole * d + n, d)
        return convert(frac(value.n * factor, value.d * factor), value, "mixed")
    })

export const improperToMixed: Topic = {
    id: "fraction-to-mixed",
    group: GROUP,
    title: "Improper fraction → mixed number",
    answerHint: "e.g. 1 3/4",
    levels: [
        {
            description: "Numerator just a little larger than the denominator (e.g., 7/4 to 1 3/4)",
            generate: toMixedLevel([1, 1], int(2, 15))
        },
        { description: "Larger numerators (e.g., 22/7 to 3 1/7)", generate: toMixedLevel([2, 5], int(2, 9)) },
        {
            description: "Numerator much larger than the denominator (e.g., 58/9 to 6 4/9)",
            generate: toMixedLevel([6, 12], int(2, 12))
        },
        {
            description: "Convert, then simplify the fraction part (e.g., 45/6 to 7 1/2)",
            generate: toMixedLevel([2, 9], int(2, 9), [2, 5])
        },
        {
            description: "Prime denominators (e.g., 77/13 to 5 12/13)",
            generate: toMixedLevel([2, 9], pick(primes))
        }
    ]
}

const toImproperLevel = (
    wholes: readonly [number, number],
    denominator: Effect.Effect<number>,
    factors: readonly [number, number] = [1, 1]
): Generator =>
    Effect.gen(function*() {
        const d = yield* denominator
        const n = yield* int(1, d - 1)
        yield* skipWhen(Rational.gcd(n, d) !== 1)
        const whole = yield* int(wholes[0], wholes[1])
        const factor = yield* int(factors[0], factors[1])
        return convert(mixed(whole, n * factor, d * factor), Rational.make(whole * d + n, d), "improper")
    })

export const mixedToImproper: Topic = {
    id: "fraction-to-improper",
    group: GROUP,
    title: "Mixed number → improper fraction",
    answerHint: "e.g. 7/4",
    levels: [
        {
            description: "Small whole numbers and fraction parts (e.g., 3 1/2 to 7/2)",
            generate: toImproperLevel([1, 5], int(2, 6))
        },
        {
            description: "Mixed numbers with larger fractions (e.g., 8 5/6 to 53/6)",
            generate: toImproperLevel([5, 12], int(5, 12))
        },
        {
            description: "Simplify after converting (e.g., 6 4/8 to 13/2)",
            generate: toImproperLevel([2, 9], int(2, 6), [2, 4])
        },
        {
            description: "Prime denominators (e.g., 9 7/13 to 124/13)",
            generate: toImproperLevel([5, 12], pick(primes))
        },
        {
            description: "Large whole numbers and denominators (e.g., 15 3/16 to 243/16)",
            generate: toImproperLevel([10, 20], int(11, 20))
        }
    ]
}

const compareOperands = (operands: Generator<readonly [Operand, Operand]>): Generator =>
    Effect.gen(function*() {
        const [a, b] = yield* operands
        const order = Rational.compare(a.value, b.value)
        const value: Comparison = order < 0 ? "<" : order > 0 ? ">" : "="
        return { tokens: [a.token, blank, b.token], answer: { _tag: "Comparison", value } }
    })

/** A proper fraction that may still be reducible, so `1/2 = 2/4` can turn up. */
const anyProper: Generator<Operand> = Effect.gen(function*() {
    const d = yield* int(2, 12)
    const n = yield* int(1, d - 1)
    return fraction(n, d)
})

export const comparing: Topic = {
    id: "fraction-compare",
    group: GROUP,
    title: "Comparing fractions",
    answerHint: "<, = or >",
    levels: [
        {
            description: "Compare fractions with the same denominator (e.g., 3/8 vs 5/8)",
            generate: Effect.gen(function*() {
                const [a, b] = yield* sameDenominator
                yield* skipWhen(a.value.n === b.value.n)
                return yield* compareOperands(Effect.succeed([a, b]))
            })
        },
        {
            description: "Compare fractions with different denominators (e.g., 2/5 vs 3/8)",
            generate: Effect.gen(function*() {
                const [a, b] = yield* pair(anyProper)
                yield* skipWhen(a.value.d === b.value.d)
                return yield* compareOperands(Effect.succeed([a, b]))
            })
        },
        {
            description: "Compare improper fractions (e.g., 7/4 vs 9/5)",
            generate: Effect.gen(function*() {
                const [a, b] = yield* pair(improper(2, 12))
                yield* skipWhen(a.value.d === b.value.d)
                return yield* compareOperands(Effect.succeed([a, b]))
            })
        },
        {
            description: "Compare fractions and mixed numbers (e.g., 11/6 vs 1 2/3)",
            generate: Effect.gen(function*() {
                const a = yield* improper(2, 12)
                const b = yield* mixedOperand([1, 2], [2, 12])
                yield* skipWhen(a.value.d === b.value.d)
                const swap = (yield* int(0, 1)) === 1
                return yield* compareOperands(Effect.succeed(swap ? [b, a] : [a, b]))
            })
        }
    ]
}

export const topics: ReadonlyArray<Topic> = [
    addition,
    subtraction,
    multiplication,
    division,
    simplifying,
    improperToMixed,
    mixedToImproper,
    comparing
]
