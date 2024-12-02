import type { Context, Random } from "effect"
import { BigDecimal, BigInt, Effect, Equal, Hash, HashSet, Layer, Match, pipe } from "effect"
import SkipGenerateException from "src/Exception/SkipGenerateException.js"
import { Fraction } from "src/Exercise/Fraction/index.js"
import { Exercise } from "src/Exercise/index.js"
import { randomBigIntRange } from "src/utils.js"

class AdditionContext extends Exercise.ExerciseContext<{
    num1: Fraction
    num2: Fraction
    ans: Fraction
}> {
    [Equal.symbol](that: Equal.Equal): boolean {
        if (that instanceof AdditionContext) {
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
    AdditionContext,
    SkipGenerateException,
    Random.Random
> = (level) =>
    Match.value<number>(level).pipe(
        Match.when((level) => level === 2, () =>
            Effect.gen(function*() {
                const denominator1 = yield* randomBigIntRange(2, 10)
                const denominator2 = yield* randomBigIntRange(2, 10)
                const numerator1 = yield* randomBigIntRange(2, BigInt.increment(denominator1))
                const numerator2 = yield* randomBigIntRange(2, BigInt.increment(denominator2))

                // skip if there a remainder of both side is 0
                if (
                    BigDecimal.unsafeRemainder(
                            BigDecimal.fromBigInt(numerator1),
                            BigDecimal.fromBigInt(denominator1)
                        ).value === 0n ||
                    BigDecimal.unsafeRemainder(
                            BigDecimal.fromBigInt(numerator2),
                            BigDecimal.fromBigInt(denominator2)
                        ).value === 0n
                ) yield* new SkipGenerateException()

                const num1 = new Fraction(
                    numerator1,
                    denominator1
                )
                const num2 = new Fraction(
                    numerator2,
                    denominator2
                )

                const lcm = BigInt.lcm(denominator1, denominator2)

                const ans = new Fraction(
                    lcm * num1.numerator + lcm * num2.numerator,
                    lcm
                )

                return new AdditionContext({
                    num1,
                    num2,
                    ans
                })
            })),
        Match.orElse(() =>
            Effect.gen(function*() {
                const denominator = yield* randomBigIntRange(2, 10)
                const numerator1 = yield* randomBigIntRange(2, 10)
                const numerator2 = yield* randomBigIntRange(2, 10)

                // skip if there a remainder of both side is 0
                if (
                    BigDecimal.unsafeRemainder(
                            BigDecimal.fromBigInt(numerator1),
                            BigDecimal.fromBigInt(denominator)
                        ).value === 0n ||
                    BigDecimal.unsafeRemainder(
                            BigDecimal.fromBigInt(numerator2),
                            BigDecimal.fromBigInt(denominator)
                        ).value === 0n
                ) yield* new SkipGenerateException()

                const num1 = new Fraction(
                    numerator1,
                    denominator
                )
                const num2 = new Fraction(
                    numerator2,
                    denominator
                )

                const ans = new Fraction(
                    num1.numerator + num2.numerator,
                    denominator
                )

                return new AdditionContext({
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
            question += `${i + 1}. ${num1.display} + ${num2.display} = \n`
            answer += `${i + 1}. ${num1.display} + ${num2.display} = ${ans.display}\n`
            i++
        })

        return { question, answer }
    })

export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "add",
        title: "Addition",
        description: "Add fractions with different levels",
        levelDescription: {
            1: "Add fractions with the same denominator (e.g., 1/4 + 2/4)",
            2: "Add fractions with different denominators (e.g., 2/5 + 1/3)",
            3: "Add fractions with mixed numbers (e.g., 1 1/2 + 2 2/3)",
            4: "Add improper fractions requiring simplification (e.g., 9/4 + 11/6)"
            // 5: "Add fractions in real-world contexts (e.g., total distance traveled: 1/2 mile + 3/8 mile)"
        },
        availableLevels: 4,
        generate
    })
)
