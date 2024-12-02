import { BigInt, Effect, Option, Random } from "effect"

export const randomRange: (min: number, max: number) => Effect.Effect<
    number,
    never,
    Random.Random
> = (min, max) =>
    Effect.andThen(
        Random.Random,
        (random) => random.nextIntBetween(min, max)
    )

export const bigIntToNumber: (a: bigint | number) => number = (a) => {
    if (!BigInt.isBigInt(a)) {
        return a
    }
    return BigInt.toNumber(a).pipe(
        Option.getOrThrow
    )
}

export const randomBigIntRange: (min: number | bigint, max: number | bigint) => Effect.Effect<
    bigint,
    never,
    Random.Random
> = (min, max) =>
    Effect.gen(function*() {
        const num = yield* randomRange(bigIntToNumber(min), bigIntToNumber(max))
        return BigInt.fromNumber(num).pipe(
            Option.getOrThrow
        )
    })
