import { Effect, Option } from 'effect'

import {
  type Generator,
  int,
  pick,
  properFraction,
  skipWhen,
} from '../generator'
import {
  Answer,
  type Comparison,
  type FractionForm,
  type Problem,
  type Token,
  blank,
  frac,
  fractionAnswer,
  mixed,
  num,
  op,
} from '../problem'
import * as Rational from '../rational'
import type { Topic } from '../topic'

const GROUP = 'Fractions'
const OPERATIONS = Option.some('Operations')
const CONVERTING = Option.some('Converting')
const COMPARING = Option.some('Comparing')

type Range = readonly [min: number, max: number]

/** A number as it is printed in the question, together with its exact value. */
type Operand = Readonly<{ token: Token; value: Rational.Rational }>

type Pair = readonly [Operand, Operand]

const fraction = (n: number, d: number): Operand => ({
  token: frac(n, d),
  value: Rational.make(n, d),
})

const wholeNumber = (n: number): Operand => ({
  token: num(n),
  value: Rational.make(n),
})

const mixedNumber = (whole: number, n: number, d: number): Operand => ({
  token: mixed(whole, n, d),
  value: Rational.make(whole * d + n, d),
})

const proper = (
  minDenominator: number,
  maxDenominator: number,
): Generator<Operand> =>
  Effect.map(properFraction(minDenominator, maxDenominator), ({ n, d }) =>
    fraction(n, d),
  )

const mixedOperand = (wholes: Range, denominators: Range): Generator<Operand> =>
  Effect.gen(function* () {
    const whole = yield* int(wholes[0], wholes[1])
    const { n, d } = yield* properFraction(denominators[0], denominators[1])
    return mixedNumber(whole, n, d)
  })

/** A fraction in lowest terms between 1 and 3 that is not a whole number. */
const improper = (
  minDenominator: number,
  maxDenominator: number,
): Generator<Operand> =>
  Effect.gen(function* () {
    const d = yield* int(minDenominator, maxDenominator)
    const n = yield* int(d + 1, d * 3 - 1)
    yield* skipWhen(Rational.gcd(n, d) !== 1)
    return fraction(n, d)
  })

type Operation = (
  a: Rational.Rational,
  b: Rational.Rational,
) => Rational.Rational

type Constraint = 'None' | 'DifferentDenominators'
type Sign = 'Any' | 'Positive'

const binary =
  (symbol: string, operation: Operation) =>
  (
    operands: Generator<Pair>,
    constraint: Constraint = 'None',
    sign: Sign = 'Any',
  ): Generator =>
    Effect.gen(function* () {
      const [a, b] = yield* operands
      yield* skipWhen(
        constraint === 'DifferentDenominators' && a.value.d === b.value.d,
      )
      const value = operation(a.value, b.value)
      yield* skipWhen(sign === 'Positive' && value.n <= 0)
      return {
        tokens: [a.token, op(symbol), b.token],
        answer: fractionAnswer(value, 'simplest'),
      }
    })

const pair = (
  a: Generator<Operand>,
  b: Generator<Operand> = a,
): Generator<Pair> => Effect.all([a, b])

/** Two proper fractions that share one denominator, not necessarily in lowest
 *  terms. */
const sameDenominator: Generator<Pair> = Effect.gen(function* () {
  const d = yield* int(3, 12)
  const a = yield* int(1, d - 1)
  const b = yield* int(1, d - 1)
  return [fraction(a, d), fraction(b, d)]
})

const add = binary('+', Rational.add)

export const addition: Topic = {
  id: 'fraction-add',
  group: GROUP,
  maybeSection: OPERATIONS,
  title: 'Adding fractions',
  sample: [frac(2, 5), op('+'), frac(1, 3)],
  levels: [
    {
      description: 'Add fractions with the same denominator (e.g., 1/4 + 2/4)',
      generate: add(sameDenominator),
    },
    {
      description:
        'Add fractions with different denominators (e.g., 2/5 + 1/3)',
      generate: add(pair(proper(2, 10)), 'DifferentDenominators'),
    },
    {
      description: 'Add mixed numbers (e.g., 1 1/2 + 2 2/3)',
      generate: add(
        pair(mixedOperand([1, 3], [2, 10])),
        'DifferentDenominators',
      ),
    },
    {
      description: 'Add improper fractions and simplify (e.g., 9/4 + 11/6)',
      generate: add(pair(improper(2, 12)), 'DifferentDenominators'),
    },
  ],
}

const subtract = binary('−', Rational.subtract)

export const subtraction: Topic = {
  id: 'fraction-subtract',
  group: GROUP,
  maybeSection: OPERATIONS,
  title: 'Subtracting fractions',
  sample: [frac(7, 10), op('−'), frac(2, 5)],
  levels: [
    {
      description:
        'Subtract fractions with the same denominator (e.g., 3/4 − 1/4)',
      generate: subtract(sameDenominator, 'None', 'Positive'),
    },
    {
      description:
        'Subtract fractions with different denominators (e.g., 7/10 − 2/5)',
      generate: subtract(
        pair(proper(2, 10)),
        'DifferentDenominators',
        'Positive',
      ),
    },
    {
      description: 'Subtract mixed numbers (e.g., 3 1/2 − 2 2/3)',
      generate: subtract(
        pair(mixedOperand([1, 5], [2, 10])),
        'DifferentDenominators',
        'Positive',
      ),
    },
    {
      description:
        'Subtract improper fractions and simplify (e.g., 13/8 − 5/4)',
      generate: subtract(
        pair(improper(2, 12)),
        'DifferentDenominators',
        'Positive',
      ),
    },
  ],
}

const multiply = binary('×', Rational.multiply)

export const multiplication: Topic = {
  id: 'fraction-multiply',
  group: GROUP,
  maybeSection: OPERATIONS,
  title: 'Multiplying fractions',
  sample: [mixed(1, 1, 3), op('×'), mixed(2, 2, 5)],
  levels: [
    {
      description: 'Multiply fractions with small numbers (e.g., 1/4 × 3/5)',
      generate: multiply(pair(proper(2, 9))),
    },
    {
      description: 'Multiply fractions and whole numbers (e.g., 3 × 2/5)',
      generate: multiply(
        pair(Effect.map(int(2, 9), wholeNumber), proper(2, 9)),
      ),
    },
    {
      description: 'Multiply mixed numbers (e.g., 1 1/3 × 2 2/5)',
      generate: multiply(pair(mixedOperand([1, 3], [2, 6]))),
    },
    {
      description: 'Multiply improper fractions (e.g., 11/6 × 13/8)',
      generate: multiply(pair(improper(2, 9))),
    },
  ],
}

const divide = binary('÷', Rational.divide)

export const division: Topic = {
  id: 'fraction-divide',
  group: GROUP,
  maybeSection: OPERATIONS,
  title: 'Dividing fractions',
  sample: [frac(3, 4), op('÷'), frac(2, 5)],
  levels: [
    {
      description: 'Divide fractions with small numbers (e.g., 3/4 ÷ 2/5)',
      generate: divide(pair(proper(2, 9))),
    },
    {
      description: 'Divide whole numbers by fractions (e.g., 2 ÷ 3/5)',
      generate: divide(pair(Effect.map(int(2, 9), wholeNumber), proper(2, 9))),
    },
    {
      description: 'Divide mixed numbers (e.g., 3 1/2 ÷ 2 2/3)',
      generate: divide(pair(mixedOperand([1, 3], [2, 6]))),
    },
    {
      description: 'Divide improper fractions (e.g., 9/4 ÷ 7/6)',
      generate: divide(pair(improper(2, 9))),
    },
  ],
}

const convert = (
  token: Token,
  value: Rational.Rational,
  form: FractionForm,
): Problem => ({ tokens: [token], answer: fractionAnswer(value, form) })

/** Scales a fraction that is already in lowest terms by a common factor. */
const unsimplified = (base: Generator<Operand>, factors: Range): Generator =>
  Effect.gen(function* () {
    const { value } = yield* base
    const factor = yield* int(factors[0], factors[1])
    return convert(frac(value.n * factor, value.d * factor), value, 'simplest')
  })

const PRIMES = [7, 11, 13, 17, 19, 23] as const

const NO_SCALING: Range = [1, 1]

export const simplifying: Topic = {
  id: 'fraction-simplify',
  group: GROUP,
  maybeSection: CONVERTING,
  title: 'Simplifying fractions',
  sample: [frac(12, 18)],
  levels: [
    {
      description:
        'Simplify fractions with small numerators and denominators (e.g., 4/6 to 2/3)',
      generate: unsimplified(proper(2, 6), [2, 4]),
    },
    {
      description:
        'Simplify fractions with larger numbers (e.g., 20/60 to 1/3)',
      generate: unsimplified(proper(2, 9), [5, 12]),
    },
    {
      description:
        'Simplify improper fractions to simplest form (e.g., 45/30 to 3/2)',
      generate: unsimplified(improper(2, 9), [2, 9]),
    },
    {
      description:
        'Simplify fractions with large common factors (e.g., 96/144 to 2/3)',
      generate: unsimplified(proper(2, 9), [12, 48]),
    },
    {
      description:
        'Simplify fractions with a hidden prime factor (e.g., 77/143 to 7/11)',
      generate: Effect.gen(function* () {
        const { value } = yield* proper(3, 13)
        const prime = yield* pick(PRIMES)
        yield* skipWhen(value.n === 1)
        return convert(
          frac(value.n * prime, value.d * prime),
          value,
          'simplest',
        )
      }),
    },
  ],
}

const toMixedLevel = (
  wholes: Range,
  denominator: Effect.Effect<number>,
  factors: Range = NO_SCALING,
): Generator =>
  Effect.gen(function* () {
    const d = yield* denominator
    const n = yield* int(1, d - 1)
    yield* skipWhen(Rational.gcd(n, d) !== 1)
    const whole = yield* int(wholes[0], wholes[1])
    const factor = yield* int(factors[0], factors[1])
    const value = Rational.make(whole * d + n, d)
    return convert(frac(value.n * factor, value.d * factor), value, 'mixed')
  })

export const improperToMixed: Topic = {
  id: 'fraction-to-mixed',
  group: GROUP,
  maybeSection: CONVERTING,
  title: 'Improper fraction to mixed number',
  sample: [frac(22, 7)],
  levels: [
    {
      description:
        'Numerator just a little larger than the denominator (e.g., 7/4 to 1 3/4)',
      generate: toMixedLevel([1, 1], int(2, 15)),
    },
    {
      description: 'Larger numerators (e.g., 22/7 to 3 1/7)',
      generate: toMixedLevel([2, 5], int(2, 9)),
    },
    {
      description:
        'Numerator much larger than the denominator (e.g., 58/9 to 6 4/9)',
      generate: toMixedLevel([6, 12], int(2, 12)),
    },
    {
      description:
        'Convert, then simplify the fraction part (e.g., 45/6 to 7 1/2)',
      generate: toMixedLevel([2, 9], int(2, 9), [2, 5]),
    },
    {
      description: 'Prime denominators (e.g., 77/13 to 5 12/13)',
      generate: toMixedLevel([2, 9], pick(PRIMES)),
    },
  ],
}

const toImproperLevel = (
  wholes: Range,
  denominator: Effect.Effect<number>,
  factors: Range = NO_SCALING,
): Generator =>
  Effect.gen(function* () {
    const d = yield* denominator
    const n = yield* int(1, d - 1)
    yield* skipWhen(Rational.gcd(n, d) !== 1)
    const whole = yield* int(wholes[0], wholes[1])
    const factor = yield* int(factors[0], factors[1])
    return convert(
      mixed(whole, n * factor, d * factor),
      Rational.make(whole * d + n, d),
      'improper',
    )
  })

export const mixedToImproper: Topic = {
  id: 'fraction-to-improper',
  group: GROUP,
  maybeSection: CONVERTING,
  title: 'Mixed number to improper fraction',
  sample: [mixed(3, 1, 2)],
  levels: [
    {
      description:
        'Small whole numbers and fraction parts (e.g., 3 1/2 to 7/2)',
      generate: toImproperLevel([1, 5], int(2, 6)),
    },
    {
      description: 'Mixed numbers with larger fractions (e.g., 8 5/6 to 53/6)',
      generate: toImproperLevel([5, 12], int(5, 12)),
    },
    {
      description: 'Simplify after converting (e.g., 6 4/8 to 13/2)',
      generate: toImproperLevel([2, 9], int(2, 6), [2, 4]),
    },
    {
      description: 'Prime denominators (e.g., 9 7/13 to 124/13)',
      generate: toImproperLevel([5, 12], pick(PRIMES)),
    },
    {
      description:
        'Large whole numbers and denominators (e.g., 15 3/16 to 243/16)',
      generate: toImproperLevel([10, 20], int(11, 20)),
    },
  ],
}

const comparisonOf = (a: Operand, b: Operand): Comparison => {
  const order = Rational.compare(a.value, b.value)
  if (order < 0) {
    return '<'
  }
  return order > 0 ? '>' : '='
}

const compareOperands = ([a, b]: Pair): Problem => ({
  tokens: [a.token, blank, b.token],
  answer: Answer.Comparison({ value: comparisonOf(a, b) }),
})

/** A proper fraction that may still be reducible, so `1/2 = 2/4` can turn up. */
const anyProper: Generator<Operand> = Effect.gen(function* () {
  const d = yield* int(2, 12)
  const n = yield* int(1, d - 1)
  return fraction(n, d)
})

export const comparing: Topic = {
  id: 'fraction-compare',
  group: GROUP,
  maybeSection: COMPARING,
  title: 'Comparing fractions',
  sample: [frac(3, 8), blank, frac(2, 5)],
  levels: [
    {
      description:
        'Compare fractions with the same denominator (e.g., 3/8 vs 5/8)',
      generate: Effect.gen(function* () {
        const [a, b] = yield* sameDenominator
        yield* skipWhen(a.value.n === b.value.n)
        return compareOperands([a, b])
      }),
    },
    {
      description:
        'Compare fractions with different denominators (e.g., 2/5 vs 3/8)',
      generate: Effect.gen(function* () {
        const [a, b] = yield* pair(anyProper)
        yield* skipWhen(a.value.d === b.value.d)
        return compareOperands([a, b])
      }),
    },
    {
      description: 'Compare improper fractions (e.g., 7/4 vs 9/5)',
      generate: Effect.gen(function* () {
        const [a, b] = yield* pair(improper(2, 12))
        yield* skipWhen(a.value.d === b.value.d)
        return compareOperands([a, b])
      }),
    },
    {
      description: 'Compare fractions and mixed numbers (e.g., 11/6 vs 1 2/3)',
      generate: Effect.gen(function* () {
        const a = yield* improper(2, 12)
        const b = yield* mixedOperand([1, 2], [2, 12])
        yield* skipWhen(a.value.d === b.value.d)
        const isSwapped = (yield* int(0, 1)) === 1
        return compareOperands(isSwapped ? [b, a] : [a, b])
      }),
    },
  ],
}

export const topics: ReadonlyArray<Topic> = [
  addition,
  subtraction,
  multiplication,
  division,
  simplifying,
  improperToMixed,
  mixedToImproper,
  comparing,
]
