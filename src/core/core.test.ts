import { Array, Effect } from 'effect'
import { describe, expect, test } from 'vitest'

import { Catalog, Check, Entry, Problem, Rational } from '.'

const worksheet = (
  topicId: string,
  level: number,
  count: number,
  seed: string,
): ReadonlyArray<Problem.Problem> =>
  Effect.runSync(Catalog.generateWorksheet({ topicId, level, count, seed }))

const fraction = (
  n: number,
  d: number,
  form: Problem.FractionForm,
): Problem.Answer => Problem.fractionAnswer(Rational.make(n, d), form)

const tag = (answer: Problem.Answer, input: string) =>
  Check.check(answer, input)._tag

describe('Catalog', () => {
  describe.each(
    Catalog.topics.flatMap(topic =>
      topic.levels.map((_, index) => ({ id: topic.id, level: index + 1 })),
    ),
  )('$id level $level', ({ id, level }) => {
    test('makes 30 unique questions whose model answers pass the checker', () => {
      const problems = worksheet(id, level, 30, 'test')

      expect(problems).toHaveLength(30)
      expect(new Set(problems.map(Problem.questionText)).size).toBe(30)
      problems.forEach(problem => {
        const answer = Problem.answerText(problem.answer)
        expect(
          Check.check(problem.answer, answer)._tag,
          `${Problem.questionText(problem)} = ${answer}`,
        ).toBe('Correct')
      })
    })

    test('is reproducible from its seed', () => {
      expect(worksheet(id, level, 30, 'test')).toStrictEqual(
        worksheet(id, level, 30, 'test'),
      )
      expect(worksheet(id, level, 30, 'other')).not.toStrictEqual(
        worksheet(id, level, 30, 'test'),
      )
    })
  })

  test('keeps arithmetic honest', () => {
    const evaluate: Readonly<Record<string, (a: number, b: number) => number>> =
      {
        '+': (a, b) => a + b,
        '−': (a, b) => a - b,
        '×': (a, b) => a * b,
      }

    const cases = ['add', 'subtract', 'multiply'].flatMap(topicId =>
      Array.makeBy(5, index => worksheet(topicId, index + 1, 20, 'math')),
    )

    cases.flat().forEach(problem => {
      const [a = '', symbol = '', b = ''] = problem.tokens.map(
        Problem.tokenText,
      )
      const operation = evaluate[symbol]
      expect(operation).toBeDefined()
      expect(Number(Problem.answerText(problem.answer))).toBeCloseTo(
        operation?.(Number(a), Number(b)) ?? Number.NaN,
        6,
      )
    })
  })

  test('returns nothing for a topic or level that does not exist', () => {
    expect(worksheet('nope', 1, 10, 'x')).toStrictEqual([])
    expect(worksheet('add', 99, 10, 'x')).toStrictEqual([])
  })

  test('clamps counts and seeds from hand-edited links', () => {
    expect(Catalog.clampCount(1000)).toBe(Catalog.MAX_QUESTIONS)
    expect(Catalog.clampCount(-3)).toBe(1)
    expect(Catalog.clampCount(Number.NaN)).toBe(1)
    expect(Catalog.sanitizeSeed('ab<c>1 2!')).toBe('abc12')
  })

  test('groups topics by group and then by section, in catalog order', () => {
    const groups = Catalog.groupTopics(Catalog.topics)

    expect(groups.map(group => [group.title, group.topicCount])).toStrictEqual([
      ['Arithmetic', 4],
      ['Fractions', 8],
    ])
    expect(groups[1]?.sections.map(section => section.topics.length)).toEqual([
      4, 3, 1,
    ])
  })

  test('searches titles, groups and sections', () => {
    expect(Catalog.searchTopics('mixed').map(topic => topic.id)).toStrictEqual([
      'fraction-to-mixed',
      'fraction-to-improper',
    ])
    expect(Catalog.searchTopics('  ARITHMETIC ')).toHaveLength(4)
    expect(Catalog.searchTopics('converting')).toHaveLength(3)
    expect(Catalog.searchTopics('zzz')).toHaveLength(0)
  })
})

describe('Check', () => {
  test('treats blank input as unanswered', () => {
    expect(tag(Problem.Answer.Decimal({ value: '7' }), '   ')).toBe('Empty')
  })

  test('marks decimals regardless of formatting', () => {
    const answer = Problem.Answer.Decimal({ value: '1234.5' })

    expect(tag(answer, '1234.5')).toBe('Correct')
    expect(tag(answer, ' 1,234.50 ')).toBe('Correct')
    expect(tag(answer, '1234.6')).toBe('Incorrect')
    expect(tag(answer, 'twelve')).toBe('Invalid')
    expect(tag(Problem.Answer.Decimal({ value: '0.5' }), '.5')).toBe('Correct')
  })

  test('marks quotients with remainders', () => {
    const answer = Problem.Answer.Remainder({ quotient: 5, remainder: 4 })
    const exact = Problem.Answer.Remainder({ quotient: 49, remainder: 0 })

    expect(tag(answer, '5 R4')).toBe('Correct')
    expect(tag(answer, '5r 4')).toBe('Correct')
    expect(tag(answer, '5')).toBe('Incorrect')
    expect(tag(answer, '4 R5')).toBe('Incorrect')
    expect(tag(answer, ' R4')).toBe('Invalid')
    expect(tag(exact, '49')).toBe('Correct')
    expect(tag(exact, '49 R0')).toBe('Correct')
  })

  test('accepts mixed or improper answers in simplest form', () => {
    const answer = fraction(17, 12, 'simplest')

    expect(tag(answer, '17/12')).toBe('Correct')
    expect(tag(answer, '1 5/12')).toBe('Correct')
    expect(tag(answer, '34/24')).toBe('Almost')
    expect(tag(answer, '1 10/24')).toBe('Almost')
    expect(tag(answer, '0 17/12')).toBe('Almost')
    expect(tag(answer, '5/12')).toBe('Incorrect')
    expect(tag(answer, '1/0')).toBe('Invalid')
    expect(tag(answer, '17/')).toBe('Invalid')
    expect(tag(fraction(4, 2, 'simplest'), '2')).toBe('Correct')
    expect(tag(fraction(4, 2, 'simplest'), '4/2')).toBe('Almost')
  })

  test('insists on the requested form for conversions', () => {
    expect(tag(fraction(7, 4, 'mixed'), '1 3/4')).toBe('Correct')
    expect(tag(fraction(7, 4, 'mixed'), '7/4')).toBe('Almost')
    expect(tag(fraction(7, 4, 'improper'), '7/4')).toBe('Correct')
    expect(tag(fraction(7, 4, 'improper'), '1 3/4')).toBe('Almost')
    expect(tag(fraction(7, 4, 'improper'), '14/8')).toBe('Almost')
  })

  test('marks comparisons', () => {
    const answer = Problem.Answer.Comparison({ value: '<' })

    expect(tag(answer, '<')).toBe('Correct')
    expect(tag(answer, '>')).toBe('Incorrect')
  })
})

describe('Problem', () => {
  test('formats decimals exactly', () => {
    expect(Problem.formatDecimal(123456, 4)).toBe('12.3456')
    expect(Problem.formatDecimal(1230, 2)).toBe('12.3')
    expect(Problem.formatDecimal(5, 3)).toBe('0.005')
    expect(Problem.formatDecimal(2000, 3)).toBe('2')
  })

  test('shows improper answers alongside their mixed form', () => {
    expect(
      Problem.answerTokens(fraction(34, 24, 'simplest')).map(Problem.tokenText),
    ).toStrictEqual(['17/12', '=', '1 5/12'])
    expect(
      Problem.answerTokens(fraction(6, 3, 'mixed')).map(Problem.tokenText),
    ).toStrictEqual(['2'])
  })
})

describe('Entry', () => {
  const fieldsOf = (topicId: string, level: number) =>
    worksheet(topicId, level, 1, 'boxes').map(Entry.fields)

  test('chooses boxes that match the shape of the answer', () => {
    expect(fieldsOf('add', 1)).toStrictEqual([['value']])
    expect(fieldsOf('divide', 2)).toStrictEqual([['quotient', 'remainder']])
    expect(fieldsOf('fraction-add', 2)).toStrictEqual([
      ['whole', 'numerator', 'denominator'],
    ])
    expect(fieldsOf('fraction-to-mixed', 1)).toStrictEqual([
      ['whole', 'numerator', 'denominator'],
    ])
    expect(fieldsOf('fraction-simplify', 1)).toStrictEqual([
      ['numerator', 'denominator'],
    ])
    expect(fieldsOf('fraction-to-improper', 1)).toStrictEqual([
      ['numerator', 'denominator'],
    ])
    expect(fieldsOf('fraction-compare', 1)).toStrictEqual([['sign']])
  })

  test('only lets valid characters into a box', () => {
    expect(Entry.mask('numerator', '1a2/ 3')).toBe('123')
    expect(Entry.mask('value', '1,234.5x.6')).toBe('1,234.56')
    expect(Entry.mask('value', '-12')).toBe('12')
  })

  test('joins boxes into an answer', () => {
    const mixed: ReadonlyArray<Entry.Field> = [
      'whole',
      'numerator',
      'denominator',
    ]

    expect(Entry.compose(mixed, ['1', '3', '4'])).toBe('1 3/4')
    expect(Entry.compose(mixed, ['', '3', '4'])).toBe('3/4')
    expect(Entry.compose(mixed, ['2', '', ''])).toBe('2')
    expect(Entry.compose(mixed, ['', '', ''])).toBe('')
    expect(Entry.compose(mixed, ['', '3', ''])).toBe('3/')
    expect(Entry.compose(['quotient', 'remainder'], ['5', '4'])).toBe('5 R4')
    expect(Entry.compose(['quotient', 'remainder'], ['5', ''])).toBe('5')
    expect(Entry.compose(['value'], [' 42 '])).toBe('42')
  })
})
