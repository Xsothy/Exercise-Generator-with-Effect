import { Data, Effect, Option, Random } from "effect"
import type { Problem } from "./Problem.js"
import { questionText } from "./Problem.js"
import * as Rational from "./Rational.js"

/** Raised by a generator to throw away a draw that does not fit the level. */
export class SkipGenerate extends Data.TaggedError("SkipGenerate") {}

export type Generator<A = Problem> = Effect.Effect<A, SkipGenerate>

export const skip: Generator<never> = Effect.suspend(() => new SkipGenerate())

export const skipWhen = (condition: boolean): Generator<void> => (condition ? skip : Effect.void)

/** Random integer with *both* bounds inclusive. */
export const int = (min: number, max: number): Effect.Effect<number> => Random.nextIntBetween(min, max + 1)

export const pick = <A>(items: ReadonlyArray<A>): Effect.Effect<A> =>
    Effect.map(int(0, items.length - 1), (i) => items[i]!)

/** A proper fraction in lowest terms with a denominator in the given range. */
export const properFraction = (minDenominator: number, maxDenominator: number): Generator<Rational.Rational> =>
    Effect.gen(function*() {
        const d = yield* int(minDenominator, maxDenominator)
        const n = yield* int(1, d - 1)
        yield* skipWhen(Rational.gcd(n, d) !== 1)
        return Rational.make(n, d)
    })

/**
 * Draws from `generator` until `count` distinct problems are collected. Gives
 * up (returning fewer) when the level simply has no more unique questions.
 */
export const generateSet = (generator: Generator, count: number): Effect.Effect<Array<Problem>> =>
    Effect.gen(function*() {
        const seen = new Set<string>()
        const problems: Array<Problem> = []
        const maxAttempts = count * 200 + 500
        for (let attempt = 0; problems.length < count && attempt < maxAttempts; attempt++) {
            const drawn = yield* Effect.option(generator)
            if (Option.isNone(drawn)) continue
            const key = questionText(drawn.value)
            if (seen.has(key)) continue
            seen.add(key)
            problems.push(drawn.value)
        }
        return problems
    })

/** Runs a generator deterministically: the same seed always gives the same set. */
export const runSeeded = <A>(effect: Effect.Effect<A>, seed: string): A =>
    Effect.runSync(Effect.withRandom(effect, Random.make(seed)))
