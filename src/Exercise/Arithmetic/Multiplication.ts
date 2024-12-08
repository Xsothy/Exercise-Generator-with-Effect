import type { Context, Random } from "effect"
import { BigDecimal, Effect, Equal, Hash, HashSet, Layer, Match } from "effect"
import { Exercise } from "src/Exercise/index.js"
import { randomRange } from "src/utils.js"

class MultiplicationContext extends Exercise.ExerciseContext<{
    num1: BigDecimal.BigDecimal
    num2: BigDecimal.BigDecimal
}> {
    constructor(num1: number, num2: number) {
        super({
            num1: BigDecimal.unsafeFromNumber(num1),
            num2: BigDecimal.unsafeFromNumber(num2)
        })
    }
    [Equal.symbol](that: Equal.Equal): boolean {
        if (that instanceof MultiplicationContext) {
            return (
                Equal.equals(this.ctx.num1, that.ctx.num1) &&
                Equal.equals(this.ctx.num2, that.ctx.num2)
            )
        }
        return false
    }
    [Hash.symbol](): number {
        return Hash.hash(this.ctx)
    }
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
                    (yield* randomRange(1000, 10000)) / 100,
                    (yield* randomRange(1000, 10000)) / 100
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
            const { num1, num2 } = ctx.ctx
            question += `${i + 1}. ${BigDecimal.format(num1)} * ${BigDecimal.format(num2)} = \n`
            answer += `${i + 1}. ${BigDecimal.format(num1)} * ${BigDecimal.format(num2)} = ${
                BigDecimal.format(BigDecimal.multiply(num1, num2))
            }\n`
            i++
        })

        return { question, answer }
    })

export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "multiply",
        title: "Multiplication",
        description: "Description of Multiplication",
        levelDescription: {
            3: "Multiply a 4-digit number by a 3-digit number (e.g., 1234 x 567)",
            4: "Multiply a 5-digit number by a 5-digit number (e.g., 12345 x 67890)",
            5: "Multiply two numbers with decimals, e.g., 12.34 x 5.67 \n This introduces a max of precision and placement of decimal points."
        },
        availableLevels: 5,
        generate
    })
)
