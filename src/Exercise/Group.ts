import type { Layer } from "effect"
import type { Exercise } from "src/Exercise/index.js"
import { Arithmetic, Fraction } from "./index.js"

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
        description: "Add, Subtract, Multiply and Divide",
        children: [
            Arithmetic.Multiplication.layer,
            Arithmetic.Division.layer
        ]
    },
    {
        key: "fraction",
        title: "Fraction",
        description: "Ex: 1/2, 5/10",
        children: [
            {
                key: "arithmetic-fraction",
                title: "Arithmetic with Fractions",
                description: "Add, subtract, multiply, and divide fractions",
                children: [
                    Fraction.Arithmetic.Addition.layer,
                    Fraction.Arithmetic.Subtraction.layer,
                    Fraction.Arithmetic.Multiplication.layer,
                    Fraction.Arithmetic.Division.layer
                ]
            },
            Fraction.Simplifying.layer,
            {
                key: "converting-fraction",
                title: "Converting Fractions",
                description: "Convert between improper fractions and mixed numbers",
                children: [
                    Fraction.Converting.ImproperToMixed.layer,
                    Fraction.Converting.MixedToImproper.layer
                ]
            },
            Fraction.Comparing.layer
        ]
    }
]
