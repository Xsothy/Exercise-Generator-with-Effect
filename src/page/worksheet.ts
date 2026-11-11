import { Array, Effect, Option, Random, Schema, String, pipe } from 'effect'
import { Command, Dom, Submodel, type Update } from 'foldkit'
import type { Html, HtmlBuilder } from 'foldkit/html'
import { defineMessageUnion } from 'foldkit/message'
import { pushUrl, replaceUrl } from 'foldkit/navigation'
import { defineTaggedUnion } from 'foldkit/schema'
import { modifyFields } from 'foldkit/struct'

import { Catalog, Check, Entry, Problem, type Topic } from '../core'
import {
  AppRoute,
  type WorksheetRoute,
  libraryRouter,
  worksheetRouter,
} from '../route'
import { iconView, stackedView, tokenView, tokensView } from '../view/math'

// MODEL

const Marking = Schema.Literals(['Unmarked', 'Marked'])
type Marking = typeof Marking.Type

const AnswerKey = Schema.Literals(['Hidden', 'Shown'])
const PrintedKey = Schema.Literals(['Included', 'Excluded'])

export const Sheet = defineTaggedUnion({
  Idle: {},
  UnknownTopic: { topicId: Schema.String },
  AwaitingSeed: {
    topicId: Schema.String,
    level: Schema.Number,
    count: Schema.Number,
  },
  Generating: { spec: Catalog.WorksheetSpec },
  Ready: {
    spec: Catalog.WorksheetSpec,
    problems: Schema.Array(Problem.Problem),
    responses: Schema.Array(Schema.Array(Schema.String)),
    marking: Marking,
  },
})
export type Sheet = typeof Sheet.Type
type ReadySheet = typeof Sheet.Ready.Type

export const Model = Schema.Struct({
  sheet: Sheet,
  answerKey: AnswerKey,
  printedKey: PrintedKey,
})
export type Model = typeof Model.Type

export const initialModel: Model = {
  sheet: Sheet.Idle(),
  answerKey: 'Hidden',
  printedKey: 'Included',
}

// MESSAGE

export const Message = defineMessageUnion({
  ChangedRoute: { route: AppRoute.Worksheet },
  CompletedGenerateSeed: { seed: Schema.String },
  CompletedReplaceWorksheetUrl: {},
  CompletedPushWorksheetUrl: {},
  CompletedGenerateWorksheet: {
    spec: Catalog.WorksheetSpec,
    problems: Schema.Array(Problem.Problem),
  },
  UpdatedAnswer: {
    question: Schema.Number,
    part: Schema.Number,
    value: Schema.String,
  },
  SelectedSign: { question: Schema.Number, sign: Problem.Comparison },
  PressedEnterInAnswer: { question: Schema.Number, part: Schema.Number },
  CompletedFocusAnswer: {},
  ClickedCheckAnswers: {},
  ClickedClearAnswers: {},
  ClickedToggleAnswerKey: {},
  ClickedTogglePrintedKey: {},
  ClickedNewQuestions: {},
  ClickedPrint: {},
  CompletedPrintPage: {},
})
export type Message = typeof Message.Type

// COMMAND

const SEED_SPACE = 36 ** 6

export const GenerateSeed = Command.define('GenerateSeed', {
  messages: [Message.CompletedGenerateSeed],
  execute: Random.nextIntBetween(0, SEED_SPACE).pipe(
    Effect.map(value =>
      Message.CompletedGenerateSeed({
        seed: value.toString(36).padStart(6, '0'),
      }),
    ),
  ),
})

export const GenerateWorksheet = Command.define('GenerateWorksheet', {
  args: { spec: Catalog.WorksheetSpec },
  messages: [Message.CompletedGenerateWorksheet],
  execute: ({ spec }) =>
    Catalog.generateWorksheet(spec).pipe(
      Effect.map(problems =>
        Message.CompletedGenerateWorksheet({ spec, problems }),
      ),
    ),
})

export const ReplaceWorksheetUrl = Command.define('ReplaceWorksheetUrl', {
  args: { url: Schema.String },
  messages: [Message.CompletedReplaceWorksheetUrl],
  execute: ({ url }) =>
    replaceUrl(url).pipe(Effect.as(Message.CompletedReplaceWorksheetUrl())),
})

export const PushWorksheetUrl = Command.define('PushWorksheetUrl', {
  args: { url: Schema.String },
  messages: [Message.CompletedPushWorksheetUrl],
  execute: ({ url }) =>
    pushUrl(url).pipe(Effect.as(Message.CompletedPushWorksheetUrl())),
})

export const FocusAnswer = Command.define('FocusAnswer', {
  args: { selector: Schema.String },
  messages: [Message.CompletedFocusAnswer],
  execute: ({ selector }) =>
    Dom.focus(selector).pipe(
      Effect.as(Message.CompletedFocusAnswer()),
      Effect.catch(() => Effect.succeed(Message.CompletedFocusAnswer())),
    ),
})

export const PrintPage = Command.define('PrintPage', {
  messages: [Message.CompletedPrintPage],
  execute: Effect.sync(() => window.print()).pipe(
    Effect.as(Message.CompletedPrintPage()),
  ),
})

// UPDATE

export type UpdateReturn = Update.Return<Model, Message>

const specUrl = (spec: Catalog.WorksheetSpec): string =>
  worksheetRouter({
    topicId: spec.topicId,
    level: spec.level,
    count: Option.some(spec.count),
    seed: Option.some(spec.seed),
  })

const setSheet = (model: Model, sheet: Sheet): Model =>
  modifyFields(model, { sheet: () => sheet })

const isShowing = (sheet: Sheet, spec: Catalog.WorksheetSpec): boolean =>
  Sheet.match<boolean>(sheet, {
    Idle: () => false,
    UnknownTopic: () => false,
    AwaitingSeed: () => false,
    Generating: generating => specUrl(generating.spec) === specUrl(spec),
    Ready: ready => specUrl(ready.spec) === specUrl(spec),
  })

const enter = (model: Model, route: WorksheetRoute): UpdateReturn =>
  Option.match(Catalog.findTopic(route.topicId), {
    onNone: () => ({
      model: setSheet(model, Sheet.UnknownTopic({ topicId: route.topicId })),
    }),
    onSome: topic => {
      const level = Catalog.clampLevel(topic, route.level)
      const count = Catalog.clampCount(
        Option.getOrElse(route.count, () => Catalog.DEFAULT_QUESTIONS),
      )
      const maybeSeed = pipe(
        route.seed,
        Option.map(Catalog.sanitizeSeed),
        Option.filter(String.isNonEmpty),
      )

      return Option.match(maybeSeed, {
        onNone: (): UpdateReturn => ({
          model: setSheet(
            model,
            Sheet.AwaitingSeed({ topicId: topic.id, level, count }),
          ),
          commands: [GenerateSeed()],
        }),
        onSome: (seed): UpdateReturn => {
          const spec = { topicId: topic.id, level, count, seed }
          if (isShowing(model.sheet, spec)) {
            return { model }
          }
          return {
            model: setSheet(model, Sheet.Generating({ spec })),
            commands: [GenerateWorksheet({ spec })],
          }
        },
      })
    },
  })

export const init = (route: WorksheetRoute): UpdateReturn =>
  enter(initialModel, route)

const modifyReady = (
  model: Model,
  modify: (ready: ReadySheet) => ReadySheet,
): Model =>
  Sheet.match<Model>(model.sheet, {
    Idle: () => model,
    UnknownTopic: () => model,
    AwaitingSeed: () => model,
    Generating: () => model,
    Ready: ready => setSheet(model, modify(ready)),
  })

const modifyAt = <A>(
  items: ReadonlyArray<A>,
  position: number,
  modify: (item: A) => A,
): ReadonlyArray<A> =>
  Array.map(items, (item, index) => (index === position ? modify(item) : item))

const setPart = (
  ready: ReadySheet,
  question: number,
  part: number,
  value: string,
): ReadySheet =>
  modifyFields(ready, {
    marking: (): Marking => 'Unmarked',
    responses: responses =>
      modifyAt(responses, question, parts =>
        modifyAt(parts, part, () => value),
      ),
  })

const maskedValue = (
  ready: ReadySheet,
  question: number,
  part: number,
  value: string,
): string =>
  pipe(
    Array.get(ready.problems, question),
    Option.flatMap(problem => Array.get(Entry.fields(problem), part)),
    Option.match({
      onNone: () => value,
      onSome: field => Entry.mask(field, value),
    }),
  )

const answerBoxId = (question: number, part: number): string =>
  `answer-${question}-${part}`

/** The box Enter should move to: the next box of the same question, or the
 *  first box of the next question that has a text box at all. */
const nextAnswerBox = (
  ready: ReadySheet,
  question: number,
  part: number,
): Option.Option<string> => {
  const hasNextPart = pipe(
    Array.get(ready.responses, question),
    Option.exists(parts => part + 1 < parts.length),
  )
  if (hasNextPart) {
    return Option.some(answerBoxId(question, part + 1))
  }

  return pipe(
    ready.problems,
    Array.findFirstIndex(
      (problem, index) =>
        index > question && problem.answer._tag !== 'Comparison',
    ),
    Option.map(index => answerBoxId(index, 0)),
  )
}

const seedTarget = (
  sheet: Sheet,
): Option.Option<
  Readonly<{ topicId: string; level: number; count: number; isFirst: boolean }>
> =>
  Sheet.match(sheet, {
    Idle: () => Option.none(),
    UnknownTopic: () => Option.none(),
    AwaitingSeed: ({ topicId, level, count }) =>
      Option.some({ topicId, level, count, isFirst: true }),
    Generating: ({ spec }) =>
      Option.some({
        topicId: spec.topicId,
        level: spec.level,
        count: spec.count,
        isFirst: false,
      }),
    Ready: ({ spec }) =>
      Option.some({
        topicId: spec.topicId,
        level: spec.level,
        count: spec.count,
        isFirst: false,
      }),
  })

export const update = (model: Model, message: Message) =>
  Message.match<UpdateReturn>(message, {
    ChangedRoute: ({ route }) => enter(model, route),

    CompletedGenerateSeed: ({ seed }) =>
      Option.match(seedTarget(model.sheet), {
        onNone: (): UpdateReturn => ({ model }),
        onSome: ({ topicId, level, count, isFirst }): UpdateReturn => {
          const url = specUrl({ topicId, level, count, seed })
          // NOTE: the first seed replaces the seedless URL so Back does not
          // land on it and immediately generate another worksheet.
          return {
            model,
            commands: [
              isFirst
                ? ReplaceWorksheetUrl({ url })
                : PushWorksheetUrl({ url }),
            ],
          }
        },
      }),

    CompletedReplaceWorksheetUrl: () => ({ model }),
    CompletedPushWorksheetUrl: () => ({ model }),

    CompletedGenerateWorksheet: ({ spec, problems }) => {
      if (!isShowing(model.sheet, spec)) {
        return { model }
      }
      return {
        model: setSheet(
          model,
          Sheet.Ready({
            spec,
            problems,
            responses: Array.map(problems, Entry.emptyResponse),
            marking: 'Unmarked',
          }),
        ),
      }
    },

    UpdatedAnswer: ({ question, part, value }) => ({
      model: modifyReady(model, ready =>
        setPart(
          ready,
          question,
          part,
          maskedValue(ready, question, part, value),
        ),
      ),
    }),

    SelectedSign: ({ question, sign }) => ({
      model: modifyReady(model, ready => {
        const isSelected = pipe(
          Array.get(ready.responses, question),
          Option.flatMap(Array.head),
          Option.exists(current => current === sign),
        )
        return setPart(ready, question, 0, isSelected ? '' : sign)
      }),
    }),

    PressedEnterInAnswer: ({ question, part }) =>
      Sheet.match<UpdateReturn>(model.sheet, {
        Idle: () => ({ model }),
        UnknownTopic: () => ({ model }),
        AwaitingSeed: () => ({ model }),
        Generating: () => ({ model }),
        Ready: ready =>
          Option.match(nextAnswerBox(ready, question, part), {
            onNone: (): UpdateReturn => ({
              model: setSheet(
                model,
                modifyFields(ready, { marking: (): Marking => 'Marked' }),
              ),
            }),
            onSome: (id): UpdateReturn => ({
              model,
              commands: [FocusAnswer({ selector: `#${id}` })],
            }),
          }),
      }),

    CompletedFocusAnswer: () => ({ model }),

    ClickedCheckAnswers: () => ({
      model: modifyReady(model, ready =>
        modifyFields(ready, { marking: (): Marking => 'Marked' }),
      ),
    }),

    ClickedClearAnswers: () => ({
      model: modifyReady(model, ready =>
        modifyFields(ready, {
          marking: (): Marking => 'Unmarked',
          responses: () => Array.map(ready.problems, Entry.emptyResponse),
        }),
      ),
    }),

    ClickedToggleAnswerKey: () => ({
      model: modifyFields(model, {
        answerKey: answerKey => (answerKey === 'Shown' ? 'Hidden' : 'Shown'),
      }),
    }),

    ClickedTogglePrintedKey: () => ({
      model: modifyFields(model, {
        printedKey: printedKey =>
          printedKey === 'Included' ? 'Excluded' : 'Included',
      }),
    }),

    ClickedNewQuestions: () => ({ model, commands: [GenerateSeed()] }),

    ClickedPrint: () => ({ model, commands: [PrintPage()] }),

    CompletedPrintPage: () => ({ model }),
  })

/** Tells the worksheet page that the route changed. The page derives which
 *  worksheet to show from the route and returns the Commands that build it. */
export const informRouteChanged = (model: Model, route: WorksheetRoute) =>
  update(model, Message.ChangedRoute({ route }))

// VIEW

const FIELD_LABELS: Readonly<Record<Entry.Field, string>> = {
  value: 'answer',
  whole: 'whole number',
  numerator: 'numerator',
  denominator: 'denominator',
  quotient: 'quotient',
  remainder: 'remainder',
  sign: 'sign',
}

const SECONDARY_BUTTON =
  'inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-edge bg-white px-4 font-medium text-ink hover:border-accent cursor-pointer'

const PRIMARY_BUTTON =
  'inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-accent px-5 font-semibold text-white hover:bg-accent-strong cursor-pointer'

const verdictOf = (ready: ReadySheet, question: number): Check.Verdict =>
  pipe(
    Option.all({
      problem: Array.get(ready.problems, question),
      parts: Array.get(ready.responses, question),
    }),
    Option.match({
      onNone: () => Check.Verdict.Empty(),
      onSome: ({ problem, parts }) =>
        Check.check(
          problem.answer,
          Entry.compose(Entry.fields(problem), parts),
        ),
    }),
  )

const answerBoxView = (
  question: number,
  part: number,
  field: Entry.Field,
  value: string,
  h: HtmlBuilder<Message>,
): Html =>
  h.input([
    h.Id(answerBoxId(question, part)),
    h.Type('text'),
    h.InputMode(field === 'value' ? 'decimal' : 'numeric'),
    h.Maxlength(field === 'value' ? 14 : 4),
    h.Autocomplete('off'),
    h.Value(value),
    h.AriaLabel(`Question ${question + 1}: ${FIELD_LABELS[field]}`),
    h.OnInput(nextValue =>
      Message.UpdatedAnswer({ question, part, value: nextValue }),
    ),
    h.OnKeyDownPreventDefault(key =>
      key === 'Enter'
        ? Option.some(Message.PressedEnterInAnswer({ question, part }))
        : Option.none(),
    ),
    h.Class(
      `${field === 'value' ? 'w-32' : 'w-12 sm:w-13'} h-10 rounded-lg border-[1.5px] border-field bg-white text-center font-display text-xl text-ink tabular-nums print:h-8 print:w-10 print:rounded print:border-ink`,
    ),
  ])

const signPickerView = (
  question: number,
  selected: string,
  h: HtmlBuilder<Message>,
): Html =>
  h.span(
    [
      h.Class('inline-flex items-center gap-1'),
      h.Role('group'),
      h.AriaLabel(`Question ${question + 1}: choose a sign`),
    ],
    [
      h.span(
        [
          h.Class(
            'hidden size-9 items-center justify-center rounded-full border-[1.5px] border-ink print:inline-flex',
          ),
        ],
        [selected],
      ),
      ...Problem.Comparison.literals.map(sign =>
        h.keyed('button')(
          sign,
          [
            h.Type('button'),
            h.AriaPressed(selected === sign ? 'true' : 'false'),
            h.AriaLabel(
              { '<': 'less than', '=': 'equal to', '>': 'greater than' }[sign],
            ),
            h.OnClick(Message.SelectedSign({ question, sign })),
            h.Class(
              `size-11 rounded-lg border text-xl cursor-pointer print:hidden ${selected === sign ? 'border-accent bg-accent font-semibold text-white' : 'border-edge bg-white text-ink hover:border-accent'}`,
            ),
          ],
          [sign],
        ),
      ),
    ],
  )

const answerEntryView = (
  problem: Problem.Problem,
  question: number,
  parts: ReadonlyArray<string>,
  h: HtmlBuilder<Message>,
): Html => {
  const fields = Entry.fields(problem)
  const boxOf = (field: Entry.Field): Html =>
    pipe(
      Array.findFirstIndex(fields, candidate => candidate === field),
      Option.match({
        onNone: () => h.empty,
        onSome: part =>
          answerBoxView(
            question,
            part,
            field,
            Option.getOrElse(Array.get(parts, part), () => ''),
            h,
          ),
      }),
    )

  if (Array.contains(fields, 'numerator')) {
    return h.span(
      [h.Class('inline-flex items-center gap-1.5')],
      [
        boxOf('whole'),
        stackedView(boxOf('numerator'), boxOf('denominator'), h),
      ],
    )
  }
  if (Array.contains(fields, 'quotient')) {
    return h.span(
      [h.Class('inline-flex items-center gap-1.5')],
      [
        boxOf('quotient'),
        h.span([h.Class('text-muted')], ['R']),
        boxOf('remainder'),
      ],
    )
  }
  return boxOf('value')
}

const modelAnswerView = (
  label: string,
  answer: Problem.Answer,
  h: HtmlBuilder<Message>,
): Html =>
  h.span(
    [h.Class('inline-flex items-center gap-1.5 text-ink')],
    [label, ...tokensView(Problem.answerTokens(answer), h)],
  )

const feedbackView = (
  verdict: Check.Verdict,
  answer: Problem.Answer,
  h: HtmlBuilder<Message>,
): Html => {
  const line = (
    tone: string,
    icon: Html,
    children: ReadonlyArray<Html | string>,
  ): Html =>
    h.p(
      [
        h.Class(
          `ml-9 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-medium print:hidden ${tone}`,
        ),
      ],
      [icon, ...children],
    )

  return Check.Verdict.match<Html>(verdict, {
    Empty: () =>
      line('text-muted', h.empty, [
        h.span([h.Class('shrink-0')], ['Not answered.']),
        modelAnswerView('Answer:', answer, h),
      ]),
    Correct: () => line('text-good', iconView('check', h), ['Correct']),
    Almost: ({ hint }) =>
      line('text-warn', iconView('alert', h), [
        h.span([h.Class('min-w-0 flex-1')], [hint]),
      ]),
    Invalid: ({ hint }) =>
      line('text-bad', iconView('cross', h), [
        h.span([h.Class('min-w-0 flex-1')], [hint]),
      ]),
    Incorrect: () =>
      line('text-bad', iconView('cross', h), [
        modelAnswerView('The answer is', answer, h),
      ]),
  })
}

const questionTone = (marking: Marking, verdict: Check.Verdict): string => {
  if (marking === 'Unmarked') {
    return 'border-line bg-white'
  }
  return Check.Verdict.match<string>(verdict, {
    Empty: () => 'border-line bg-white',
    Correct: () => 'border-good-edge bg-good-soft',
    Almost: () => 'border-warn-edge bg-warn-soft',
    Invalid: () => 'border-bad-edge bg-bad-soft',
    Incorrect: () => 'border-bad-edge bg-bad-soft',
  })
}

const questionView = (
  ready: ReadySheet,
  problem: Problem.Problem,
  question: number,
  h: HtmlBuilder<Message>,
): Html => {
  const parts = Option.getOrElse(
    Array.get(ready.responses, question),
    (): ReadonlyArray<string> => [],
  )
  const verdict = verdictOf(ready, question)
  const isComparison = problem.answer._tag === 'Comparison'

  const selectedSign = Option.getOrElse(Array.head(parts), () => '')

  const expression = isComparison
    ? Array.map(problem.tokens, token =>
        token._tag === 'Blank'
          ? signPickerView(question, selectedSign, h)
          : tokenView(token, h),
      )
    : [
        ...tokensView(problem.tokens, h),
        h.span([h.Class('text-muted')], ['=']),
        answerEntryView(problem, question, parts, h),
      ]

  return h.keyed('li')(
    Problem.questionText(problem),
    [
      h.Class(
        `flex break-inside-avoid flex-col gap-2.5 rounded-[14px] border px-4 py-4 print:rounded-none print:border-0 print:border-b print:border-line print:bg-white print:px-0 print:py-2 ${questionTone(ready.marking, verdict)}`,
      ),
    ],
    [
      h.div(
        [
          h.Class(
            'flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-2xl font-medium print:gap-x-2 print:text-xl',
          ),
        ],
        [
          h.span(
            [h.Class('w-6 font-sans text-sm font-medium text-muted')],
            [`${question + 1}.`],
          ),
          ...expression,
        ],
      ),
      ready.marking === 'Marked'
        ? feedbackView(verdict, problem.answer, h)
        : h.empty,
    ],
  )
}

type Tally = Readonly<{
  correct: number
  almost: number
  wrong: number
  empty: number
}>

const tallyOf = (ready: ReadySheet): Tally => {
  const verdicts = ready.problems.map((_, question) =>
    verdictOf(ready, question),
  )
  const count = (tags: ReadonlyArray<Check.Verdict['_tag']>): number =>
    Array.filter(verdicts, verdict => Array.contains(tags, verdict._tag)).length

  return {
    correct: count(['Correct']),
    almost: count(['Almost']),
    wrong: count(['Incorrect', 'Invalid']),
    empty: count(['Empty']),
  }
}

const tallyRowView = (
  swatch: string,
  label: string,
  value: number,
  h: HtmlBuilder<Message>,
): Html =>
  h.li(
    [h.Class('flex items-center justify-between')],
    [
      h.span(
        [h.Class('inline-flex items-center gap-2')],
        [h.span([h.Class(`size-2.5 rounded-sm ${swatch}`)]), label],
      ),
      h.span([h.Class('font-semibold')], [`${value}`]),
    ],
  )

const scoreView = (ready: ReadySheet, h: HtmlBuilder<Message>): Html => {
  const tally = tallyOf(ready)
  const total = ready.problems.length

  return h.div(
    [h.Class('flex flex-col gap-4'), h.AriaLive('polite')],
    [
      h.div(
        [h.Class('flex flex-col gap-0.5')],
        [
          h.span(
            [
              h.Class(
                'text-xs font-semibold tracking-widest text-muted uppercase',
              ),
            ],
            ['Score'],
          ),
          h.span(
            [h.Class('font-display text-[44px] leading-tight font-bold')],
            [
              `${tally.correct} `,
              h.span([h.Class('font-medium text-muted')], [`/ ${total}`]),
            ],
          ),
        ],
      ),
      h.ul(
        [h.Class('flex flex-col gap-2')],
        [
          tallyRowView('bg-good-bar', 'Correct', tally.correct, h),
          tallyRowView('bg-warn-edge', 'Nearly right', tally.almost, h),
          tallyRowView('bg-bad', 'Wrong', tally.wrong, h),
          tallyRowView('bg-edge', 'Not answered', tally.empty, h),
        ],
      ),
    ],
  )
}

const resultsView = (
  model: Model,
  ready: ReadySheet,
  h: HtmlBuilder<Message>,
): Html =>
  h.aside(
    [
      h.AriaLabel('Results'),
      h.Class('flex max-w-full flex-[1_1_260px] flex-col gap-4 print:hidden'),
    ],
    [
      h.div(
        [
          h.Class(
            'flex flex-col gap-4 rounded-[14px] border border-line bg-white p-5',
          ),
        ],
        [
          ready.marking === 'Marked'
            ? scoreView(ready, h)
            : h.p(
                [h.Class('text-muted')],
                [
                  'Fill in your answers, then check them. Press Enter to jump to the next box.',
                ],
              ),
          h.button(
            [
              h.Type('button'),
              h.OnClick(Message.ClickedCheckAnswers()),
              h.Class(PRIMARY_BUTTON),
            ],
            ['Check answers'],
          ),
          h.button(
            [
              h.Type('button'),
              h.OnClick(Message.ClickedClearAnswers()),
              h.Class(SECONDARY_BUTTON),
            ],
            ['Clear answers'],
          ),
          h.button(
            [
              h.Type('button'),
              h.AriaPressed(model.answerKey === 'Shown' ? 'true' : 'false'),
              h.OnClick(Message.ClickedToggleAnswerKey()),
              h.Class(
                'h-11 font-medium text-accent hover:text-accent-strong cursor-pointer',
              ),
            ],
            [
              model.answerKey === 'Shown'
                ? 'Hide answer key'
                : 'Show answer key',
            ],
          ),
        ],
      ),
      h.div(
        [
          h.Class(
            'flex flex-col gap-3 rounded-[14px] border border-line bg-white p-5',
          ),
        ],
        [
          h.button(
            [
              h.Type('button'),
              h.OnClick(Message.ClickedPrint()),
              h.Class(SECONDARY_BUTTON),
            ],
            [iconView('print', h), 'Print worksheet'],
          ),
          h.label(
            [h.Class('flex min-h-11 items-center gap-2 text-sm')],
            [
              h.input([
                h.Type('checkbox'),
                h.Checked(model.printedKey === 'Included'),
                h.OnClick(Message.ClickedTogglePrintedKey()),
                h.Class('size-4 accent-accent'),
              ]),
              'Include the answer key when printing',
            ],
          ),
        ],
      ),
    ],
  )

const linkTo = (
  spec: Catalog.WorksheetSpec,
  change: Partial<Pick<Catalog.WorksheetSpec, 'level' | 'count'>>,
): string => specUrl({ ...spec, ...change })

const levelPickerView = (
  topic: Topic,
  spec: Catalog.WorksheetSpec,
  h: HtmlBuilder<Message>,
): Html =>
  h.div(
    [h.Class('flex flex-wrap items-center gap-3')],
    [
      h.span([h.Id('level-label'), h.Class('font-semibold')], ['Level']),
      h.div(
        [
          h.Role('group'),
          h.AriaLabelledBy('level-label'),
          h.Class('flex gap-1.5'),
        ],
        Array.makeBy(topic.levels.length, index => index + 1).map(level =>
          h.keyed('a')(
            `level-${level}`,
            [
              h.Href(linkTo(spec, { level })),
              h.AriaCurrent(level === spec.level ? 'true' : 'false'),
              h.AriaLabel(`Level ${level}`),
              h.Class(
                `flex size-11 items-center justify-center rounded-[10px] border ${level === spec.level ? 'border-accent bg-accent font-semibold text-white' : 'border-edge bg-white font-medium text-ink hover:border-accent'}`,
              ),
            ],
            [`${level}`],
          ),
        ),
      ),
    ],
  )

const COUNT_STEP = 4

const countStepperView = (
  spec: Catalog.WorksheetSpec,
  h: HtmlBuilder<Message>,
): Html => {
  const stepLink = (label: string, symbol: string, count: number): Html =>
    h.a(
      [
        h.Href(linkTo(spec, { count: Catalog.clampCount(count) })),
        h.AriaLabel(label),
        h.Class(
          'flex h-11 w-11 items-center justify-center text-xl text-ink hover:bg-ground',
        ),
      ],
      [symbol],
    )

  return h.div(
    [h.Class('flex flex-wrap items-center gap-3')],
    [
      h.span([h.Class('font-semibold')], ['Questions']),
      h.div(
        [
          h.Class(
            'flex items-center overflow-hidden rounded-[10px] border border-edge bg-white',
          ),
        ],
        [
          stepLink('Fewer questions', '−', spec.count - COUNT_STEP),
          h.span(
            [
              h.Class(
                'flex h-11 w-12 items-center justify-center border-x border-edge font-semibold',
              ),
            ],
            [`${spec.count}`],
          ),
          stepLink('More questions', '+', spec.count + COUNT_STEP),
        ],
      ),
    ],
  )
}

const worksheetCode = (spec: Catalog.WorksheetSpec): string =>
  `Worksheet ${spec.topicId}-${spec.level}-${spec.seed}`

const headingView = (
  topic: Topic,
  spec: Catalog.WorksheetSpec,
  questionCount: number,
  h: HtmlBuilder<Message>,
): Html => {
  const description = pipe(
    Catalog.findLevel(topic, spec.level),
    Option.match({ onNone: () => '', onSome: level => level.description }),
  )
  const writeOnLine = (label: string, grow: string): Html =>
    h.span(
      [h.Class(`flex items-end gap-2 ${grow}`)],
      [label, h.span([h.Class('h-6 flex-1 border-b-[1.5px] border-ink')])],
    )

  return h.div(
    [h.Class('flex flex-col gap-5')],
    [
      h.nav(
        [
          h.AriaLabel('Breadcrumb'),
          h.Class('flex flex-wrap items-center gap-2 text-muted print:hidden'),
        ],
        [
          h.a(
            [h.Href(libraryRouter()), h.Class('text-accent hover:underline')],
            ['All topics'],
          ),
          h.span([h.AriaHidden(true)], ['/']),
          h.span([], [topic.group]),
          h.span([h.AriaHidden(true)], ['/']),
          h.span([h.Class('font-medium text-ink')], [topic.title]),
        ],
      ),
      h.div(
        [
          h.Class(
            'flex flex-wrap items-end justify-between gap-x-8 gap-y-4 print:border-b-2 print:border-ink print:pb-4',
          ),
        ],
        [
          h.div(
            [h.Class('flex min-w-0 flex-col gap-1.5')],
            [
              h.h1(
                [h.Class('font-display text-[34px] leading-tight font-bold')],
                [topic.title],
              ),
              h.p(
                [h.Class('text-base text-muted')],
                [`Level ${spec.level} · ${description}`],
              ),
            ],
          ),
          h.button(
            [
              h.Type('button'),
              h.OnClick(Message.ClickedNewQuestions()),
              h.Class(`${SECONDARY_BUTTON} print:hidden`),
            ],
            [iconView('refresh', h), 'New questions'],
          ),
          h.div(
            [
              h.Class(
                'hidden h-16 w-24 items-center justify-end rounded-[10px] border-2 border-ink pr-3 font-display text-xl font-semibold print:flex',
              ),
            ],
            [`/ ${questionCount}`],
          ),
        ],
      ),
      h.div(
        [h.Class('hidden gap-8 font-semibold print:flex')],
        [writeOnLine('Name', 'flex-[2]'), writeOnLine('Date', 'flex-1')],
      ),
      h.div(
        [
          h.Class(
            'flex flex-wrap items-center gap-x-10 gap-y-4 rounded-[14px] border border-line bg-white px-5 py-4 print:hidden',
          ),
        ],
        [
          levelPickerView(topic, spec, h),
          countStepperView(spec, h),
          h.span(
            [h.Class('ml-auto text-[13px] text-muted')],
            [worksheetCode(spec)],
          ),
        ],
      ),
    ],
  )
}

const answerKeyView = (
  model: Model,
  topic: Topic,
  ready: ReadySheet,
  h: HtmlBuilder<Message>,
): Html => {
  const onScreen = model.answerKey === 'Shown' ? 'block' : 'hidden'
  const onPaper =
    model.printedKey === 'Included'
      ? 'print:block print:break-before-page'
      : 'print:hidden'

  return h.section(
    [
      h.AriaLabel('Answer key'),
      h.Class(
        `${onScreen} ${onPaper} rounded-[14px] border border-line bg-white p-6 print:rounded-none print:border-0 print:p-0`,
      ),
    ],
    [
      h.h2(
        [h.Class('font-display text-xl font-bold')],
        [`Answer key: ${topic.title}, level ${ready.spec.level}`],
      ),
      h.ol(
        [
          h.Class(
            'mt-4 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-8 gap-y-3 print:grid-cols-2',
          ),
        ],
        ready.problems.map((problem, question) => {
          const answer = tokensView(Problem.answerTokens(problem.answer), h)
          return h.keyed('li')(
            Problem.questionText(problem),
            [
              h.Class(
                'flex min-h-12 items-center gap-2.5 font-display text-lg font-medium',
              ),
            ],
            [
              h.span(
                [h.Class('w-7 font-sans text-sm text-muted')],
                [`${question + 1}.`],
              ),
              ...(problem.answer._tag === 'Comparison'
                ? problem.tokens.flatMap(token =>
                    token._tag === 'Blank' ? answer : [tokenView(token, h)],
                  )
                : [
                    ...tokensView(problem.tokens, h),
                    h.span([h.Class('text-muted')], ['=']),
                    ...answer,
                  ]),
            ],
          )
        }),
      ),
      h.p(
        [h.Class('mt-4 text-right text-xs text-muted')],
        [worksheetCode(ready.spec)],
      ),
    ],
  )
}

const pageView = (children: ReadonlyArray<Html>, h: HtmlBuilder<Message>) =>
  h.div(
    [
      h.Class(
        'mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8 print:max-w-none print:p-0',
      ),
    ],
    children,
  )

const statusView = (
  title: string,
  detail: string,
  h: HtmlBuilder<Message>,
): Html =>
  pageView(
    [
      h.h1([h.Class('font-display text-[34px] font-bold')], [title]),
      h.p([h.Class('text-muted')], [detail]),
      h.a(
        [
          h.Href(libraryRouter()),
          h.Class('font-medium text-accent hover:underline'),
        ],
        ['Back to all topics'],
      ),
    ],
    h,
  )

const preparingView = (h: HtmlBuilder<Message>): Html =>
  pageView(
    [
      h.p(
        [h.Class('text-muted'), h.AriaLive('polite')],
        ['Preparing questions…'],
      ),
    ],
    h,
  )

const readyView = (
  model: Model,
  topic: Topic,
  ready: ReadySheet,
  h: HtmlBuilder<Message>,
): Html => {
  const shortBy = ready.spec.count - ready.problems.length

  return pageView(
    [
      headingView(topic, ready.spec, ready.problems.length, h),
      shortBy > 0
        ? h.p(
            [
              h.Class(
                'rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn print:hidden',
              ),
            ],
            [
              `This level only has ${ready.problems.length} different questions, so the sheet is ${shortBy} short.`,
            ],
          )
        : h.empty,
      h.div(
        [h.Class('flex flex-wrap items-start gap-6')],
        [
          h.div(
            [h.Class('min-w-0 flex-[999_1_560px]')],
            [
              h.ol(
                [
                  h.Class(
                    'grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-3 print:grid-cols-2 print:gap-x-8 print:gap-y-0',
                  ),
                ],
                ready.problems.map((problem, question) =>
                  questionView(ready, problem, question, h),
                ),
              ),
              h.p(
                [
                  h.Class(
                    'mt-4 hidden text-right text-xs text-muted print:block',
                  ),
                ],
                [worksheetCode(ready.spec)],
              ),
            ],
          ),
          resultsView(model, ready, h),
        ],
      ),
      answerKeyView(model, topic, ready, h),
    ],
    h,
  )
}

export const view = Submodel.defineView<Model, Message>((model, h): Html =>
  Sheet.match<Html>(model.sheet, {
    Idle: () => preparingView(h),
    AwaitingSeed: () => preparingView(h),
    Generating: () => preparingView(h),
    UnknownTopic: ({ topicId }) =>
      statusView(
        'Topic not found',
        `There is no topic called “${topicId}”.`,
        h,
      ),
    Ready: ready =>
      Option.match(Catalog.findTopic(ready.spec.topicId), {
        onNone: () =>
          statusView(
            'Topic not found',
            `There is no topic called “${ready.spec.topicId}”.`,
            h,
          ),
        onSome: topic => readyView(model, topic, ready, h),
      }),
  }),
)

export const title = (model: Model): Option.Option<string> =>
  Sheet.match(model.sheet, {
    Idle: () => Option.none(),
    UnknownTopic: () => Option.none(),
    AwaitingSeed: ({ topicId }) =>
      Option.map(Catalog.findTopic(topicId), topic => topic.title),
    Generating: ({ spec }) =>
      Option.map(Catalog.findTopic(spec.topicId), topic => topic.title),
    Ready: ({ spec }) =>
      Option.map(Catalog.findTopic(spec.topicId), topic => topic.title),
  })
