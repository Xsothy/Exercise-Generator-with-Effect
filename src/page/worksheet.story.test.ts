import { Effect, Option } from 'effect'
import { Command, given, message, model, story } from 'foldkit/story'
import { describe, expect, test } from 'vitest'

import { Catalog } from '../core'
import { AppRoute, worksheetRouter } from '../route'
import {
  GenerateSeed,
  GenerateWorksheet,
  Message,
  Model,
  PushWorksheetUrl,
  ReplaceWorksheetUrl,
  Sheet,
  init,
  initialModel,
  update,
} from './worksheet'

const spec: Catalog.WorksheetSpec = {
  topicId: 'fraction-add',
  level: 2,
  count: 4,
  seed: 'demo01',
}

const problems = Effect.runSync(Catalog.generateWorksheet(spec))

const route = (maybeSeed: Option.Option<string>) =>
  AppRoute.Worksheet({
    topicId: spec.topicId,
    level: spec.level,
    count: Option.some(spec.count),
    seed: maybeSeed,
  })

const urlFor = (seed: string) =>
  worksheetRouter({
    topicId: spec.topicId,
    level: spec.level,
    count: Option.some(spec.count),
    seed: Option.some(seed),
  })

const ready = Model.make({
  sheet: Sheet.Ready({
    spec,
    problems,
    responses: problems.map(() => ['', '', '']),
    marking: 'Unmarked',
  }),
  answerKey: 'Hidden',
  printedKey: 'Included',
})

const readySheet = (current: Model) => {
  if (current.sheet._tag !== 'Ready') {
    throw new Error(`Expected a Ready sheet, got ${current.sheet._tag}`)
  }
  return current.sheet
}

describe('init', () => {
  test('a link without a seed asks for one', () => {
    const worksheetInit = init(route(Option.none()))

    expect(worksheetInit.model.sheet).toStrictEqual(
      Sheet.AwaitingSeed({ topicId: spec.topicId, level: 2, count: 4 }),
    )
    expect(worksheetInit.commands).toHaveLength(1)
  })

  test('a link with a seed generates that worksheet', () => {
    const worksheetInit = init(route(Option.some('demo01')))

    expect(worksheetInit.model.sheet).toStrictEqual(Sheet.Generating({ spec }))
    expect(worksheetInit.commands).toHaveLength(1)
  })

  test('an unknown topic is reported instead of generated', () => {
    const worksheetInit = init(
      AppRoute.Worksheet({
        topicId: 'nope',
        level: 1,
        count: Option.none(),
        seed: Option.none(),
      }),
    )

    expect(worksheetInit.model.sheet).toStrictEqual(
      Sheet.UnknownTopic({ topicId: 'nope' }),
    )
    expect(worksheetInit.commands).toBeUndefined()
  })

  test('out-of-range levels and counts are clamped', () => {
    const worksheetInit = init(
      AppRoute.Worksheet({
        topicId: spec.topicId,
        level: 99,
        count: Option.some(1000),
        seed: Option.some('abc'),
      }),
    )

    expect(worksheetInit.model.sheet).toStrictEqual(
      Sheet.Generating({
        spec: {
          topicId: spec.topicId,
          level: 4,
          count: Catalog.MAX_QUESTIONS,
          seed: 'abc',
        },
      }),
    )
  })
})

describe('update', () => {
  test('the first seed replaces the seedless URL', () => {
    story(
      update,
      given(initialModel),
      message(Message.ChangedRoute({ route: route(Option.none()) })),
      Command.resolve(
        GenerateSeed,
        Message.CompletedGenerateSeed({ seed: 'abc123' }),
      ),
      Command.expectHas(ReplaceWorksheetUrl({ url: urlFor('abc123') })),
      Command.resolve(
        ReplaceWorksheetUrl,
        Message.CompletedReplaceWorksheetUrl(),
      ),
    )
  })

  test('a seeded route generates and then shows its questions', () => {
    story(
      update,
      given(initialModel),
      message(Message.ChangedRoute({ route: route(Option.some('demo01')) })),
      Command.expectHas(GenerateWorksheet({ spec })),
      Command.resolve(
        GenerateWorksheet,
        Message.CompletedGenerateWorksheet({ spec, problems }),
      ),
      model(current => {
        const sheet = readySheet(current)
        expect(sheet.problems).toHaveLength(4)
        expect(sheet.responses).toStrictEqual(problems.map(() => ['', '', '']))
      }),
    )
  })

  test('a result for a worksheet that is no longer wanted is dropped', () => {
    story(
      update,
      given(ready),
      message(
        Message.CompletedGenerateWorksheet({
          spec: { ...spec, seed: 'stale' },
          problems: [],
        }),
      ),
      model(current => {
        expect(readySheet(current).problems).toHaveLength(4)
      }),
    )
  })

  test('New questions pushes a URL with a fresh seed', () => {
    story(
      update,
      given(ready),
      message(Message.ClickedNewQuestions()),
      Command.resolve(
        GenerateSeed,
        Message.CompletedGenerateSeed({ seed: 'next01' }),
      ),
      Command.expectHas(PushWorksheetUrl({ url: urlFor('next01') })),
      Command.resolve(PushWorksheetUrl, Message.CompletedPushWorksheetUrl()),
    )
  })

  test('answers are masked as they are typed', () => {
    story(
      update,
      given(ready),
      message(Message.UpdatedAnswer({ question: 1, part: 2, value: '2x8/' })),
      model(current => {
        expect(readySheet(current).responses[1]).toStrictEqual(['', '', '28'])
      }),
    )
  })

  test('editing an answer after marking clears the marks', () => {
    story(
      update,
      given(ready),
      message(Message.ClickedCheckAnswers()),
      model(current => {
        expect(readySheet(current).marking).toBe('Marked')
      }),
      message(Message.UpdatedAnswer({ question: 0, part: 1, value: '1' })),
      model(current => {
        expect(readySheet(current).marking).toBe('Unmarked')
      }),
    )
  })

  test('Clear answers empties every box', () => {
    story(
      update,
      given(ready),
      message(Message.UpdatedAnswer({ question: 0, part: 1, value: '19' })),
      message(Message.ClickedClearAnswers()),
      model(current => {
        expect(readySheet(current).responses).toStrictEqual(
          problems.map(() => ['', '', '']),
        )
      }),
    )
  })

  test('Enter in the last box marks the sheet', () => {
    story(
      update,
      given(ready),
      message(Message.PressedEnterInAnswer({ question: 3, part: 2 })),
      model(current => {
        expect(readySheet(current).marking).toBe('Marked')
      }),
    )
  })
})
