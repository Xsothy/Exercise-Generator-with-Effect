# Agent Development Notes

This is a Foldkit app. Read [`FOLDKIT.md`](./FOLDKIT.md) before writing any code in this project. It covers the architecture, the APIs, and the conventions the project is built on.

Foldkit owns `FOLDKIT.md` and replaces it whole on upgrade. This file is yours. Anything you want an agent to know about this project goes below, where an upgrade won't touch it.

`FOLDKIT.md` reads the line below to decide whether it has already offered to vendor the Foldkit source. Leave it in place.

subtree_prompted: false

## Project Notes

- `src/core/` is the math domain: question generators, exact fractions, answer checking. It has no views and no Commands, and must stay that way so it can be tested on its own.
- A _topic_ (`src/core/topic.ts`) has _levels_; a level is a description plus an Effect that draws one `Problem` from the `Random` service. Add a topic by exporting it from a file in `src/core/exercises/` and listing it in that file's `topics`. The library page, the worksheet page and the catalog tests pick it up from there.
- A worksheet is fully described by its `WorksheetSpec` (topic, level, count, seed), which lives in the URL. Generation is seeded with `Random.withSeed`, so the same link always gives the same questions. Never generate questions from an unseeded source.
- Answers are entered in separate boxes (`src/core/entry.ts`), never as free text. A fraction is a numerator box over a denominator box.
- The site is a client-rendered SPA with path routing, so the host must serve `index.html` for unknown paths.
