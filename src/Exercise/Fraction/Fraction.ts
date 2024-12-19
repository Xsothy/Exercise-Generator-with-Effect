import { BigDecimal, BigInt, Effect, Equal, Hash, Option, pipe } from "effect"
import SkipGenerateException from "src/Exception/SkipGenerateException.js"

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
            BigInt.unsafeDivide(this.denominator, commonDivisor),
            this.whole
        )
    }

    toMixed(): Fraction {
        const numeratorDecimal = BigDecimal.fromBigInt(this.numerator)
        const denominatorDecimal = BigDecimal.fromBigInt(this.denominator)
        const remainder = BigDecimal.unsafeRemainder(numeratorDecimal, denominatorDecimal)
        const whole = pipe(
            BigInt.unsafeDivide(this.numerator, this.denominator),
            BigInt.sum(this.whole ?? 0n),
            BigDecimal.fromBigInt,
            BigDecimal.isNegative(remainder) ? BigDecimal.negate : (_) => _
        )
        return new Fraction(
            BigDecimal.abs(remainder).value,
            this.denominator,
            whole.value
        )
    }

    mixedToFranc(): Fraction {
        if (!this.whole) return this

        return new Fraction(
            pipe(
                this.denominator,
                BigInt.multiply(this.whole),
                BigInt.sum(this.denominator)
            ),
            this.denominator
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

export const SkipNoRemainder: (num: Fraction) => Effect.Effect<
    void,
    SkipGenerateException
> = (num) =>
    Effect.gen(function*() {
        if (
            BigDecimal.unsafeRemainder(
                BigDecimal.fromBigInt(num.numerator),
                BigDecimal.fromBigInt(num.denominator)
            ).value === 0n
        ) yield* new SkipGenerateException()
    })
