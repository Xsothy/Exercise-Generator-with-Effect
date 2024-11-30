import type { Random } from "effect"
import { Effect, HashSet, Layer, Match } from "effect"
import { Exercise } from "src/Exercise/index.js"
import { randomRange } from "src/utils.js"

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

const generate = (level: number) =>
    Effect.gen(function*() {
        const contexts = yield* Exercise.generateContexts(matchContext(level))

        let question = ""
        let answer = ""
        let i = 0
        HashSet.forEach(contexts, (ctx) => {
            const { ans, num1, num2 } = ctx
            question += `${i + 1}. ${num1} / ${num2} = \n`
            answer += `${i + 1}. ${num1} / ${num2} = ${ans}\n`
            i++
        })

        return { question, answer, contexts }
    })

export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "divide",
        title: "Division",
        levelDescription: {
            1: "Divide fractions with small numbers (e.g., 3/4 ÷ 2/5)",
            2: "Divide fractions and whole numbers (e.g., 2 ÷ 3/5)",
            3: "Divide mixed numbers (e.g., 3 1/2 ÷ 2 2/3)",
            4: "Divide improper fractions (e.g., 9/4 ÷ 7/6)",
            5: "Real-world scenarios: sharing portions (e.g., if 2/5 of a cake is shared equally among 3 people, how much does each person get?)"
        },
        availableLevels: 5,
        generate
    })
)
