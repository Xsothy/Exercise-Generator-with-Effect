import type { Random } from "effect"
import { Context, Effect, Equal, Hash, HashSet } from "effect"

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

export function generateContexts<T extends ExerciseContext>(
    context: Effect.Effect<
        T,
        never,
        Random.Random
    >,
    qty: number
): Effect.Effect<
    HashSet.HashSet<T>,
    never,
    Random.Random
> {
    let oldSize = -1
    const contexts: HashSet.HashSet<T> = HashSet.beginMutation(HashSet.empty())
    const duplicationContexts: HashSet.HashSet<T> = HashSet.beginMutation(HashSet.empty())

    return Effect.gen(function*() {
        yield* Effect.whileLoop<
            T | null,
            never,
            Random.Random
        >(
            {
                step: (state) => {
                    if (!state) {
                        qty = HashSet.size(contexts)
                        return contexts
                    }

                    oldSize = HashSet.size(contexts)
                    return HashSet.add(contexts, state)
                },
                while: () => HashSet.size(contexts) < qty,
                body: () =>
                    context.pipe(
                        Effect.flatMap((ctx) => {
                            if (oldSize !== HashSet.size(contexts)) {
                                // Delete all
                                HashSet.filter(contexts, () => false)
                                console.log("Generating " + HashSet.size(contexts))
                                return Effect.succeed(ctx)
                            }
                            if (HashSet.size(contexts) !== HashSet.size(duplicationContexts)) {
                                HashSet.add(duplicationContexts, ctx)
                                return Effect.succeed(ctx)
                            }
                            console.log("Out of Exercise")
                            return Effect.succeed(null)
                        })
                    )
            }
        )

        return contexts
    })
}
