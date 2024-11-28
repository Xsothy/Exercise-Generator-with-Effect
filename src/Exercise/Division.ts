import type { Context, Random } from "effect"
import { Effect, HashSet, Layer, Match } from "effect"
import { Exercise } from "src/Exercise/index.js"
import { randomRange } from "../utils.js"

class DivisionContext extends Exercise.ExerciseContext {
    constructor(
        readonly num1: number,
        readonly num2: number,
        readonly ans: string
    ) {
        super(num1, num2)
    }

    static make({ ans, num1, num2 }: { num1: number; num2: number; ans: string }) {
        return new DivisionContext(num1, num2, ans)
    }
}

const matchContext: (level: number) => Effect.Effect<
    DivisionContext,
    never,
    Random.Random
> = (level) =>
    Match.value<number>(level).pipe(
        // Level 5: Division with decimals in the result (e.g., 47 ÷ 8 = 5.875).
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
        // Level 4: Division of 5-digit numbers by 2-digit numbers but from multiple of 1-digit number
        // (e.g., 86,352 ÷ 56) from 8 * 7 = 56
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
        // Level 3: Long division of 3-digit numbers by 1-digit numbers (e.g., 345 ÷ 7).
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
        // Level 2: Division of 2-digit numbers with a remainder (e.g., 29 ÷ 5 = 5 R4).
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
        // Level 1: Simple division with no remainders, using small numbers (e.g., 24 ÷ 6 = 4).
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

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (qty: number, level: number) =>
    Effect.gen(function*() {
        const contexts = yield* Exercise.generateContexts(matchContext(level), qty)

        let question = ""
        let answer = ""
        let i = 0
        HashSet.forEach(contexts, (ctx) => {
            const { ans, num1, num2 } = ctx
            question += `${i + 1}. ${num1} / ${num2} = \n`
            answer += `${i + 1}. ${num1} / ${num2} = ${ans}\n`
            i++
        })

        return { question, answer }
    })

export const layer: Layer.Layer<Exercise.Exercise, never, never> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "divide",
        availableLevels: 5,
        generate
    })
)
