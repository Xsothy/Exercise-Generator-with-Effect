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
        // Level 5: Multiply two numbers with decimals, e.g., 12.34 x 5.67.
        // This introduces a mix of precision and placement of decimal points.
        Match.when((level) => level === 5, () =>
            Effect.gen(function*() {
                return new MultiplicationContext(
                    (yield* randomRange(10000, 100000)) / 100,
                    (yield* randomRange(10000, 100000)) / 100
                )
            })),
        // Level 4: Multiply a 5-digit number by a 5-digit number (e.g., 12345 x 67890).
        Match.when((level) => level === 4, () =>
            Effect.gen(function*() {
                return new MultiplicationContext(
                    yield* randomRange(10000, 100000),
                    yield* randomRange(10000, 100000)
                )
            })),
        // Level 3: Multiply a 4-digit number by a 3-digit number (e.g., 1234 x 567).
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

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (qty: number, level: number) =>
    Effect.gen(function*() {
        const contexts = yield* Exercise.generateContexts(matchContext(level), qty)
        let question = ""
        let answer = ""
        let i = 0
        HashSet.forEach(contexts, (ctx) => {
            const { num1, num2 } = ctx
            question += `${i + 1}. ${num1} * ${num2} = \n`
            answer += `${i + 1}. ${num1} * ${num2} = ${num1 * num2}\n`
            i++
        })

        return { question, answer }
    })

export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "multiply",
        availableLevels: 5,
        generate
    })
)
