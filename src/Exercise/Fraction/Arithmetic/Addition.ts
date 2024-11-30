import type { Context, Random } from "effect"
import { Effect, HashSet, Layer, Match } from "effect"
import { Exercise } from "src/Exercise/index.js"
import { randomRange } from "src/utils.js"

class MultiplicationContext extends Exercise.ExerciseContext {
}

const matchContext: (level: number) => Effect.Effect<
    MultiplicationContext,
    never,
    Random.Random
> = (level) =>
    Match.value<number>(level).pipe(
        Match.when((level) => level === 5, () =>
            Effect.gen(function*() {
                return new MultiplicationContext(
                    (yield* randomRange(10000, 100000)) / 100,
                    (yield* randomRange(10000, 100000)) / 100
                )
            })),
        Match.when((level) => level === 4, () =>
            Effect.gen(function*() {
                return new MultiplicationContext(
                    yield* randomRange(10000, 100000),
                    yield* randomRange(10000, 100000)
                )
            })),
        Match.when((level) => level === 3, () =>
            Effect.gen(function*() {
                return new MultiplicationContext(
                    yield* randomRange(1000, 10000),
                    yield* randomRange(1000, 10000)
                )
            })),
        Match.when((level) => level === 2, () =>
            Effect.gen(function*() {
                return new MultiplicationContext(
                    yield* randomRange(10, 100),
                    yield* randomRange(10, 100)
                )
            })),
        Match.orElse(() =>
            Effect.gen(function*() {
                return new MultiplicationContext(
                    yield* randomRange(10, 100),
                    yield* randomRange(2, 10)
                )
            })
        )
    )

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (level: number) =>
    Effect.gen(function*() {
        const contexts = yield* Exercise.generateContexts(matchContext(level))
        let question = ""
        let answer = ""
        let i = 0
        HashSet.forEach(contexts, (ctx) => {
            const { num1, num2 } = ctx
            question += `${i + 1}. ${num1} * ${num2} = \n`
            answer += `${i + 1}. ${num1} * ${num2} = ${(num1 * num2).toLocaleString()}\n`
            i++
        })

        return { question, answer }
    })

export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "add",
        title: "Addition",
        levelDescription: {
            1: "Add fractions with the same denominator (e.g., 1/4 + 2/4)",
            2: "Add fractions with different denominators (e.g., 2/5 + 1/3)",
            3: "Add fractions with mixed numbers (e.g., 1 1/2 + 2 2/3)",
            4: "Add improper fractions requiring simplification (e.g., 9/4 + 11/6)",
            5: "Add fractions in real-world contexts (e.g., total distance traveled: 1/2 mile + 3/8 mile)"
        },
        availableLevels: 5,
        generate
    })
)
