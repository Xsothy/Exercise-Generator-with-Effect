import { Prompt } from "@effect/cli"
import type { Terminal } from "@effect/platform"
import type { Random } from "effect"
import { Context, Effect, Equal, Hash, HashSet } from "effect"
import type SkipGenerateException from "src/Exception/SkipGenerateException.js"

export class Exercise extends Context.Tag("Exercise")<
    Exercise,
    {
        key: string
        title?: string
        description?: string
        availableLevels: null
        generate: () => Effect.Effect<
            {
                question: string
                answer: string
            },
            never,
            Random.Random | Terminal.Terminal
        >
    } | {
        key: string
        title?: string
        description?: string
        levelDescription?: Record<number, string>
        availableLevels: number
        generate: (level: number) => Effect.Effect<
            {
                question: string
                answer: string
            },
            never,
            Random.Random | Terminal.Terminal
        >
    }
>() {
}

export abstract class ExerciseContext<T = any> implements Equal.Equal {
    constructor(
        readonly ctx: T
    ) {
    }

    abstract [Equal.symbol](that: Equal.Equal): boolean

    abstract [Hash.symbol](): number
}

export function generateContexts<T extends ExerciseContext = any>(
    context: Effect.Effect<
        T,
        SkipGenerateException,
        Random.Random
    >
): Effect.Effect<
    HashSet.HashSet<T>,
    never,
    Random.Random | Terminal.Terminal
> {
    return Effect.gen(function*() {
        const contexts: HashSet.HashSet<T> = HashSet.beginMutation(HashSet.empty())
        const duplicationContexts: HashSet.HashSet<T> = HashSet.beginMutation(HashSet.empty())

        const qty = yield* Prompt.integer({
            message: "How much you want to generate?"
        }).pipe(
            Effect.catchTag("QuitException", () => Effect.succeed(0)) // Quit if user cancels
        )

        if (qty === 0) {
            return contexts // No exercises needed
        }

        while (HashSet.size(contexts) < qty) {
            const generated = yield* context.pipe(
                Effect.catchTag("SkipGenerateException", () => Effect.succeed(null))
            )

            if (!generated) continue

            if (!HashSet.has(contexts, generated)) {
                console.log(HashSet.size(contexts) + 1)
                HashSet.add(contexts, generated)
                console.log("Done " + HashSet.size(contexts))

                HashSet.filter(duplicationContexts, () => false)
            } else if (!HashSet.has(duplicationContexts, generated)) {
                HashSet.add(duplicationContexts, generated)

                if (HashSet.size(duplicationContexts) === HashSet.size(contexts)) {
                    console.log("No more unique exercises can be generated.")
                    break
                }
            }
        }

        return contexts
    })
}
