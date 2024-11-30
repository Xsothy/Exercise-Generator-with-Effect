import { type Context, Layer } from "effect"
import { Exercise } from "src/Exercise/index.js"

const generate: Context.Tag.Service<Exercise.Exercise>["generate"] = (level) => {
}
export const layer: Layer.Layer<Exercise.Exercise> = Layer.succeed(
    Exercise.Exercise,
    Exercise.Exercise.of({
        key: "compare",
        title: "Comparing Fractions",
        levelDescription: {
            1: "Compare fractions with the same denominator (e.g., 3/8 vs 5/8)",
            2: "Compare fractions with different denominators (e.g., 2/5 vs 3/8)",
            3: "Compare improper fractions (e.g., 7/4 vs 9/5)",
            4: "Compare fractions and mixed numbers (e.g., 5/6 vs 1 1/3)",
            5: "Compare fractions in real-world scenarios (e.g., which slice of pizza is larger: 3/8 or 2/5?)"
        },
        availableLevels: 5,
        generate
    })
)
