import type { Layer } from "effect"
import * as Division from "src/Exercise/Arithmetic/Division.js"
import * as Multiplication from "src/Exercise/Arithmetic/Multiplication.js"
import type { Exercise } from "src/Exercise/index.js"

export interface Group {
    key: string
    title?: string
    description?: string
    children: Array<Group | Layer.Layer<Exercise.Exercise>>
}

export const exercises: Group["children"] = [
    {
        key: "arithmetic",
        title: "Arithmetic",
        children: [
            Multiplication.layer,
            Division.layer
        ]
    }
]
