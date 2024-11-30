import { type Context, Layer } from "effect"
import { Exercise } from "src/Exercise/index.js"

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (level) => {
}
export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "improper-to-mixed",
        title: "Converting Improper Fractions to Mixed Numbers",
        levelDescription: {
            1: "Simple conversions where the numerator is just a little larger than the denominator (e.g., 7/4 to 1 3/4)",
            2: "Conversions with larger numerators (e.g., 22/7 to 3 1/7)",
            3: "Conversions where the numerator is significantly larger than the denominator (e.g., 58/9 to 6 4/9)",
            4: "Mixed conversions involving simplifying after conversion (e.g., 125/25 to 5)",
            5: "Mixed conversions requiring both simplification and handling prime denominators (e.g., 77/13 to 5 12/13)"
        },
        availableLevels: 5,
        generate
    })
)
