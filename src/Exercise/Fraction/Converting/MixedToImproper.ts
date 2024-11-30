import { type Context, Layer } from "effect"
import { Exercise } from "src/Exercise/index.js"

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (level) => {
}
export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "mixed-to-improper",
        title: "Converting Mixed Numbers to Improper Fractions",
        levelDescription: {
            1: "Simple whole numbers and small fractional parts (e.g., 3 1/2 to 7/2)",
            2: "Mixed numbers with larger fractions (e.g., 8 5/6 to 53/6)",
            3: "Conversions involving simplifications after conversion (e.g., 6 4/8 to 13/2)",
            4: "Conversions involving prime denominators (e.g., 9 7/13 to 124/13)",
            5: "Conversions where both numerator and denominator need significant scaling (e.g., 15 3/16 to 243/16)"
        },
        availableLevels: 5,
        generate
    })
)
