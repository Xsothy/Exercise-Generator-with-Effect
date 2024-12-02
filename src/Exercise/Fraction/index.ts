import { BigInt, Equal, Hash, Option } from "effect"

export class Fraction implements Equal.Equal {
    constructor(
        readonly numerator: bigint,
        readonly denominator: bigint
    ) {
    }
    [Equal.symbol](that: Equal.Equal): boolean {
        if (that instanceof Fraction) {
            return (
                Equal.equals(this.numerator, that.numerator)
                && Equal.equals(this.denominator, that.denominator)
            )
        }
        return false
    }

    [Hash.symbol](): number {
        return (parseInt(`${this.numerator}${this.denominator}`))
    }

    get simplify(): Fraction {
        const commonDivisor = BigInt.gcd(this.numerator, this.denominator)
        return new Fraction(
            BigInt.unsafeDivide(this.numerator, commonDivisor),
            BigInt.unsafeDivide(this.denominator, commonDivisor)
        )
    }

    toNumber(): {
        numerator: number
        denominator: number
    } {
        return {
            numerator: Option.getOrThrow(BigInt.toNumber(this.numerator)),
            denominator: Option.getOrThrow(BigInt.toNumber(this.denominator))
        }
    }

    get display(): string {
        const { denominator, numerator } = this.toNumber()
        return `${numerator}/${denominator}`
    }
}
export * as Arithmetic from "./Arithmetic/index.js"
export * as Comparing from "./Comparing.js"
export * as Converting from "./Converting/index.js"
export * as Simplifying from "./Simplifying.js"
