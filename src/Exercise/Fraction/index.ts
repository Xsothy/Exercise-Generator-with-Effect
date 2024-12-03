import { BigDecimal, BigInt, Equal, Hash, Option } from "effect"

export class Fraction implements Equal.Equal {
    constructor(
        readonly numerator: bigint,
        readonly denominator: bigint,
        readonly whole?: bigint
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
        return (parseInt(`${this.whole ?? ""}${this.numerator}${this.denominator}`))
    }

    get simplify(): Fraction {
        const commonDivisor = BigInt.gcd(this.numerator, this.denominator)
        return new Fraction(
            BigInt.unsafeDivide(this.numerator, commonDivisor),
            BigInt.unsafeDivide(this.denominator, commonDivisor)
        )
    }

    toMixed(): Fraction {
        console.log(this.numerator, this.denominator)
        const numeratorDecimal = BigDecimal.fromBigInt(this.numerator)
        const denominatorDecimal = BigDecimal.fromBigInt(this.denominator)
        const remainder = BigDecimal.unsafeRemainder(numeratorDecimal, denominatorDecimal)
        return new Fraction(
            remainder.value,
            this.denominator,
            BigInt.unsafeDivide(this.numerator, this.denominator) + (this.whole ?? 0n)
        )
    }

    toNumber() {
        const obj: {
            numerator: number
            denominator: number
            whole?: number
        } = {
            numerator: Option.getOrThrow(BigInt.toNumber(this.numerator)),
            denominator: Option.getOrThrow(BigInt.toNumber(this.denominator))
        }
        if (this.whole) {
            obj.whole = Option.getOrThrow(BigInt.toNumber(this.whole))
        }
        return obj
    }

    get display(): string {
        const { denominator, numerator, whole } = this.toNumber()
        if (whole) {
            return `${whole} ${numerator}/${denominator}`
        }
        return `${numerator}/${denominator}`
    }
}
export * as Arithmetic from "./Arithmetic/index.js"
export * as Comparing from "./Comparing.js"
export * as Converting from "./Converting/index.js"
export * as Simplifying from "./Simplifying.js"
