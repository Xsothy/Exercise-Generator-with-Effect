import type { Random } from "effect"
import { BigDecimal, BigInt, Effect, Equal, Hash, HashSet, Layer, Match } from "effect"
import SkipGenerateException from "src/Exception/SkipGenerateException.js"
import { Exercise } from "src/Exercise/index.js"
import { randomBigIntRange } from "src/utils.js"

class DivisionContext extends Exercise.ExerciseContext<{
    num1: BigDecimal.BigDecimal
    num2: BigDecimal.BigDecimal
    ans: string
}> {
    static make({ ans, num1, num2 }: { num1: bigint; num2: bigint; ans: string }) {
        return new DivisionContext({
            num1: BigDecimal.fromBigInt(num1),
            num2: BigDecimal.fromBigInt(num2),
            ans
        })
    }

    [Equal.symbol](that: Equal.Equal): boolean {
        if (that instanceof DivisionContext) {
            return (
                Equal.equals(this.ctx.num1, that.ctx.num1) &&
                Equal.equals(this.ctx.num2, that.ctx.num2)
            )
        }
        return false
    }

    [Hash.symbol](): number {
        return parseInt(`${BigDecimal.unsafeToNumber(this.ctx.num1)}${BigDecimal.unsafeToNumber(this.ctx.num2)}`)
    }
}

const matchContext: (level: number) => Effect.Effect<
    DivisionContext,
    SkipGenerateException,
    Random.Random
> = (level) =>
    Match.value<number>(level).pipe(
        Match.when((level) => level === 5, () =>
            Effect.gen(function*() {
                const num1 = yield* randomBigIntRange(1000, 10000).pipe(
                    Effect.andThen(BigDecimal.fromBigInt)
                )
                const num2 = yield* randomBigIntRange(2, 10).pipe(
                    Effect.andThen(BigDecimal.fromBigInt)
                )

                const answer = BigDecimal.unsafeDivide(num1, num2)

                if (answer.scale < 1 || answer.scale > 3) yield* new SkipGenerateException()

                return DivisionContext.make({
                    num1: num1.value,
                    num2: num2.value,
                    ans: BigDecimal.unsafeToNumber(answer).toString()
                })
            })),
        Match.when((level) => level === 4, () =>
            Effect.gen(function*() {
                const num1 = yield* randomBigIntRange(100, 1000)
                const num2 = BigInt.multiply(yield* randomBigIntRange(2, 10), yield* randomBigIntRange(2, 10))

                if (num2 < 10n) yield* new SkipGenerateException()

                return DivisionContext.make({
                    num1: BigInt.multiply(num1, num2),
                    num2,
                    ans: num1.toString()
                })
            })),
        Match.when((level) => level === 3, () =>
            Effect.gen(function*() {
                const num1 = yield* randomBigIntRange(100, 1000)
                const num2 = yield* randomBigIntRange(2, 10)
                const answer = BigInt.unsafeDivide(num1, num2)
                const remainder = BigDecimal.unsafeRemainder(
                    BigDecimal.fromBigInt(num1),
                    BigDecimal.fromBigInt(num2)
                ).value
                return DivisionContext.make({
                    num1,
                    num2,
                    ans: `${answer} R${remainder}`
                })
            })),
        Match.when((level) => level === 2, () =>
            Effect.gen(function*() {
                const num1 = yield* randomBigIntRange(10, 100)
                const num2 = yield* randomBigIntRange(2, 10)
                const answer = BigInt.unsafeDivide(num1, num2)
                const remainder = BigDecimal.unsafeRemainder(
                    BigDecimal.fromBigInt(num1),
                    BigDecimal.fromBigInt(num2)
                ).value

                if (remainder === 0n) yield* new SkipGenerateException()

                return DivisionContext.make({
                    num1,
                    num2,
                    ans: `${answer} R${remainder.toString()}`
                })
            })),
        Match.orElse(() =>
            Effect.gen(function*() {
                const num1 = yield* randomBigIntRange(2, 10)
                const num2 = yield* randomBigIntRange(2, 10)
                return DivisionContext.make({
                    num1: BigInt.multiply(num1, num2),
                    num2,
                    ans: num1.toString()
                })
            })
        )
    )

export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "divide",
        title: "Division",
        levelDescription: {
            1: "Simple division with no remainders, using small numbers (e.g., 24 ÷ 6 = 4)",
            2: "Division of 2-digit numbers with a remainder (e.g., 29 ÷ 5 = 5 R4)",
            3: "Long division of 3-digit numbers by 1-digit numbers (e.g., 345 ÷ 7)",
            4: "Division of 5-digit numbers by 2-digit numbers but from multiple of 1-digit number\n" +
                "(e.g., 86,352 ÷ 56) from 8 * 7 = 56",
            5: "Division with decimals in the result (e.g., 47 ÷ 8 = 5.875)"
        },
        availableLevels: 5,
        generate: (level) =>
            Effect.gen(function*() {
                const contexts = yield* Exercise.generateContexts(matchContext(level))

                let question = ""
                let answer = ""
                let i = 0
                HashSet.forEach(contexts, (ctx) => {
                    const { ans, num1, num2 } = ctx.ctx
                    question += `${i + 1}. ${num1.value.toString()} / ${num2.value.toString()} = \n`
                    answer += `${i + 1}. ${num1.value.toString()} / ${num2.value.toString()} = ${ans}\n`
                    i++
                })

                return { question, answer, contexts }
            })
    })
)
