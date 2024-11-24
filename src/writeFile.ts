import { FileSystem } from "@effect/platform"
import type { PlatformError } from "@effect/platform/Error"
import { Effect } from "effect"

const FILE_PATH = "./file"

// File operations
const ensureDirectoryExists = (fs: FileSystem.FileSystem) =>
    fs.readDirectory(FILE_PATH).pipe(
        Effect.catchTag("SystemError", () =>
            Effect.gen(function*() {
                yield* fs.makeDirectory(FILE_PATH)
                return yield* fs.readDirectory(FILE_PATH)
            }))
    )

export const writeExerciseFiles: Effect.Effect<
    (exercise: { question: string; answer: string }) => void,
    PlatformError,
    FileSystem.FileSystem
> = Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem

    return (exercise: { question: string; answer: string }) => {
        return Effect.gen(function*() {
            yield* ensureDirectoryExists(fs)
            yield* fs.writeFileString(`${FILE_PATH}/question.txt`, exercise.question)
            yield* fs.writeFileString(`${FILE_PATH}/answer.txt`, exercise.answer)
        }).pipe(Effect.runPromise)
    }
})
