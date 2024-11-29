import { Prompt } from "@effect/cli"
import type { Terminal } from "@effect/platform"
import type { Random } from "effect"
import { Context, Effect, Equal, Hash, HashSet } from "effect"

export class Exercise extends Context.Tag("Exercise")<
    Exercise,
    {
        key: string
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
            const generated = yield* context

            if (!HashSet.has(contexts, generated)) {
                console.log(HashSet.size(contexts))
                HashSet.add(contexts, generated)

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
