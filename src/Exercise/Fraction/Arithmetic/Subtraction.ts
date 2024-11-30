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
        key: "subtract",
        title: "Subtraction",
        levelDescription: {
            1: "Subtract fractions with the same denominator (e.g., 3/4 - 1/4)",
            2: "Subtract fractions with different denominators (e.g., 7/10 - 2/5)",
            3: "Subtract mixed numbers (e.g., 3 1/2 - 2 2/3)",
            4: "Subtract improper fractions requiring simplification (e.g., 13/8 - 7/4)",
            5: "Subtract fractions in real-world scenarios (e.g., remaining pizza: 3/4 - 1/3)"
        },
        availableLevels: 5,
        generate
    })
)
