import { Prompt } from "@effect/cli"
import type { FileSystem, Terminal } from "@effect/platform"
import { NodeFileSystem, NodeRuntime, NodeTerminal } from "@effect/platform-node"
import type { PlatformError } from "@effect/platform/Error"
import type { QuitException } from "@effect/platform/Terminal"
import { Data, DateTime, Effect, Layer, Random } from "effect"
import { Exercise, Group } from "src/Exercise/index.js"
import { writeExerciseFiles } from "./writeFile.js"
import SelectChoice = Prompt.Prompt.SelectChoice

type ExerciseError = Terminal.QuitException | PlatformError

class UnavailableLevelException extends Data.TaggedError("UnavailableLevelException") {
}

const chooseLevel: Effect.Effect<
    number | "back",
    Terminal.QuitException | UnavailableLevelException,
    Terminal.Terminal | Exercise.Exercise
> = Exercise.Exercise.pipe(
    Effect.andThen((exercise) => {
        if (!exercise.availableLevels) {
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
                        value: i + 1,
                        ...(exercise.levelDescription && exercise.levelDescription[i + 1]
                            ? { description: exercise.levelDescription[i + 1] }
                            : {})
                    })
            }
        )
    ),
    Effect.map((choices) => [
        ...choices,
        {
            title: "Back",
            value: "back"
        } as SelectChoice<"back">
    ]),
    Effect.flatMap((choices) => {
        return Prompt.select<number | "back">({
            message: "What level you want to creates?",
            choices
        })
    })
)

const chooseExercises: (group: Group.Group["children"], parentGroup?: Group.Group["children"]) => Effect.Effect<
    {
        exercise: Layer.Layer<Exercise.Exercise>
        group: Group.Group["children"]
    },
    QuitException,
    Terminal.Terminal
> = (group, parentGroup) =>
    Effect.gen(function*() {
        const choices: (
            group: Group.Group["children"],
            parentGroup?: Group.Group["children"]
        ) => Array<SelectChoice<Group.Group | Layer.Layer<Exercise.Exercise> | "back">> = (group, parentGroup) => [
            ...group.map(
                (exercises) => {
                    if (!Layer.isLayer(exercises)) {
                        const { description, key, title } = exercises as Group.Group
                        return {
                            title: title ?? key,
                            value: exercises,
                            ...(description ? { description } : {})
                        }
                    }
                    return Exercise.Exercise.pipe(
                        Effect.provide(exercises as Layer.Layer<Exercise.Exercise>),
                        Effect.flatMap((exercise) => {
                            const { description, key, title } = exercise
                            return Effect.succeed({
                                title: title ?? key,
                                value: exercises as Layer.Layer<Exercise.Exercise>,
                                ...(description ? { description } : {})
                            })
                        }),
                        Effect.runSync
                    )
                }
            ),
            ...(parentGroup ?
                [
                    {
                        title: "Back",
                        value: "back"
                    } as SelectChoice<"back">
                ] :
                [])
        ]

        const prompt = yield* Prompt.select({
            message: "What exercise you want to choose?",
            choices: choices(group, parentGroup)
        })
        if (parentGroup && prompt === "back") {
            return yield* chooseExercises(parentGroup)
        }
        if (!Layer.isLayer(prompt)) {
            return yield* chooseExercises((prompt as Group.Group).children, group)
        }
        return {
            exercise: prompt as Layer.Layer<Exercise.Exercise>,
            group
        }
    })

const processExercises = (level: number): Effect.Effect<
    void,
    ExerciseError,
    Exercise.Exercise | FileSystem.FileSystem | Terminal.Terminal
> => Exercise.Exercise.pipe(
    Effect.andThen((exercise) => exercise.generate(level)),
    Effect.provideService(
        Random.Random,
        Random.make(DateTime.now.pipe(
            Effect.map(DateTime.formatLocal),
            Effect.runSync
        ))
    ),
    Effect.flatMap(
        (exercise) =>
            Effect.map(
                writeExerciseFiles,
                (_) => _(exercise)
            )
    ),
    Effect.tap(() => console.log("Exercise files generated successfully!"))
)

const program: Effect.Effect<
    void,
    UnavailableLevelException | ExerciseError,
    Terminal.Terminal | FileSystem.FileSystem
> = Effect.gen(function*() {
    const chooseExerciseLevel: (group: Group.Group["children"], parentGroup?: Group.Group["children"]) => Effect.Effect<
        {
            exerciseTypes: Layer.Layer<Exercise.Exercise>
            level: number
        },
        QuitException | UnavailableLevelException,
        Terminal.Terminal
    > = (group, parentGroup) =>
        Effect.gen(function*() {
            const exerciseTypes = yield* chooseExercises(group, parentGroup)
            const level = yield* Effect.provide(chooseLevel, exerciseTypes.exercise)
            if (level === "back") {
                return yield* chooseExerciseLevel(exerciseTypes.group, group)
            }
            return {
                exerciseTypes: exerciseTypes.exercise,
                level
            }
        })
    const { exerciseTypes, level } = yield* chooseExerciseLevel(Group.exercises)
    return yield* processExercises(level).pipe(
        Effect.provide(exerciseTypes)
    )
})

// Run program
program.pipe(
    Effect.provide(NodeTerminal.layer),
    Effect.provide(NodeFileSystem.layer),
    NodeRuntime.runMain
)
