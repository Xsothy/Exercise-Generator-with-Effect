import type { Context } from "effect"
import { Layer } from "effect"
import { Exercise } from "src/Exercise/index.js"

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (level) => {
}
export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "simplify",
        title: "Simplifying",
        description: "Reduce fractions to their simplest form",
        levelDescription: {
            1: "Simplify fractions with small numerators and denominators (e.g., 4/6 to 2/3)",
            2: "Simplify fractions with larger numbers (e.g., 20/60 to 1/3)",
            3: "Simplify improper fractions to simplest form (e.g., 45/30 to 3/2)",
            4: "Simplify fractions with common factors across numerators and denominators (e.g., 96/144 to 2/3)",
            5: "Simplify fractions involving large prime numbers (e.g., 77/143)"
        },
        availableLevels: 5,
        generate
    })
)
