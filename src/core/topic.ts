import type { Option } from 'effect'

import type { Generator } from './generator'
import type { Token } from './problem'

export type Level = Readonly<{
  description: string
  generate: Generator
}>

export type Topic = Readonly<{
  /** Stable identifier, used in worksheet links. */
  id: string
  group: string
  /** Sub-heading inside a large group, such as "Operations" under Fractions. */
  maybeSection: Option.Option<string>
  title: string
  /** A representative question, shown on the topic's card in the library. */
  sample: ReadonlyArray<Token>
  levels: ReadonlyArray<Level>
}>
