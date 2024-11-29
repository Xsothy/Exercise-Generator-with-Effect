import { Effect, Random } from "effect"

export const randomRange: (min: number, max: number) => Effect.Effect<
    number,
    never,
    Random.Random
> = (min, max) =>
    Effect.andThen(
        Random.Random,
        (random) => random.nextIntBetween(min, max)
    )
