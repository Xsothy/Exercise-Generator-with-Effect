export type Rational = Readonly<{ n: number; d: number }>

export const gcd = (a: number, b: number): number =>
  b === 0 ? Math.abs(a) : gcd(b, a % b)

export const make = (n: number, d: number = 1): Rational =>
  d < 0 ? { n: -n, d: -d } : { n, d }

export const reduce = (rational: Rational): Rational => {
  const divisor = gcd(rational.n, rational.d) || 1
  return { n: rational.n / divisor, d: rational.d / divisor }
}

export const isInteger = (rational: Rational): boolean =>
  rational.n % rational.d === 0

export const add = (a: Rational, b: Rational): Rational =>
  reduce(make(a.n * b.d + b.n * a.d, a.d * b.d))

export const subtract = (a: Rational, b: Rational): Rational =>
  reduce(make(a.n * b.d - b.n * a.d, a.d * b.d))

export const multiply = (a: Rational, b: Rational): Rational =>
  reduce(make(a.n * b.n, a.d * b.d))

export const divide = (a: Rational, b: Rational): Rational =>
  reduce(make(a.n * b.d, a.d * b.n))

/** Negative when `a < b`, zero when equal in value, positive when `a > b`. */
export const compare = (a: Rational, b: Rational): number =>
  a.n * b.d - b.n * a.d

export const equals = (a: Rational, b: Rational): boolean => compare(a, b) === 0

/** Splits a non-negative rational into its whole part and proper remainder. */
export const toMixed = (
  rational: Rational,
): Readonly<{ whole: number; n: number; d: number }> => {
  const whole = Math.trunc(rational.n / rational.d)
  return {
    whole,
    n: Math.abs(rational.n - whole * rational.d),
    d: rational.d,
  }
}
