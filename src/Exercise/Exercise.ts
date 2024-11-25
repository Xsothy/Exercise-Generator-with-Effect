import type { Random } from "effect"
import { Context, Data, Effect, Equal, Hash } from "effect"

class OutOfExerciseException extends Data.TaggedError("OutOfExerciseException") {}

export class Exercise extends Context.Tag("Exercise")<
    Exercise,
    {
        key: string
        availableLevels: number
        generate: (qty: number, level: number) => Effect.Effect<
            {
                question: string
                answer: string
            },
            never,
            Random.Random
        >
    }
>() {
}

export abstract class ExerciseContext implements Equal.Equal {
    constructor(
        readonly num1: number,
        readonly num2: number
    ) {
    }

    [Equal.symbol](that: Equal.Equal): boolean {
        if (that instanceof ExerciseContext) {
            return (
                Equal.equals(this.num1, that.num1) &&
                Equal.equals(this.num2, that.num2)
            )
        }
        return false
    }

    [Hash.symbol](): number {
        return Hash.hash(parseInt(`${this.num1}${this.num2}`))
    }
}

export function generateContext<T extends ExerciseContext>(
    contexts: Array<ExerciseContext>,
    context: Effect.Effect<
        T,
        never,
        Random.Random
    >
) {
    let duplicationContexts: Array<T> = []

    return Effect.gen(function*() {
        return yield* Effect.iterate(
            yield* context,
            {
                while: (ctx) => {
                    const duplicate = contexts.some(
                        (context) => Equal.equals(ctx, context)
                    )

                    const existInDuplicateContext = duplicationContexts.some((context) => Equal.equals(ctx, context))

                    if (!existInDuplicateContext) {
                        duplicationContexts.push(ctx)
                    }

                    if (!duplicate) {
                        duplicationContexts = []
                    }

                    return duplicate
                },
                body: () =>
                    Effect.gen(function*() {
                        if (duplicationContexts.length === contexts.length) {
                            console.log("Run Out Of Exercise")
                            return yield* new OutOfExerciseException()
                        }
                        return yield* context
                    })
            }
        )
    })
}

export function generateContexts<T extends ExerciseContext>(
    context: Effect.Effect<
        T,
        never,
        Random.Random
    >,
    qty: number
): Effect.Effect<
    Array<T>,
    never,
    Random.Random
> {
    const contexts: Array<T> = []
    return Effect.gen(function*() {
        yield* Effect.whileLoop<
            T | null,
            never,
            Random.Random
        >(
            {
                step: (state) => {
                    if (!state) {
                        qty = contexts.length
                        return contexts
                    }

                    console.log("Generating " + contexts.length)
                    return contexts.push(state)
                },
                while: () => contexts.length < qty,
                body: () =>
                    Effect.gen(function*() {
                        return yield* generateContext<T>(contexts, context)
                    }).pipe(
                        Effect.catchTag("OutOfExerciseException", () => Effect.succeed(null))
                    )
            }
        )

        return contexts
    })
}
