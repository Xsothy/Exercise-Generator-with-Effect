import type { Random } from "effect"
import { Effect, Equal, Hash, HashSet, Layer, Match } from "effect"
import { Exercise } from "src/Exercise/index.js"
import { randomRange } from "src/utils.js"

class DivisionContext extends Exercise.ExerciseContext<{ num1: number; num2: number; ans: string }> {
    static make({ ans, num1, num2 }: { num1: number; num2: number; ans: string }) {
        return new DivisionContext({ num1, num2, ans })
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
        return Hash.hash(parseInt(`${this.ctx.num1}${this.ctx.num2}`))
    }
}

const matchContext: (level: number) => Effect.Effect<
    DivisionContext,
    never,
    Random.Random
> = (level) =>
    Match.value<number>(level).pipe(
        Match.when((level) => level === 5, () =>
            Effect.gen(function*() {
                const generateNum = yield* Effect.iterate(
                    {
                        num1: yield* randomRange(1000, 10000),
                        num2: yield* randomRange(2, 10)
                    },
                    {
                        while: ({ num1, num2 }) => (
                            Math.ceil(num1 / num2) === num1 / num2
                            || Math.ceil(num1 / num2 * 1000) !== num1 / num2 * 1000
                        ),
                        body: () =>
                            Effect.gen(function*() {
                                return {
                                    num1: yield* randomRange(100, 1000),
                                    num2: yield* randomRange(2, 10)
                                }
                            })
                    }
                )
                return DivisionContext.make({
                    num1: generateNum.num1,
                    num2: generateNum.num2,
                    ans: (generateNum.num1 / generateNum.num2).toString()
                })
            })),
        Match.when((level) => level === 4, () =>
            Effect.gen(function*() {
                const num1 = yield* randomRange(100, 1000)
                const num2 = yield* Effect.iterate(
                    0,
                    {
                        while: (state) => state < 10,
                        body: () =>
                            Effect.gen(function*() {
                                return (yield* randomRange(2, 10)) * (yield* randomRange(2, 10))
                            })
                    }
                )
                return DivisionContext.make({
                    num1: num1 * num2,
                    num2,
                    ans: num1.toString()
                })
            })),
        Match.when((level) => level === 3, () =>
            Effect.gen(function*() {
                const num1 = yield* randomRange(100, 1000)
                const num2 = yield* randomRange(2, 10)
                const answer = Math.ceil(num1 / num2)
                const remainder = num1 % num2
                return DivisionContext.make({
                    num1,
                    num2,
                    ans: `${answer} R${remainder}`
                })
            })),
        Match.when((level) => level === 2, () =>
            Effect.gen(function*() {
                const num1 = yield* randomRange(10, 100)
                const num2 = yield* randomRange(2, 10)
                const answer = Math.ceil(num1 / num2)
                const remainder = num1 % num2
                return DivisionContext.make({
                    num1,
                    num2,
                    ans: `${answer} R${remainder}`
                })
            })),
        Match.orElse(() =>
            Effect.gen(function*() {
                const num1 = yield* randomRange(2, 10)
                const num2 = yield* randomRange(2, 10)
                return DivisionContext.make({
                    num1: num1 * num2,
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
                    question += `${i + 1}. ${num1} / ${num2} = \n`
                    answer += `${i + 1}. ${num1} / ${num2} = ${ans}\n`
                    i++
                })

                return { question, answer, contexts }
            })
    })
)
