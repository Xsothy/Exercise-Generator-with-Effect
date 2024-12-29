import type { Context, Random } from "effect"
import { BigInt, Effect, Equal, Hash, HashSet, Layer, Match, pipe } from "effect"
import type SkipGenerateException from "src/Exception/SkipGenerateException.js"
import { Exercise } from "src/Exercise/index.js"
import { randomBigIntRange } from "src/utils.js"
import { Fraction, SkipNoRemainder } from "../Fraction.js"

class MultiplicationContext extends Exercise.ExerciseContext<{
    num1: Fraction
    num2: Fraction
    ans: Fraction
}> {
    [Equal.symbol](that: Equal.Equal): boolean {
        if (that instanceof MultiplicationContext) {
            return (
                Equal.equals(this.ctx.num1, that.ctx.num1)
                && Equal.equals(this.ctx.num2, that.ctx.num2)
            )
        }
        return false
    }

    [Hash.symbol](): number {
        return parseInt(`${this.ctx.num1[Hash.symbol]()}${this.ctx.num2[Hash.symbol]()}`)
    }
}

const matchContext: (level: number) => Effect.Effect<
    MultiplicationContext,
    SkipGenerateException,
    Random.Random
> = (level) =>
    Match.value<number>(level).pipe(
        Match.when((level) => level === 4, () =>
            Effect.gen(function*() {
                const denominator1 = yield* randomBigIntRange(2, 20)
                const denominator2 = yield* randomBigIntRange(2, 20)
                const numerator1 = yield* randomBigIntRange(2, BigInt.increment(denominator1))
                const numerator2 = yield* randomBigIntRange(2, BigInt.increment(denominator2))

                const num1 = new Fraction(
                    denominator1 + numerator1,
                    denominator1
                )
                const num2 = new Fraction(
                    denominator2 + numerator2,
                    denominator2
                )

                yield* SkipNoRemainder(num1)
                yield* SkipNoRemainder(num2)

                const ans = new Fraction(
                    num1.numerator * num2.numerator,
                    denominator1 * denominator2
                ).simplify

                return new MultiplicationContext({
                    num1,
                    num2,
                    ans
                })
            })),
        Match.when((level) => level === 3, () =>
            Effect.gen(function*() {
                const denominator1 = yield* randomBigIntRange(2, 10)
                const denominator2 = yield* randomBigIntRange(2, 10)
                const numerator1 = yield* randomBigIntRange(2, BigInt.increment(denominator1))
                const numerator2 = yield* randomBigIntRange(2, BigInt.increment(denominator2))

                const whole2 = yield* randomBigIntRange(1, 4)

                const num1 = new Fraction(
                    numerator1,
                    denominator1
                )
                const num2 = new Fraction(
                    numerator2,
                    denominator2,
                    whole2
                )

                yield* SkipNoRemainder(num1)
                yield* SkipNoRemainder(num2)

                const fracNum2 = num2.mixedToFranc()

                const ans = new Fraction(
                    BigInt.multiply(num1.numerator, fracNum2.numerator),
                    BigInt.multiply(num1.denominator, fracNum2.denominator)
                ).simplify.toMixed()

                return new MultiplicationContext({
                    num1,
                    num2,
                    ans
                })
            })),
        Match.when((level) => level === 2, () =>
            Effect.gen(function*() {
                const denominator1 = yield* randomBigIntRange(2, 10)
                const denominator2 = yield* randomBigIntRange(2, 10)
                const numerator1 = yield* randomBigIntRange(2, BigInt.increment(denominator1))
                const numerator2 = yield* randomBigIntRange(2, BigInt.increment(denominator2))
                const whole1 = yield* randomBigIntRange(1, 4)
                const whole2 = yield* randomBigIntRange(1, 4)

                const num1 = new Fraction(
                    numerator1,
                    denominator1,
                    whole1
                )
                const num2 = new Fraction(
                    numerator2,
                    denominator2,
                    whole2
                )

                yield* SkipNoRemainder(num1)
                yield* SkipNoRemainder(num2)

                const ans = new Fraction(
                    BigInt.multiply(num1.numerator, num2.numerator),
                    BigInt.multiply(num1.denominator, num2.denominator),
                    BigInt.multiply(num1.whole ?? 0n, num2.whole ?? 0n)
                ).simplify.toMixed()

                return new MultiplicationContext({
                    num1,
                    num2,
                    ans
                })
            })),
        Match.orElse(() =>
            Effect.gen(function*() {
                const denominator1 = yield* randomBigIntRange(2, 10)
                const denominator2 = yield* randomBigIntRange(2, 10)
                const numerator1 = yield* randomBigIntRange(2, BigInt.increment(denominator1))
                const numerator2 = yield* randomBigIntRange(2, BigInt.increment(denominator2))

                const num1 = new Fraction(
                    numerator1,
                    denominator1
                )
                const num2 = new Fraction(
                    numerator2,
                    denominator2
                )

                yield* SkipNoRemainder(num1)
                yield* SkipNoRemainder(num2)

                const ans = new Fraction(
                    num1.numerator * num2.numerator,
                    denominator1 * denominator2
                ).simplify

                return new MultiplicationContext({
                    num1,
                    num2,
                    ans
                })
            })
        )
    )

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (level: number) =>
    Effect.gen(function*() {
        const contexts = yield* pipe(
            level,
            matchContext,
            Exercise.generateContexts
        )
        let question = ""
        let answer = ""
        let i = 0
        HashSet.forEach(contexts, (ctx) => {
            const { ans, num1, num2 } = ctx.ctx
            question += `${i + 1}. ${num1.display} * ${num2.display} = \n`
            answer += `${i + 1}. ${num1.display} * ${num2.display} = ${ans.display}\n`
            i++
        })

        return { question, answer }
    })

export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "multiply",
        title: "Multiplication",
        levelDescription: {
            1: "Multiply fractions with small numbers (e.g., 1/4 × 3/5)",
            2: "Multiply mixed numbers (e.g., 1 1/3 × 2 2/5)",
            3: "Multiply fractions and whole numbers (e.g., 3 × 2/5)",
            4: "Multiply improper fractions (e.g., 11/6 × 13/8)"
            // 5: "Real-world scenarios: area of a rectangle with fractional dimensions (e.g., 3/4 × 2/5)"
        },
        availableLevels: 4,
        generate
    })
)
