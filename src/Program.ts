import { Prompt } from "@effect/cli"
import type { FileSystem, Terminal } from "@effect/platform"
import { NodeFileSystem, NodeRuntime, NodeTerminal } from "@effect/platform-node"
import type { PlatformError } from "@effect/platform/Error"
import type { Layer } from "effect"
import { Data, Effect, pipe, Random } from "effect"
import { Divide, Exercise, Multiply } from "src/Exercise/index.js"
import { writeExerciseFiles } from "./writeFile.js"

const exercises: Array<Layer.Layer<Exercise.Exercise>> = [
    Multiply.layer,
    Divide.layer
]

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
        return Prompt.select<number>({
            message: "What level you want to creates?",
            choices
        })
    })
)

const processExercises = (level: number): Effect.Effect<
    void,
    ExerciseError,
    Exercise.Exercise | FileSystem.FileSystem | Terminal.Terminal
> => Exercise.Exercise.pipe(
    Effect.andThen((exercise) => exercise.generate(level)),
    Effect.provideService(Random.Random, Random.make("RandomExercise")),
    Effect.flatMap(
        (exercise) =>
            Effect.map(
                writeExerciseFiles,
                (_) => _(exercise)
            )
    ),
    Effect.tap(() => console.log("Exercise files generated successfully!"))
)

const program = pipe(
    exercises.map((exercise) =>
        Effect.provide(Exercise.Exercise, exercise).pipe(
            Effect.map((ctx) => ({
                title: ctx.key,
                value: exercise
            })),
            Effect.runSync
        )
    ),
    (exerciseTypes) =>
        Prompt.select({
            message: "What exercise do you want?",
            choices: exerciseTypes
        }),
    Effect.flatMap((selectedExercise) =>
        chooseLevel.pipe(
            Effect.flatMap(processExercises),
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
