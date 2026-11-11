import { Effect, Option } from 'effect'

import { type Generator, int, skipWhen } from '../generator'
import { Answer, type Problem, formatDecimal, num, op } from '../problem'
import type { Topic } from '../topic'

const GROUP = 'Arithmetic'

type Range = readonly [min: number, max: number]

const ONE_DIGIT: Range = [1, 9]
const TWO_DIGITS: Range = [10, 99]
const THREE_DIGITS: Range = [100, 999]
const FOUR_DIGITS: Range = [1000, 9999]
const FIVE_DIGITS: Range = [10000, 99999]
const SMALL_FACTOR: Range = [2, 9]

const whole = (
  a: number,
  symbol: string,
  b: number,
  answer: number,
): Problem => ({
  tokens: [num(a), op(symbol), num(b)],
  answer: Answer.Decimal({ value: `${answer}` }),
})

const decimal = (
  a: string,
  symbol: string,
  b: string,
  answer: string,
): Problem => ({
  tokens: [num(a), op(symbol), num(b)],
  answer: Answer.Decimal({ value: answer }),
})

/** Two amounts with two decimal places, as integers counted in hundredths. */
const hundredths = Effect.all([int(101, 9999), int(101, 9999)])

const additionLevel = ([min, max]: Range): Generator =>
  Effect.gen(function* () {
    const a = yield* int(min, max)
    const b = yield* int(min, max)
    return whole(a, '+', b, a + b)
  })

export const addition: Topic = {
  id: 'add',
  group: GROUP,
  maybeSection: Option.none(),
  title: 'Addition',
  sample: [num(46), op('+'), num(37)],
  levels: [
    {
      description: 'Add two 1-digit numbers (e.g., 7 + 8)',
      generate: additionLevel(ONE_DIGIT),
    },
    {
      description: 'Add two 2-digit numbers (e.g., 46 + 37)',
      generate: additionLevel(TWO_DIGITS),
    },
    {
      description: 'Add two 3-digit numbers (e.g., 358 + 276)',
      generate: additionLevel(THREE_DIGITS),
    },
    {
      description: 'Add two 4-digit numbers (e.g., 4,829 + 3,756)',
      generate: additionLevel(FOUR_DIGITS),
    },
    {
      description: 'Add decimals (e.g., 12.34 + 5.6)',
      generate: Effect.gen(function* () {
        const [a, b] = yield* hundredths
        return decimal(
          formatDecimal(a, 2),
          '+',
          formatDecimal(b, 2),
          formatDecimal(a + b, 2),
        )
      }),
    },
  ],
}

const subtractionLevel = ([min, max]: Range): Generator =>
  Effect.gen(function* () {
    const a = yield* int(min, max)
    const b = yield* int(min, max)
    yield* skipWhen(a <= b)
    return whole(a, '−', b, a - b)
  })

export const subtraction: Topic = {
  id: 'subtract',
  group: GROUP,
  maybeSection: Option.none(),
  title: 'Subtraction',
  sample: [num(83), op('−'), num(47)],
  levels: [
    {
      description: 'Subtract 1-digit numbers (e.g., 9 − 4)',
      generate: subtractionLevel(ONE_DIGIT),
    },
    {
      description: 'Subtract 2-digit numbers (e.g., 83 − 47)',
      generate: subtractionLevel(TWO_DIGITS),
    },
    {
      description: 'Subtract 3-digit numbers (e.g., 612 − 378)',
      generate: subtractionLevel(THREE_DIGITS),
    },
    {
      description: 'Subtract 4-digit numbers (e.g., 7,204 − 3,568)',
      generate: subtractionLevel(FOUR_DIGITS),
    },
    {
      description: 'Subtract decimals (e.g., 12.34 − 5.6)',
      generate: Effect.gen(function* () {
        const [a, b] = yield* hundredths
        yield* skipWhen(a <= b)
        return decimal(
          formatDecimal(a, 2),
          '−',
          formatDecimal(b, 2),
          formatDecimal(a - b, 2),
        )
      }),
    },
  ],
}

const multiplicationLevel = (first: Range, second: Range): Generator =>
  Effect.gen(function* () {
    const a = yield* int(first[0], first[1])
    const b = yield* int(second[0], second[1])
    return whole(a, '×', b, a * b)
  })

export const multiplication: Topic = {
  id: 'multiply',
  group: GROUP,
  maybeSection: Option.none(),
  title: 'Multiplication',
  sample: [num(34), op('×'), num(56)],
  levels: [
    {
      description:
        'Multiply a 2-digit number by a 1-digit number (e.g., 34 × 6)',
      generate: multiplicationLevel(TWO_DIGITS, SMALL_FACTOR),
    },
    {
      description: 'Multiply two 2-digit numbers (e.g., 34 × 56)',
      generate: multiplicationLevel(TWO_DIGITS, TWO_DIGITS),
    },
    {
      description:
        'Multiply a 4-digit number by a 3-digit number (e.g., 1234 × 567)',
      generate: multiplicationLevel(FOUR_DIGITS, THREE_DIGITS),
    },
    {
      description:
        'Multiply a 5-digit number by a 5-digit number (e.g., 12345 × 67890)',
      generate: multiplicationLevel(FIVE_DIGITS, FIVE_DIGITS),
    },
    {
      description: 'Multiply two numbers with decimals (e.g., 12.34 × 5.67)',
      generate: Effect.gen(function* () {
        const a = yield* int(1001, 9999)
        const b = yield* int(101, 999)
        return decimal(
          formatDecimal(a, 2),
          '×',
          formatDecimal(b, 2),
          formatDecimal(a * b, 4),
        )
      }),
    },
  ],
}

const withRemainder = (a: number, b: number): Problem => ({
  tokens: [num(a), op('÷'), num(b)],
  answer: Answer.Remainder({ quotient: Math.floor(a / b), remainder: a % b }),
})

export const division: Topic = {
  id: 'divide',
  group: GROUP,
  maybeSection: Option.none(),
  title: 'Division',
  sample: [num(29), op('÷'), num(5)],
  levels: [
    {
      description:
        'Simple division with no remainders, using small numbers (e.g., 24 ÷ 6 = 4)',
      generate: Effect.gen(function* () {
        const quotient = yield* int(2, 9)
        const divisor = yield* int(2, 9)
        return whole(quotient * divisor, '÷', divisor, quotient)
      }),
    },
    {
      description:
        'Division of 2-digit numbers with a remainder (e.g., 29 ÷ 5 = 5 R4)',
      generate: Effect.gen(function* () {
        const a = yield* int(10, 99)
        const b = yield* int(2, 9)
        yield* skipWhen(a % b === 0)
        return withRemainder(a, b)
      }),
    },
    {
      description:
        'Long division of 3-digit numbers by 1-digit numbers (e.g., 345 ÷ 7 = 49 R2)',
      generate: Effect.gen(function* () {
        const a = yield* int(100, 999)
        const b = yield* int(2, 9)
        return withRemainder(a, b)
      }),
    },
    {
      description:
        'Division of 5-digit numbers by 2-digit numbers, no remainder (e.g., 86,352 ÷ 56)',
      generate: Effect.gen(function* () {
        const quotient = yield* int(100, 999)
        const divisor = (yield* int(2, 9)) * (yield* int(2, 9))
        yield* skipWhen(divisor < 10)
        return whole(quotient * divisor, '÷', divisor, quotient)
      }),
    },
    {
      description:
        'Division with decimals in the result (e.g., 47 ÷ 8 = 5.875)',
      generate: Effect.gen(function* () {
        const a = yield* int(10, 999)
        const b = yield* int(2, 9)
        // NOTE: keeps only quotients that terminate within three decimal places.
        yield* skipWhen(a % b === 0 || (a * 1000) % b !== 0)
        return decimal(`${a}`, '÷', `${b}`, formatDecimal((a * 1000) / b, 3))
      }),
    },
  ],
}

export const topics: ReadonlyArray<Topic> = [
  addition,
  subtraction,
  multiplication,
  division,
]
