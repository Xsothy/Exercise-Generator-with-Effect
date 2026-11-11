import { Schema, pipe } from 'effect'
import { Route } from 'foldkit'
import { defineRouteUnion, int, literal, slash, string } from 'foldkit/route'

export const AppRoute = defineRouteUnion({
  Library: {},
  Worksheet: {
    topicId: Schema.String,
    level: Schema.Number,
    count: Schema.Option(Schema.Number),
    seed: Schema.Option(Schema.String),
  },
  NotFound: { path: Schema.String },
})

export type AppRoute = typeof AppRoute.Type
export type WorksheetRoute = typeof AppRoute.Worksheet.Type

export const libraryRouter = pipe(Route.root, Route.mapTo(AppRoute.Library))

export const worksheetRouter = pipe(
  literal('topic'),
  slash(string('topicId')),
  slash(int('level')),
  Route.query(
    Schema.Struct({
      count: Schema.OptionFromOptional(Schema.FiniteFromString),
      seed: Schema.OptionFromOptional(Schema.String),
    }),
  ),
  Route.mapTo(AppRoute.Worksheet),
)

const routeParser = Route.oneOf(worksheetRouter, libraryRouter)

export const urlToAppRoute = Route.parseUrlWithFallback(
  routeParser,
  AppRoute.NotFound,
)
