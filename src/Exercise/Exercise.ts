import type { Random } from "effect"
import { Context, Effect, Equal, Hash } from "effect"

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
    return Effect.gen(function*() {
        return yield* Effect.iterate(
            yield* context,
            {
                while: (ctx) =>
                    contexts.some(
                        (context) => Equal.equals(ctx, context)
                    ),
                body: (ctx) => Effect.succeed(ctx)
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
            T,
            never,
            Random.Random
        >(
            {
                step: (state) => contexts.push(state),
                while: () => contexts.length < qty,
                body: () =>
                    Effect.gen(function*() {
                        return yield* generateContext<T>(contexts, context)
                    })
            }
        )

        return contexts
    })
}
