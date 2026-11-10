import type { Generator } from "./Generator.js"

export interface Level {
    readonly description: string
    readonly generate: Generator
}

export interface Topic {
    /** Stable identifier, used in worksheet links. */
    readonly id: string
    readonly group: string
    readonly title: string
    /** Shows students how an answer should be typed. */
    readonly answerHint: string
    readonly levels: ReadonlyArray<Level>
}
