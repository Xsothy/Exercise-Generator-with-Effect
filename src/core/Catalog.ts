import * as Arithmetic from "./exercises/Arithmetic.js"
import * as Fraction from "./exercises/Fraction.js"
import { generateSet, runSeeded } from "./Generator.js"
import type { Problem } from "./Problem.js"
import type { Topic } from "./Topic.js"

export const topics: ReadonlyArray<Topic> = [...Arithmetic.topics, ...Fraction.topics]

export const findTopic = (id: string): Topic | undefined => topics.find((topic) => topic.id === id)

/** Everything needed to reproduce a worksheet exactly. */
export interface WorksheetSpec {
    readonly topicId: string
    /** 1-based. */
    readonly level: number
    readonly count: number
    readonly seed: string
}

export const MAX_QUESTIONS = 60

export const defaultSpec = (seed: string): WorksheetSpec => ({ topicId: topics[0]!.id, level: 1, count: 20, seed })

/** Clamps a (possibly hand-edited) spec to something the catalog can serve. */
export const normalizeSpec = (spec: WorksheetSpec): WorksheetSpec => {
    const topic = findTopic(spec.topicId) ?? topics[0]!
    const clamp = (value: number, max: number) => Math.min(max, Math.max(1, Math.trunc(value) || 1))
    return {
        topicId: topic.id,
        level: clamp(spec.level, topic.levels.length),
        count: clamp(spec.count, MAX_QUESTIONS),
        seed: spec.seed
    }
}

export const generateWorksheet = (spec: WorksheetSpec): Array<Problem> => {
    const { count, level, seed, topicId } = normalizeSpec(spec)
    const generator = findTopic(topicId)!.levels[level - 1]!.generate
    return runSeeded(generateSet(generator, count), `${topicId}/${level}/${seed}`)
}
