import { Effect, Random } from "effect"

export const randomRange: (min: number, max: number) => Effect.Effect<
    number,
    never,
    Random.Random
> = (min, max) =>
    Effect.gen(function*() {
        const random = yield* Random.Random
        return (yield* random.nextInt) % (max - min) + min
    })
