import { Effect } from 'effect'
import {
  click,
  expect,
  given,
  label,
  role,
  scene,
  text,
  type,
} from 'foldkit/scene'
import { describe, test } from 'vitest'

import { Catalog, Rational } from '../core'
import { Model, Sheet, update, view } from './worksheet'

const spec: Catalog.WorksheetSpec = {
  topicId: 'fraction-add',
  level: 2,
  count: 4,
  seed: 'demo01',
}

const problems = Effect.runSync(Catalog.generateWorksheet(spec))

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

const answerAt = (question: number): Rational.Rational => {
  const answer = problems[question]?.answer
  if (answer?._tag !== 'Fraction') {
    throw new Error(
      `Expected question ${question + 1} to have a fraction answer`,
    )
  }
  return Rational.reduce(Rational.make(answer.n, answer.d))
}

const first = answerAt(0)
const second = answerAt(1)

describe('worksheet', () => {
  test('shows the topic, its level and one set of boxes per question', () => {
    scene(
      { update, view },
      given(ready),
      expect(role('heading', { name: 'Adding fractions' })).toExist(),
      expect(text('Level 2', { exact: false })).toExist(),
      expect(label('Question 1: numerator')).toExist(),
      expect(label('Question 4: denominator')).toExist(),
      expect(label('Question 5: numerator')).toBeAbsent(),
    )
  })

  test('marks a correct, an unsimplified and a wrong answer', () => {
    scene(
      { update, view },
      given(ready),
      type(label('Question 1: numerator'), `${first.n}`),
      type(label('Question 1: denominator'), `${first.d}`),
      type(label('Question 2: numerator'), `${second.n * 2}`),
      type(label('Question 2: denominator'), `${second.d * 2}`),
      type(label('Question 3: numerator'), '1'),
      type(label('Question 3: denominator'), '99'),
      click(role('button', { name: 'Check answers' })),
      expect(text('Correct')).toExist(),
      expect(text('Right value. Now simplify it.')).toExist(),
      expect(text('The answer is', { exact: false })).toExist(),
      expect(text('Not answered.', { exact: false })).toExist(),
      expect(text('Nearly right')).toExist(),
    )
  })

  test('boxes only keep digits', () => {
    scene(
      { update, view },
      given(ready),
      type(label('Question 1: numerator'), '1a9'),
      expect(label('Question 1: numerator')).toHaveValue('19'),
    )
  })

  test('the answer key can be shown and hidden', () => {
    scene(
      { update, view },
      given(ready),
      click(role('button', { name: 'Show answer key' })),
      expect(role('button', { name: 'Hide answer key' })).toExist(),
    )
  })
})
