import { Array, Effect, Option, Random, Schema, pipe } from 'effect'

import * as Arithmetic from './exercises/arithmetic'
import * as Fraction from './exercises/fraction'
import { generateSet } from './generator'
import type { Problem } from './problem'
import type { Level, Topic } from './topic'

export const topics: ReadonlyArray<Topic> = [
  ...Arithmetic.topics,
  ...Fraction.topics,
]

export const findTopic = (id: string): Option.Option<Topic> =>
  Array.findFirst(topics, topic => topic.id === id)

export const findLevel = (topic: Topic, level: number): Option.Option<Level> =>
  Array.get(topic.levels, level - 1)

export const MAX_QUESTIONS = 60
export const DEFAULT_QUESTIONS = 20

/** Everything needed to reproduce a worksheet exactly. `level` is 1-based. */
export const WorksheetSpec = Schema.Struct({
  topicId: Schema.String,
  level: Schema.Number,
  count: Schema.Number,
  seed: Schema.String,
})
export type WorksheetSpec = typeof WorksheetSpec.Type

const clamp = (value: number, max: number): number =>
  Math.min(max, Math.max(1, Number.isFinite(value) ? Math.trunc(value) : 1))

export const clampLevel = (topic: Topic, level: number): number =>
  clamp(level, topic.levels.length)

export const clampCount = (count: number): number => clamp(count, MAX_QUESTIONS)

/** Keeps only the characters a seed may contain, so a hand-edited link cannot
 *  smuggle anything else into the page. */
export const sanitizeSeed = (seed: string): string =>
  seed.replace(/[^a-z0-9]/gi, '').slice(0, 12)

/** The questions for a spec. The same spec always produces the same questions,
 *  which is what lets a link or a printed code reproduce a worksheet. */
export const generateWorksheet = (
  spec: WorksheetSpec,
): Effect.Effect<ReadonlyArray<Problem>> =>
  pipe(
    findTopic(spec.topicId),
    Option.flatMap(topic => findLevel(topic, spec.level)),
    Option.match({
      onNone: () => Effect.succeed([]),
      onSome: level =>
        generateSet(level.generate, clampCount(spec.count)).pipe(
          Random.withSeed(`${spec.topicId}/${spec.level}/${spec.seed}`),
        ),
    }),
  )

export type Section = Readonly<{
  maybeTitle: Option.Option<string>
  topics: Array.NonEmptyReadonlyArray<Topic>
}>

export type Group = Readonly<{
  title: string
  sections: ReadonlyArray<Section>
  topicCount: number
}>

const sectionKey = (topic: Topic): string =>
  Option.getOrElse(topic.maybeSection, () => '')

/** Topics arranged the way the library shows them: by group, then by section,
 *  both in catalog order. */
const toGroup = (groupTopics: Array.NonEmptyReadonlyArray<Topic>): Group => ({
  title: Array.headNonEmpty(groupTopics).group,
  topicCount: groupTopics.length,
  sections: pipe(
    groupTopics,
    Array.groupWith((a, b) => sectionKey(a) === sectionKey(b)),
    Array.map(sectionTopics => ({
      maybeTitle: Array.headNonEmpty(sectionTopics).maybeSection,
      topics: sectionTopics,
    })),
  ),
})

/** Topics arranged the way the library shows them: by group, then by section,
 *  both in catalog order. */
export const groupTopics = (from: ReadonlyArray<Topic>): ReadonlyArray<Group> =>
  Array.match(from, {
    onEmpty: () => [],
    onNonEmpty: nonEmpty =>
      pipe(
        nonEmpty,
        Array.groupWith((a, b) => a.group === b.group),
        Array.map(toGroup),
      ),
  })

const normalize = (text: string): string => text.trim().toLowerCase()

export const searchTopics = (searchText: string): ReadonlyArray<Topic> => {
  const query = normalize(searchText)
  if (query === '') {
    return topics
  }
  return Array.filter(topics, topic =>
    normalize(`${topic.title} ${topic.group} ${sectionKey(topic)}`).includes(
      query,
    ),
  )
}
