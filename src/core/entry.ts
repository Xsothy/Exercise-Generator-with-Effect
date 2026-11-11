import { Array, Option, String, pipe } from 'effect'

import { Answer, type Problem } from './problem'

/** One box a student fills in. A fraction is entered as separate numerator and
 *  denominator boxes, plus a whole-number box where a mixed number may be the
 *  answer, rather than typed as free text such as `1 3/4`. */
export type Field =
  | 'value'
  | 'whole'
  | 'numerator'
  | 'denominator'
  | 'quotient'
  | 'remainder'
  | 'sign'

const MIXED_FIELDS: ReadonlyArray<Field> = ['whole', 'numerator', 'denominator']
const FRACTION_FIELDS: ReadonlyArray<Field> = ['numerator', 'denominator']

/** The boxes needed to answer a problem, in reading order. */
export const fields = (problem: Problem): ReadonlyArray<Field> =>
  Answer.match<ReadonlyArray<Field>>(problem.answer, {
    Decimal: () => ['value'],
    Remainder: () => ['quotient', 'remainder'],
    Comparison: () => ['sign'],
    // NOTE: converting to an improper fraction, or simplifying a single
    // fraction, never calls for a whole part; the result of a calculation may.
    Fraction: ({ form }) =>
      form === 'mixed' || (form === 'simplest' && problem.tokens.length > 1)
        ? MIXED_FIELDS
        : FRACTION_FIELDS,
  })

export const emptyResponse = (problem: Problem): ReadonlyArray<string> =>
  Array.map(fields(problem), () => '')

const maskDecimal = (input: string): string => {
  const [whole = '', ...rest] = input.replace(/[^0-9.,]/g, '').split('.')
  return Array.isArrayEmpty(rest)
    ? whole
    : `${whole}.${rest.join('').replace(/,/g, '')}`
}

/** Strips characters that cannot appear in a box, so only valid input stays. */
export const mask = (field: Field, input: string): string => {
  if (field === 'sign') {
    return input
  }
  return field === 'value' ? maskDecimal(input) : input.replace(/\D/g, '')
}

const partOf =
  (boxes: ReadonlyArray<Field>, parts: ReadonlyArray<string>) =>
  (field: Field): string =>
    pipe(
      Array.findFirstIndex(boxes, box => box === field),
      Option.flatMap(index => Array.get(parts, index)),
      Option.match({ onNone: () => '', onSome: String.trim }),
    )

/** Joins the boxes into the text form understood by `Check.check`. */
export const compose = (
  boxes: ReadonlyArray<Field>,
  parts: ReadonlyArray<string>,
): string => {
  const part = partOf(boxes, parts)

  if (Array.contains(boxes, 'numerator')) {
    const n = part('numerator')
    const d = part('denominator')
    // NOTE: a whole number on its own is a complete answer; half a fraction is
    // not, so it is kept as `3/` and reported as incomplete.
    const fraction = n === '' && d === '' ? '' : `${n}/${d}`
    return pipe(
      [part('whole'), fraction],
      Array.filter(String.isNonEmpty),
      Array.join(' '),
    )
  }

  if (Array.contains(boxes, 'quotient')) {
    const remainder = part('remainder')
    return remainder === ''
      ? part('quotient')
      : `${part('quotient')} R${remainder}`
  }

  return pipe(
    Array.head(boxes),
    Option.match({ onNone: () => '', onSome: part }),
  )
}
