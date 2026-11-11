import { Option, Schema } from 'effect'
import { defineTaggedUnion } from 'foldkit/schema'

import { Answer, type FractionForm } from './problem'
import * as Rational from './rational'

/** `Almost` is the right value in the wrong shape, such as `2/4` where `1/2` is
 *  wanted. `Invalid` is input that cannot be read as an answer at all. */
export const Verdict = defineTaggedUnion({
  Empty: {},
  Correct: {},
  Incorrect: {},
  Almost: { hint: Schema.String },
  Invalid: { hint: Schema.String },
})
export type Verdict = typeof Verdict.Type

const clean = (input: string): string =>
  input
    .replace(/[−–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()

const normalizeDecimal = (input: string): Option.Option<string> => {
  const match = /^(-?)(\d*)(?:\.(\d*))?$/.exec(input.replace(/[,\s]/g, ''))
  if (match === null) {
    return Option.none()
  }

  const wholeDigits = match[2] ?? ''
  const fractionDigits = match[3] ?? ''
  if (wholeDigits === '' && fractionDigits === '') {
    return Option.none()
  }

  const whole = wholeDigits.replace(/^0+(?=\d)/, '') || '0'
  const fraction = fractionDigits.replace(/0+$/, '')
  const isNegative = match[1] === '-' && /[1-9]/.test(`${whole}${fraction}`)
  return Option.some(
    `${isNegative ? '-' : ''}${whole}${fraction === '' ? '' : `.${fraction}`}`,
  )
}

type ParsedFraction = Readonly<{
  maybeWhole: Option.Option<number>
  n: number
  d: number
}>

export const parseFraction = (input: string): Option.Option<ParsedFraction> => {
  const text = clean(input)

  const mixedMatch = /^(-?\d+) (\d+) ?\/ ?(\d+)$/.exec(text)
  if (mixedMatch !== null) {
    return Option.some({
      maybeWhole: Option.some(Number(mixedMatch[1])),
      n: Number(mixedMatch[2]),
      d: Number(mixedMatch[3]),
    })
  }

  const fractionMatch = /^(-?\d+) ?\/ ?(\d+)$/.exec(text)
  if (fractionMatch !== null) {
    return Option.some({
      maybeWhole: Option.none(),
      n: Number(fractionMatch[1]),
      d: Number(fractionMatch[2]),
    })
  }

  return /^-?\d+$/.test(text)
    ? Option.some({ maybeWhole: Option.none(), n: Number(text), d: 1 })
    : Option.none()
}

const INCOMPLETE_FRACTION = 'Fill in both the numerator and the denominator'

const checkParsedFraction = (
  expected: Rational.Rational,
  form: FractionForm,
  { maybeWhole, n, d }: ParsedFraction,
): Verdict => {
  if (d === 0) {
    return Verdict.Invalid({ hint: INCOMPLETE_FRACTION })
  }

  const whole = Option.getOrElse(maybeWhole, () => 0)
  const sign = whole < 0 ? -1 : 1
  const value = Rational.make(whole * d + sign * n, d)
  if (!Rational.equals(value, expected)) {
    return Verdict.Incorrect()
  }

  const hasWhole = Option.isSome(maybeWhole)
  // NOTE: a whole-number answer has only one sensible way to be written.
  if (d === 1 || n === 0) {
    return Verdict.Correct()
  }
  if (Rational.gcd(n, d) !== 1) {
    return Verdict.Almost({ hint: 'Right value. Now simplify it.' })
  }
  if (hasWhole && n >= d) {
    return Verdict.Almost({
      hint: 'The fraction part of a mixed number must be less than 1',
    })
  }
  if (form === 'mixed' && !hasWhole && Math.abs(n) > d) {
    return Verdict.Almost({ hint: 'Right value. Write it as a mixed number.' })
  }
  if (form === 'improper' && hasWhole) {
    return Verdict.Almost({
      hint: 'Right value. Write it as a single fraction.',
    })
  }
  return Verdict.Correct()
}

const checkRemainder = (
  quotient: number,
  remainder: number,
  input: string,
): Verdict => {
  const match = /^(\d+)(?: ?r(?:em(?:ainder)?)? ?(\d+))?$/i.exec(
    clean(input).replace(/,/g, ''),
  )
  if (match === null) {
    return Verdict.Invalid({ hint: 'Fill in the quotient' })
  }
  return Number(match[1]) === quotient && Number(match[2] ?? 0) === remainder
    ? Verdict.Correct()
    : Verdict.Incorrect()
}

const checkComparison = (expected: string, input: string): Verdict => {
  const value = clean(input)
  if (value !== '<' && value !== '=' && value !== '>') {
    return Verdict.Invalid({ hint: 'Choose <, = or >' })
  }
  return value === expected ? Verdict.Correct() : Verdict.Incorrect()
}

/** Marks what a student entered against the model answer. */
export const check = (answer: Answer, input: string): Verdict => {
  if (clean(input) === '') {
    return Verdict.Empty()
  }

  return Answer.match<Verdict>(answer, {
    Decimal: ({ value }) =>
      Option.match(normalizeDecimal(clean(input)), {
        onNone: () => Verdict.Invalid({ hint: 'Enter a number' }),
        onSome: entered =>
          entered === value ? Verdict.Correct() : Verdict.Incorrect(),
      }),
    Remainder: ({ quotient, remainder }) =>
      checkRemainder(quotient, remainder, input),
    Fraction: ({ n, d, form }) =>
      Option.match(parseFraction(input), {
        onNone: () => Verdict.Invalid({ hint: INCOMPLETE_FRACTION }),
        onSome: parsed =>
          checkParsedFraction(Rational.make(n, d), form, parsed),
      }),
    Comparison: ({ value }) => checkComparison(value, input),
  })
}
