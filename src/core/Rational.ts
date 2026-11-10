/**
 * Minimal exact rational arithmetic. The denominator is always positive and
 * values are *not* reduced automatically, so `2/4` stays `2/4` until `reduce`.
 */
export interface Rational {
    readonly n: number
    readonly d: number
}

export const gcd = (a: number, b: number): number => {
    let x = Math.abs(a)
    let y = Math.abs(b)
    while (y !== 0) {
        ;[x, y] = [y, x % y]
    }
    return x
}

export const make = (n: number, d: number = 1): Rational => (d < 0 ? { n: -n, d: -d } : { n, d })

export const reduce = (r: Rational): Rational => {
    const g = gcd(r.n, r.d) || 1
    return { n: r.n / g, d: r.d / g }
}

export const isReduced = (r: Rational): boolean => gcd(r.n, r.d) === 1

export const isInteger = (r: Rational): boolean => r.n % r.d === 0

export const add = (a: Rational, b: Rational): Rational => reduce(make(a.n * b.d + b.n * a.d, a.d * b.d))

export const subtract = (a: Rational, b: Rational): Rational => reduce(make(a.n * b.d - b.n * a.d, a.d * b.d))

export const multiply = (a: Rational, b: Rational): Rational => reduce(make(a.n * b.n, a.d * b.d))

export const divide = (a: Rational, b: Rational): Rational => reduce(make(a.n * b.d, a.d * b.n))

/** Negative when `a < b`, zero when equal in value, positive when `a > b`. */
export const compare = (a: Rational, b: Rational): number => a.n * b.d - b.n * a.d

export const equals = (a: Rational, b: Rational): boolean => compare(a, b) === 0

/** Splits a non-negative rational into whole part and proper remainder. */
export const toMixed = (r: Rational): { whole: number; n: number; d: number } => {
    const whole = Math.trunc(r.n / r.d)
    return { whole, n: Math.abs(r.n - whole * r.d), d: r.d }
}
