import { Array, Option } from 'effect'
import type { Html, HtmlBuilder } from 'foldkit/html'

import { Problem } from '../core'

/** A numerator stacked over a denominator, the way a fraction is handwritten.
 *  Takes ready-made halves so answer boxes can sit in the same layout. */
export const stackedView = <Message>(
  numerator: Html | string,
  denominator: Html | string,
  h: HtmlBuilder<Message>,
): Html =>
  h.span(
    [h.Class('inline-flex flex-col items-center gap-0.5 leading-tight')],
    [
      h.span([h.Class('px-1')], [numerator]),
      h.span([h.Class('self-stretch border-t-2 border-current')]),
      h.span([h.Class('px-1')], [denominator]),
    ],
  )

const fractionLabel = (
  maybeWhole: Option.Option<number>,
  n: number,
  d: number,
): string =>
  Option.match(maybeWhole, {
    onNone: () => `${n} over ${d}`,
    onSome: whole => `${whole} and ${n} over ${d}`,
  })

export const tokenView = <Message>(
  token: Problem.Token,
  h: HtmlBuilder<Message>,
): Html =>
  Problem.Token.match<Html>(token, {
    Num: ({ text }) => h.span([], [text]),
    Op: ({ symbol }) => h.span([h.Class('text-muted')], [symbol]),
    Blank: () =>
      h.span([
        h.Class(
          'inline-block size-8 rounded-full border-2 border-accent bg-white',
        ),
      ]),
    Frac: ({ maybeWhole, n, d }) =>
      h.span(
        [
          h.Class('inline-flex items-center gap-1'),
          h.Role('img'),
          h.AriaLabel(fractionLabel(maybeWhole, n, d)),
        ],
        [
          Option.match(maybeWhole, {
            onNone: () => h.empty,
            onSome: whole => h.span([], [`${whole}`]),
          }),
          stackedView(`${n}`, `${d}`, h),
        ],
      ),
  })

/** NOTE: tokens are not keyed. A question's tokens never reorder, and they have
 *  no identity beyond their position. */
export const tokensView = <Message>(
  tokens: ReadonlyArray<Problem.Token>,
  h: HtmlBuilder<Message>,
): ReadonlyArray<Html> => Array.map(tokens, token => tokenView(token, h))

type IconName = 'check' | 'cross' | 'alert' | 'print' | 'refresh' | 'search'

const ICON_PATHS: Readonly<Record<IconName, string>> = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  cross: 'M6 6l12 12M18 6L6 18',
  alert: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7.5V13M12 16.5v.01',
  print: 'M7 8V3h10v5M7 17H4v-7h16v7h-3M7 14h10v7H7z',
  refresh: 'M20 11a8 8 0 10-2.3 5.7M20 5v6h-6',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-3.5-3.5',
}

export const iconView = <Message>(
  name: IconName,
  h: HtmlBuilder<Message>,
): Html =>
  h.svg(
    [
      h.Class('size-[1.1em] shrink-0'),
      h.ViewBox('0 0 24 24'),
      h.Fill('none'),
      h.Stroke('currentColor'),
      h.StrokeWidth('2.4'),
      h.Attribute('stroke-linecap', 'round'),
      h.Attribute('stroke-linejoin', 'round'),
      h.AriaHidden(true),
    ],
    [h.path([h.D(ICON_PATHS[name])])],
  )
