# Math Exercise Generator

A small website that generates math worksheets. Pick a topic and a level, then either

- **print** the worksheet (with an optional answer key on its own page), or
- **answer on screen** and press **Check answers** to get every question marked.

The question generators are written with [Effect](https://effect.website) and are fully
deterministic: a worksheet is identified by its topic, level, question count and seed, all of
which live in the URL. Sharing the link (or re-typing the code printed at the bottom of a
sheet) always reproduces the same questions and the same answer key.

> This is a prototype. It replaces the earlier command-line generator that wrote
> `question.txt` / `answer.txt` files.

## Topics

| Group      | Topic                             | Levels |
| ---------- | --------------------------------- | ------ |
| Arithmetic | Addition                          | 5      |
| Arithmetic | Subtraction                       | 5      |
| Arithmetic | Multiplication                    | 5      |
| Arithmetic | Division (remainders, decimals)   | 5      |
| Fractions  | Adding fractions                  | 4      |
| Fractions  | Subtracting fractions             | 4      |
| Fractions  | Multiplying fractions             | 4      |
| Fractions  | Dividing fractions                | 4      |
| Fractions  | Simplifying fractions             | 5      |
| Fractions  | Improper fraction → mixed number  | 5      |
| Fractions  | Mixed number → improper fraction  | 5      |
| Fractions  | Comparing fractions               | 4      |

## How answers are entered and checked

Answers go into boxes shaped like the answer, and each box only accepts the characters that
belong in it, so there is no format to remember.

- **Numbers**: one box. `1,234.50` and `1234.5` are the same answer.
- **Division with remainders**: a quotient box and a remainder box.
- **Fractions**: a numerator box over a denominator box, with a whole-number box in front
  when the answer may be a mixed number. The value must be right *and* in lowest terms; an
  answer such as `2/4` is marked "right value — now simplify it" rather than simply wrong.
  The conversion topics also insist on the form they ask for.
- **Comparisons**: choose `<`, `=` or `>`.

Keyboard: `Enter` moves to the next box, and typing an answer the way it is said aloud
(`1 3/4`, `5r4`) walks through its boxes.

## Running it

```sh
pnpm install
pnpm dev        # start the site at http://localhost:5173
pnpm build      # type-check and build a static site into ./dist
pnpm preview    # serve the built site
```

`dist/` is plain static files with relative asset paths, so it can be hosted anywhere
(GitHub Pages, Netlify, an S3 bucket, ...).

## Development

```sh
pnpm test       # generator and answer-checking tests
pnpm check      # type-check
pnpm lint       # eslint + dprint formatting
```

### Layout

```
index.html              page shell
src/core/               no DOM, no I/O — usable from any front end
  Rational.ts           exact fraction arithmetic
  Problem.ts            question tokens and answer types
  Generator.ts          random helpers, de-duplication, seeded running
  Topic.ts              topic / level definitions
  exercises/            the generators themselves
  Catalog.ts            list of topics and `generateWorksheet(spec)`
  Entry.ts              which answer boxes a problem needs, and their input masks
  Check.ts              marks an answer against the model answer
src/web/                the website (plain TypeScript + CSS, built with Vite)
test/                   vitest tests
```

### Adding a topic

A level is just a description plus an Effect that produces one `Problem` using the `Random`
service. It may fail with `SkipGenerate` to reject a draw that does not fit:

```ts
{
    description: "Division of 2-digit numbers with a remainder (e.g., 29 ÷ 5 = 5 R4)",
    generate: Effect.gen(function*() {
        const a = yield* int(10, 99)
        const b = yield* int(2, 9)
        yield* skipWhen(a % b === 0)
        return withRemainder(a, b)
    })
}
```

Add the topic to `topics` in its `exercises/*.ts` file and it shows up in the site, the
answer key and the test suite automatically.

## Ideas for later

- Worksheets that mix several topics
- Word problems ("real-world" levels)
- Vertical layout for long multiplication and division
- Saving scores and progress per student
