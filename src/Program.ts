import type { FileSystem, Terminal } from "@effect/platform"
import { NodeFileSystem, NodeRuntime, NodeTerminal } from "@effect/platform-node"
import type { PlatformError } from "@effect/platform/Error"
import type { Layer } from "effect"
import { Effect, Random } from "effect"
import { Divide, Exercise, Multiply } from "src/Exercise/index.js"
import type { InvalidConsoleError } from "./Console.js"
import { Console, ConsoleLive } from "./Console.js"
import { writeExerciseFiles } from "./writeFile.js"

const EXERCISES: Array<Layer.Layer<Exercise.Exercise>> = [Multiply.layer, Divide.layer]

type ExerciseError = Terminal.QuitException | PlatformError | InvalidConsoleError

const promptGenerate: Effect.Effect<
    number,
    ExerciseError,
    Console
> = Effect.gen(function*() {
    const console = yield* Console
    yield* console.display("How many exercises would you like to generate?")
    const input = yield* console.ask("Quantity: ")
    const value = parseInt(input)

    if (isNaN(value)) {
        yield* console.display("Please enter a valid integer")
        return yield* promptGenerate
    }

    return value
})

const chooseLevel: Effect.Effect<
    number,
    ExerciseError,
    Exercise.Exercise | Console
> = Effect.gen(function*() {
    const console = yield* Console
    const exercise = yield* Exercise.Exercise
    if (exercise.availableLevels <= 1) return 1

    const levelChoices: Array<string> = []
    for (let i = 0; i < exercise.availableLevels; i++) {
        levelChoices.push(`Level ${i + 1}`)
    }

    return yield* console.choice(
        "Please choose the level: ",
        levelChoices
    ).pipe(
        Effect.map((choice) => {
            return levelChoices.findIndex((i) => i === choice) + 1
        })
    )
})

const processExercises = (qty: number, level: number): Effect.Effect<
    void,
    ExerciseError,
    Exercise.Exercise | Terminal.Terminal | FileSystem.FileSystem | Console
> => Effect.gen(function*() {
    const console = yield* Console
    const exercise = yield* Exercise.Exercise
    const random = Random.make("RandomExercise")

    const generatedExercise = exercise.generate(qty, level).pipe(
        Effect.provideService(Random.Random, random),
        Effect.runSync
    )
    yield* Effect.map(writeExerciseFiles, (_) => _(generatedExercise))
    yield* console.display("Exercise files generated successfully!")
})

const getExerciseChoice = Effect.gen(function*() {
    const exercise = yield* Exercise.Exercise
    return exercise.key
})

const program = Effect.gen(function*() {
    const console = yield* Console
    // Get available exercise types
    const exerciseTypes = EXERCISES.map((exercise) =>
        getExerciseChoice.pipe(
            Effect.provide(exercise),
            Effect.runSync
        )
    )

    // Let user choose exercise type
    const selectedExercise = yield* console.choice(
        "Select an exercise type: ",
        exerciseTypes,
        0
    ).pipe(
        Effect.map((selected) =>
            EXERCISES.find((exercise) =>
                getExerciseChoice.pipe(
                    Effect.provide(exercise),
                    Effect.map((val) => val === selected),
                    Effect.runSync
                )
            ) as Layer.Layer<Exercise.Exercise>
        )
    )

    yield* Effect.gen(function*() {
        const level = yield* chooseLevel
        const quantity = yield* promptGenerate
        yield* processExercises(quantity, level)
    }).pipe(
        Effect.provide(selectedExercise)
    )
})

// Run program
program.pipe(
    Effect.provide(ConsoleLive),
    Effect.provide(NodeTerminal.layer),
    Effect.provide(NodeFileSystem.layer),
    NodeRuntime.runMain
)
