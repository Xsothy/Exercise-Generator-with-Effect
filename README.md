# Math Exercise Generator

A website that generates math worksheets. Pick a topic and a level, then either

- **print** the worksheet, with an optional answer key on its own page, or
- **answer on screen** and press **Check answers** to have every question marked.

It is a [Foldkit](https://foldkit.dev) app, created with `create-foldkit-app`, built on
[Effect](https://effect.website).

A worksheet is identified by its topic, level, question count and seed, all of which live in
the URL (`/topic/fraction-add/2?count=20&seed=k7m2qd`). Sharing the link, or re-typing the
code printed at the bottom of a sheet, always reproduces the same questions and answer key.

## Topics

| Group      | Section    | Topic                             | Levels |
| ---------- | ---------- | --------------------------------- | ------ |
| Arithmetic |            | Addition                          | 5      |
| Arithmetic |            | Subtraction                       | 5      |
| Arithmetic |            | Multiplication                    | 5      |
| Arithmetic |            | Division (remainders, decimals)   | 5      |
| Fractions  | Operations | Adding fractions                  | 4      |
| Fractions  | Operations | Subtracting fractions             | 4      |
| Fractions  | Operations | Multiplying fractions             | 4      |
| Fractions  | Operations | Dividing fractions                | 4      |
| Fractions  | Converting | Simplifying fractions             | 5      |
| Fractions  | Converting | Improper fraction to mixed number | 5      |
| Fractions  | Converting | Mixed number to improper fraction | 5      |
| Fractions  | Comparing  | Comparing fractions               | 4      |

## How answers are entered and checked

Answers go into boxes shaped like the answer, and each box only accepts the characters that
belong in it.

- **Numbers**: one box. `1,234.50` and `1234.5` are the same answer.
- **Division with remainders**: a quotient box and a remainder box.
- **Fractions**: a numerator box over a denominator box, with a whole-number box in front
  when the answer may be a mixed number. The value must be right _and_ in lowest terms; an
  answer such as `2/4` is marked "Right value. Now simplify it." rather than simply wrong.
  The conversion topics also insist on the form they ask for.
- **Comparisons**: choose `<`, `=` or `>`.

Press Enter to move to the next box; Enter in the last box checks the sheet.

## Running it

```sh
pnpm install
pnpm dev        # start the site at http://localhost:5173
pnpm build      # build a static site into ./dist
pnpm preview    # serve the built site
```

The app uses path routing, so whatever serves `dist/` must fall back to `index.html` for
unknown paths (`vite preview`, Netlify, Vercel and Cloudflare Pages do; plain GitHub Pages
needs a `404.html` copy of `index.html`).

## Development

```sh
pnpm test        # generator, answer-checking, update and view tests
pnpm typecheck
pnpm lint        # oxlint with the Foldkit and Effect rules
pnpm format      # oxfmt
```

Read [`FOLDKIT.md`](./FOLDKIT.md) for the framework's conventions and
[`AGENTS.md`](./AGENTS.md) for this project's own.

### Layout

```
index.html                page shell
src/entry.ts              boots the Foldkit runtime
src/main.ts               root Model / Message / update / view: routing and the topic library
src/route.ts              routes and their URL parsers
src/page/worksheet.ts     the worksheet page (a Submodel): generate, answer, check, print
src/view/math.ts          shared views: stacked fractions, tokens, icons
src/styles.css            Tailwind theme (colors, fonts) and print rules
src/core/                 the math domain; no views, no Commands
  rational.ts             exact fraction arithmetic
  problem.ts              question tokens and answer types (Schemas)
  generator.ts            random helpers and de-duplication
  topic.ts                topic / level definitions
  exercises/              the generators themselves
  catalog.ts              list of topics, grouping, search, `generateWorksheet(spec)`
  entry.ts                which answer boxes a problem needs, and their input masks
  check.ts                marks an answer against the model answer
```

### Adding a topic

A level is a description plus an Effect that produces one `Problem` using the `Random`
service. It may fail with `SkipGenerate` to reject a draw that does not fit:

```ts
{
  description: 'Division of 2-digit numbers with a remainder (e.g., 29 ÷ 5 = 5 R4)',
  generate: Effect.gen(function* () {
    const a = yield* int(10, 99)
    const b = yield* int(2, 9)
    yield* skipWhen(a % b === 0)
    return withRemainder(a, b)
  }),
}
```

Give the topic a `group`, an optional section, and a `sample` question for its card, then
add it to `topics` in its `exercises/*.ts` file. It then shows up in the library, the
worksheet page and the catalog tests.

## Ideas for later

- Phone practice mode: one question at a time with an on-screen number pad
- "Retry the ones I missed" and "Continue last worksheet"
- Worksheets that mix several topics
- Word problems
