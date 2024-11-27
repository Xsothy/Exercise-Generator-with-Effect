import { Prompt } from "@effect/cli"
import type { FileSystem } from "@effect/platform"
import { Terminal } from "@effect/platform"
import { NodeFileSystem, NodeRuntime, NodeTerminal } from "@effect/platform-node"
import type { PlatformError } from "@effect/platform/Error"
import type { Layer } from "effect"
import { Data, Effect, pipe, Random } from "effect"
import { Divide, Exercise, Multiply } from "src/Exercise/index.js"
import { writeExerciseFiles } from "./writeFile.js"

const EXERCISES: Array<Layer.Layer<Exercise.Exercise>> = [Multiply.layer, Divide.layer]

type ExerciseError = Terminal.QuitException | PlatformError

class UnavailableLevelException extends Data.TaggedError("UnavailableLevelException") {
}

const chooseLevel: Effect.Effect<
    number,
    Terminal.QuitException | UnavailableLevelException,
    Exercise.Exercise | Terminal.Terminal
> = Exercise.Exercise.pipe(
    Effect.andThen((exercise) => {
        if (exercise.availableLevels <= 1) {
            return Effect.fail(new UnavailableLevelException())
        }
        return Effect.succeed(exercise)
    }),
    Effect.flatMap((exercise) =>
        Effect.loop(
            0,
            {
                while: (i) => i < exercise.availableLevels,
                step: (i) => i + 1,
                body: (i) =>
                    Effect.succeed({
                        title: `Level ${i + 1}`,
                        value: i + 1
                    })
            }
        )
    ),
    Effect.flatMap((choices) => {
        console.log(choices)
        return Prompt.select<number>({
            message: "What level you want to creates?",
            choices
        })
    })
)

const processExercises = (qty: number, level: number): Effect.Effect<
    void,
    ExerciseError,
    Exercise.Exercise | Terminal.Terminal | FileSystem.FileSystem
> => Effect.gen(function*() {
    const terminal = yield* Terminal.Terminal
    const exercise = yield* Exercise.Exercise
    const random = Random.make("RandomExercise")

    const generatedExercise = exercise.generate(qty, level).pipe(
        Effect.provideService(Random.Random, random),
        Effect.runSync
    )
    yield* Effect.map(writeExerciseFiles, (_) => _(generatedExercise))
    yield* terminal.display("Exercise files generated successfully!")
})

const program = pipe(
    EXERCISES.map(
        (exercise) => {
            return Effect.provide(Exercise.Exercise, exercise).pipe(
                Effect.map((ctx) => ({
                    title: ctx.key,
                    value: ctx.key
                })),
                Effect.runSync
            )
        }
    ),
    (exerciseTypes) =>
        Prompt.select<string>({
            message: "What exercise do you want?",
            choices: exerciseTypes
        }),
    Effect.map((selected) =>
        EXERCISES.find((exercise) =>
            Effect.provide(Exercise.Exercise, exercise).pipe(
                Effect.map((val) => val.key === selected),
                Effect.runSync
            )
        ) as Layer.Layer<Exercise.Exercise>
    ),
    Effect.flatMap((selectedExercise) =>
        Effect.gen(function*() {
            const level = yield* chooseLevel
            const quantity = yield* Prompt.integer({
                message: "How much you want to generate?"
            })
            yield* processExercises(quantity, level)
        }).pipe(
            Effect.provide(selectedExercise)
        )
    )
)

// Run program
program.pipe(
    Effect.provide(NodeTerminal.layer),
    Effect.provide(NodeFileSystem.layer),
    NodeRuntime.runMain
)
