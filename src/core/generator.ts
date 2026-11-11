import { Array, Data, Effect, HashSet, Option, Random } from 'effect'

import { type Problem, questionText } from './problem'
import * as Rational from './rational'

/** Raised by a generator to throw away a draw that does not fit the level. */
export class SkipGenerate extends Data.TaggedError('SkipGenerate')<{}> {}

export type Generator<A = Problem> = Effect.Effect<A, SkipGenerate>

export const skipWhen = (condition: boolean): Generator<void> =>
  condition ? Effect.fail(new SkipGenerate()) : Effect.void

/** Random integer with both bounds inclusive. */
export const int = (min: number, max: number): Effect.Effect<number> =>
  Random.nextIntBetween(min, max, { halfOpen: false })

export const pick = <A>(
  items: Array.NonEmptyReadonlyArray<A>,
): Effect.Effect<A> =>
  Effect.map(int(0, items.length - 1), index =>
    Option.getOrElse(Array.get(items, index), () => Array.headNonEmpty(items)),
  )

/** A proper fraction in lowest terms with a denominator in the given range. */
export const properFraction = (
  minDenominator: number,
  maxDenominator: number,
): Generator<Rational.Rational> =>
  Effect.gen(function* () {
    const d = yield* int(minDenominator, maxDenominator)
    const n = yield* int(1, d - 1)
    yield* skipWhen(Rational.gcd(n, d) !== 1)
    return Rational.make(n, d)
  })

type Collected = Readonly<{
  seen: HashSet.HashSet<string>
  problems: ReadonlyArray<Problem>
  attemptsLeft: number
}>

const collect = (
  generator: Generator,
  count: number,
  collected: Collected,
): Effect.Effect<ReadonlyArray<Problem>> => {
  if (collected.problems.length >= count || collected.attemptsLeft <= 0) {
    return Effect.succeed(collected.problems)
  }

  const attemptsLeft = collected.attemptsLeft - 1

  return Effect.flatMap(Effect.option(generator), maybeProblem => {
    const next = Option.match(maybeProblem, {
      onNone: () => ({ ...collected, attemptsLeft }),
      onSome: problem => {
        const key = questionText(problem)
        return HashSet.has(collected.seen, key)
          ? { ...collected, attemptsLeft }
          : {
              seen: HashSet.add(collected.seen, key),
              problems: Array.append(collected.problems, problem),
              attemptsLeft,
            }
      },
    })
    return collect(generator, count, next)
  })
}

/** Draws from `generator` until `count` distinct problems are collected. Gives
 *  up, returning fewer, when the level has no more unique questions. */
export const generateSet = (
  generator: Generator,
  count: number,
): Effect.Effect<ReadonlyArray<Problem>> =>
  collect(generator, count, {
    seen: HashSet.empty(),
    problems: [],
    attemptsLeft: count * 200 + 500,
  })
