import { Terminal } from "@effect/platform"
import type { PlatformError } from "@effect/platform/Error"
import { Context, Effect, Layer } from "effect"

export class InvalidConsoleError {
    readonly _tag = "InvalidConsoleError"
}

export class Console extends Context.Tag("Console")<
    Console,
    {
        display: (text: string) => Effect.Effect<void, PlatformError, never>
        ask: (
            question: string,
            defaultValue?: string
        ) => Effect.Effect<string, PlatformError | Terminal.QuitException, never>
        choice: (
            question: string,
            choices: Array<string>,
            defaultIndex?: number,
            maxAttempts?: number
        ) => Effect.Effect<string, InvalidConsoleError | Terminal.QuitException>
    }
>() {
}

export const ConsoleLive: Layer.Layer<Console, never, Terminal.Terminal> = Layer.effect(
    Console,
    Effect.gen(function*() {
        const terminal = yield* Terminal.Terminal

        const display = (text: string) => terminal.display(`${text}\n`)

        const ask = (question: string, defaultValue?: string) =>
            Effect.gen(function*() {
                yield* terminal.display(question)
                const input = yield* terminal.readLine
                return input === "" && defaultValue ? defaultValue : input
            })

        return {
            display,
            ask,
            choice: (
                question,
                choices,
                defaultIndex,
                maxAttempts = 3
            ) => Effect.gen(function*() {
                while (maxAttempts > 0) {
                    yield* display(question)
                    for (let i = 0; i < choices.length; i++) {
                        yield* display(`${i + 1}. ${choices[i]}`)
                    }
                    yield* terminal.display("> ")
                    const input = yield* terminal.readLine

                    if (input === "" && defaultIndex !== undefined) {
                        return choices[defaultIndex]
                    }

                    const index = parseInt(input)
                    if (!isNaN(index) && index >= 1 && index <= choices.length) {
                        return choices[index - 1]
                    }

                    maxAttempts--
                }

                return yield* Effect.fail(new InvalidConsoleError())
            })
        } as Context.Tag.Service<Console>
    })
)
