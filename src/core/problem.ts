import { Array, Option, Schema, pipe } from 'effect'
import { defineTaggedUnion } from 'foldkit/schema'

import * as Rational from './rational'

// TOKEN

/** A piece of a question or answer that the view knows how to draw. `Blank` is
 *  the empty slot between the two sides of a comparison. */
export const Token = defineTaggedUnion({
  Num: { text: Schema.String },
  Frac: {
    maybeWhole: Schema.Option(Schema.Number),
    n: Schema.Number,
    d: Schema.Number,
  },
  Op: { symbol: Schema.String },
  Blank: {},
})
export type Token = typeof Token.Type

export const num = (value: number | string): Token =>
  Token.Num({ text: `${value}` })

export const frac = (n: number, d: number): Token =>
  Token.Frac({ maybeWhole: Option.none(), n, d })

export const mixed = (whole: number, n: number, d: number): Token =>
  Token.Frac({ maybeWhole: Option.some(whole), n, d })

export const op = (symbol: string): Token => Token.Op({ symbol })

export const blank: Token = Token.Blank()

// ANSWER

/** How strictly the shape of a fraction answer is judged, on top of its value.
 *  `simplest` accepts a mixed number or an improper fraction in lowest terms;
 *  `mixed` and `improper` also insist on that form. */
export const FractionForm = Schema.Literals(['simplest', 'mixed', 'improper'])
export type FractionForm = typeof FractionForm.Type

export const Comparison = Schema.Literals(['<', '=', '>'])
export type Comparison = typeof Comparison.Type

export const Answer = defineTaggedUnion({
  Decimal: { value: Schema.String },
  Remainder: { quotient: Schema.Number, remainder: Schema.Number },
  Fraction: { n: Schema.Number, d: Schema.Number, form: FractionForm },
  Comparison: { value: Comparison },
})
export type Answer = typeof Answer.Type

export const fractionAnswer = (
  value: Rational.Rational,
  form: FractionForm,
): Answer => Answer.Fraction({ n: value.n, d: value.d, form })

// PROBLEM

export const Problem = Schema.Struct({
  tokens: Schema.Array(Token),
  answer: Answer,
})
export type Problem = typeof Problem.Type

/** Formats `value / 10^scale` exactly, without trailing zeros. */
export const formatDecimal = (value: number, scale: number): string => {
  const sign = value < 0 ? '-' : ''
  const digits = `${Math.abs(value)}`.padStart(scale + 1, '0')
  const whole = digits.slice(0, digits.length - scale)
  const fraction = digits.slice(digits.length - scale).replace(/0+$/, '')
  return `${sign}${whole}${fraction === '' ? '' : `.${fraction}`}`
}

export const tokenText = (token: Token): string =>
  Token.match<string>(token, {
    Num: ({ text }) => text,
    Op: ({ symbol }) => symbol,
    Blank: () => '__',
    Frac: ({ maybeWhole, n, d }) =>
      Option.match(maybeWhole, {
        onNone: () => `${n}/${d}`,
        onSome: whole => `${whole} ${n}/${d}`,
      }),
  })

/** Plain-text form of a question, also used to detect duplicates. */
export const questionText = (problem: Problem): string =>
  pipe(problem.tokens, Array.map(tokenText), Array.join(' '))

const fractionAnswerTokens = (
  n: number,
  d: number,
  form: FractionForm,
): ReadonlyArray<Token> => {
  const value = Rational.reduce(Rational.make(n, d))
  if (Rational.isInteger(value)) {
    return [num(value.n / value.d)]
  }

  const asMixed = Rational.toMixed(value)
  const isProper = asMixed.whole === 0
  const mixedToken = isProper
    ? frac(asMixed.n, asMixed.d)
    : mixed(asMixed.whole, asMixed.n, asMixed.d)

  if (form === 'mixed') {
    return [mixedToken]
  }
  if (form === 'improper' || isProper) {
    return [frac(value.n, value.d)]
  }
  return [frac(value.n, value.d), op('='), mixedToken]
}

/** The model answer, drawn the way we would like a student to write it. */
export const answerTokens = (answer: Answer): ReadonlyArray<Token> =>
  Answer.match<ReadonlyArray<Token>>(answer, {
    Decimal: ({ value }) => [num(value)],
    Remainder: ({ quotient, remainder }) => [
      num(remainder === 0 ? quotient : `${quotient} R${remainder}`),
    ],
    Comparison: ({ value }) => [op(value)],
    Fraction: ({ n, d, form }) => fractionAnswerTokens(n, d, form),
  })

/** The model answer as plain text; always accepted by `Check.check`. */
export const answerText = (answer: Answer): string =>
  pipe(
    answerTokens(answer),
    Array.head,
    Option.match({ onNone: () => '', onSome: tokenText }),
  )
