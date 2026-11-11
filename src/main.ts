import { Array, Effect, Match, Option, Schema, pipe } from 'effect'
import { Command, Runtime, Update } from 'foldkit'
import type { Document, Html, HtmlBuilder } from 'foldkit/html'
import { defineMessageUnion } from 'foldkit/message'
import { UrlRequest, load, pushUrl } from 'foldkit/navigation'
import { Transition } from 'foldkit/route'
import { modifyFields } from 'foldkit/struct'
import { Url, toString as urlToString } from 'foldkit/url'

import { Catalog, type Topic } from './core'
import { Worksheet } from './page'
import {
  AppRoute,
  libraryRouter,
  urlToAppRoute,
  worksheetRouter,
} from './route'
import { iconView, tokensView } from './view/math'

export { AppRoute } from './route'

// MODEL

export const Model = Schema.Struct({
  route: AppRoute,
  searchText: Schema.String,
  maybeGroup: Schema.Option(Schema.String),
  worksheetPage: Worksheet.Model,
})

export type Model = typeof Model.Type

// MESSAGE

export const Message = defineMessageUnion({
  CompletedNavigateInternal: {},
  CompletedLoadExternal: {},
  ClickedLink: { request: UrlRequest },
  ChangedUrl: { url: Url },
  UpdatedSearchText: { value: Schema.String },
  SelectedGroup: { maybeGroup: Schema.Option(Schema.String) },
  GotWorksheetMessage: { message: Worksheet.Message },
})

export type Message = typeof Message.Type

// INIT

export const init: Runtime.RoutingApplicationInit<Model, Message> = (
  url: Url,
) => {
  const route = urlToAppRoute(url)

  const worksheetInit = Match.value(route).pipe(
    Match.tag('Worksheet', worksheetRoute => Worksheet.init(worksheetRoute)),
    Match.orElse((): Worksheet.UpdateReturn => ({
      model: Worksheet.initialModel,
    })),
  )

  return Update.foldChildInit(worksheetInit, {
    toParentModel: worksheetPage => ({
      route,
      searchText: '',
      maybeGroup: Option.none(),
      worksheetPage,
    }),
    toParentMessage: message => Message.GotWorksheetMessage({ message }),
  })
}

// COMMAND

export const NavigateInternal = Command.define('NavigateInternal', {
  args: { url: Schema.String },
  messages: [Message.CompletedNavigateInternal],
  execute: ({ url }) =>
    pushUrl(url).pipe(Effect.as(Message.CompletedNavigateInternal())),
})

const LoadExternal = Command.define('LoadExternal', {
  args: { href: Schema.String },
  messages: [Message.CompletedLoadExternal],
  execute: ({ href }) =>
    load(href).pipe(Effect.as(Message.CompletedLoadExternal())),
})

// UPDATE

type UpdateReturn = Update.Return<Model, Message>
type Step = Update.Step<Model, Message>

const foldWorksheetEntry = <Input>(
  update: (
    worksheetPage: Worksheet.Model,
    input: Input,
  ) => Worksheet.UpdateReturn,
): Update.Fold<Model, Message, Input> =>
  Update.foldChild({
    update,
    read: model => Option.some(model.worksheetPage),
    write: (model, nextWorksheetPage) =>
      modifyFields(model, { worksheetPage: () => nextWorksheetPage }),
    toParentMessage: message => Message.GotWorksheetMessage({ message }),
  })

const foldWorksheet = foldWorksheetEntry(Worksheet.update)

const foldWorksheetRouteChanged = foldWorksheetEntry(
  Worksheet.informRouteChanged,
)

const setRoute =
  (nextRoute: AppRoute): Step =>
  model => ({ model: modifyFields(model, { route: () => nextRoute }) })

const keepModel: Step = model => ({ model })

export const update = (model: Model, message: Message) =>
  Message.match<UpdateReturn>(message, {
    CompletedNavigateInternal: () => ({ model }),
    CompletedLoadExternal: () => ({ model }),

    ClickedLink: ({ request }) =>
      UrlRequest.match<UpdateReturn>(request, {
        Internal: ({ url }) => ({
          model,
          commands: [NavigateInternal({ url: urlToString(url) })],
        }),
        External: ({ href }) => ({
          model,
          commands: [LoadExternal({ href })],
        }),
      }),

    ChangedUrl: ({ url }) => {
      const nextRoute = urlToAppRoute(url)

      const transition = Transition.make(model.route, nextRoute)
      const informWorksheetRoute = Transition.matchOrElse<Step>()(
        transition,
        'Worksheet',
        {
          Entered: worksheetRoute => foldWorksheetRouteChanged(worksheetRoute),
          Stayed: ({ nextRoute: stayedRoute }) =>
            foldWorksheetRouteChanged(stayedRoute),
        },
        () => keepModel,
      )

      return Update.combine(model, [setRoute(nextRoute), informWorksheetRoute])
    },

    UpdatedSearchText: ({ value }) => ({
      model: modifyFields(model, { searchText: () => value }),
    }),

    SelectedGroup: ({ maybeGroup }) => ({
      model: modifyFields(model, { maybeGroup: () => maybeGroup }),
    }),

    GotWorksheetMessage: ({ message: worksheetMessage }) =>
      foldWorksheet(model, worksheetMessage),
  })

// VIEW

const logoView = (h: HtmlBuilder<Message>): Html =>
  h.a(
    [
      h.Href(libraryRouter()),
      h.Class('flex min-h-11 items-center gap-2.5 text-ink'),
    ],
    [
      h.span(
        [
          h.AriaHidden(true),
          h.Class(
            'flex size-8 items-center justify-center rounded-lg bg-accent font-display text-lg font-bold text-white',
          ),
        ],
        ['÷'],
      ),
      h.span(
        [h.Class('font-display text-lg font-bold')],
        ['Math Exercise Generator'],
      ),
    ],
  )

const searchView = (searchText: string, h: HtmlBuilder<Message>): Html =>
  h.search(
    [
      h.Class(
        'ml-auto flex h-11 max-w-[480px] flex-[1_1_280px] items-center gap-2 rounded-[10px] border border-edge bg-ground px-3 text-muted focus-within:border-accent',
      ),
    ],
    [
      iconView('search', h),
      h.label([h.For('topic-search'), h.Class('sr-only')], ['Search topics']),
      h.input([
        h.Id('topic-search'),
        h.Type('search'),
        h.Value(searchText),
        h.Placeholder('Search topics, e.g. mixed numbers'),
        h.Autocomplete('off'),
        h.OnInput(value => Message.UpdatedSearchText({ value })),
        h.Class('min-w-0 flex-1 bg-transparent text-ink outline-none'),
      ]),
    ],
  )

const headerView = (model: Model, h: HtmlBuilder<Message>): Html =>
  h.header(
    [h.Class('border-b border-line bg-white print:hidden')],
    [
      h.div(
        [
          h.Class(
            'mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-8',
          ),
        ],
        [
          logoView(h),
          model.route._tag === 'Library'
            ? searchView(model.searchText, h)
            : h.empty,
        ],
      ),
    ],
  )

const firstLevelUrl = (topic: Topic): string =>
  worksheetRouter({
    topicId: topic.id,
    level: 1,
    count: Option.none(),
    seed: Option.none(),
  })

const samplePreviewView = (topic: Topic, h: HtmlBuilder<Message>): Html => {
  const isSingleValue = topic.sample.length === 1

  return h.div(
    [
      h.AriaHidden(true),
      h.Class(
        'graph-paper flex h-[104px] items-center justify-center gap-2.5 border-b border-line font-display text-2xl font-medium',
      ),
    ],
    [
      ...tokensView(topic.sample, h),
      isSingleValue ? h.span([h.Class('text-muted')], ['=']) : h.empty,
      isSingleValue
        ? h.span([
            h.Class(
              'inline-block h-8 w-9 rounded-md border-2 border-accent bg-white',
            ),
          ])
        : h.empty,
    ],
  )
}

const topicCardView = (topic: Topic, h: HtmlBuilder<Message>): Html =>
  h.keyed('li')(
    topic.id,
    [h.Class('flex')],
    [
      h.a(
        [
          h.Href(firstLevelUrl(topic)),
          h.Class(
            'flex flex-1 flex-col overflow-hidden rounded-[14px] border border-line bg-white text-ink hover:border-accent',
          ),
        ],
        [
          samplePreviewView(topic, h),
          h.div(
            [h.Class('flex flex-col gap-2.5 px-4 pt-3.5 pb-4')],
            [
              h.span([h.Class('font-semibold')], [topic.title]),
              h.span(
                [
                  h.Class(
                    'flex items-center justify-between gap-2 text-[13px] text-muted',
                  ),
                ],
                [
                  `${topic.levels.length} levels`,
                  h.span(
                    [h.AriaHidden(true), h.Class('inline-flex gap-1')],
                    Array.makeBy(topic.levels.length, index => index + 1).map(
                      level =>
                        h.keyed('span')(`level-${level}`, [
                          h.Class('h-1.5 w-3.5 rounded-full bg-accent'),
                        ]),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  )

const sectionView = (
  group: Catalog.Group,
  section: Catalog.Section,
  h: HtmlBuilder<Message>,
): Html =>
  h.keyed('div')(
    `${group.title}/${Option.getOrElse(section.maybeTitle, () => '')}`,
    [h.Class('flex flex-col gap-3')],
    [
      Option.match(section.maybeTitle, {
        onNone: () => h.empty,
        onSome: sectionTitle =>
          h.h3(
            [
              h.Class(
                'text-xs font-semibold tracking-widest text-muted uppercase',
              ),
            ],
            [sectionTitle],
          ),
      }),
      h.ul(
        [h.Class('grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4')],
        Array.map(section.topics, topic => topicCardView(topic, h)),
      ),
    ],
  )

const groupView = (group: Catalog.Group, h: HtmlBuilder<Message>): Html =>
  h.keyed('section')(
    group.title,
    [h.Class('flex flex-col gap-5')],
    [
      h.div(
        [h.Class('flex items-baseline gap-3 border-b-2 border-ink pb-2.5')],
        [
          h.h2([h.Class('font-display text-[22px] font-bold')], [group.title]),
          h.span(
            [h.Class('text-muted')],
            [
              `${group.topicCount} ${group.topicCount === 1 ? 'topic' : 'topics'}`,
            ],
          ),
        ],
      ),
      ...Array.map(group.sections, section => sectionView(group, section, h)),
    ],
  )

const groupFilterView = (
  label: string,
  count: number,
  maybeGroup: Option.Option<string>,
  isSelected: boolean,
  h: HtmlBuilder<Message>,
): Html =>
  h.keyed('button')(
    Option.getOrElse(maybeGroup, () => 'all-topics'),
    [
      h.Type('button'),
      h.AriaPressed(isSelected ? 'true' : 'false'),
      h.OnClick(Message.SelectedGroup({ maybeGroup })),
      h.Class(
        `flex min-h-11 items-center justify-between gap-4 rounded-[10px] px-3 text-left cursor-pointer ${isSelected ? 'bg-accent font-semibold text-white' : 'font-medium text-ink hover:bg-white'}`,
      ),
    ],
    [
      h.span([], [label]),
      h.span([h.Class(isSelected ? '' : 'text-muted')], [`${count}`]),
    ],
  )

const categoriesView = (model: Model, h: HtmlBuilder<Message>): Html =>
  h.nav(
    [
      h.AriaLabel('Categories'),
      h.Class('flex max-w-full flex-[1_1_220px] flex-col gap-1'),
    ],
    [
      h.p(
        [
          h.Class(
            'mb-2 text-xs font-semibold tracking-widest text-muted uppercase',
          ),
        ],
        ['Categories'],
      ),
      groupFilterView(
        'All topics',
        Catalog.topics.length,
        Option.none(),
        Option.isNone(model.maybeGroup),
        h,
      ),
      ...pipe(
        Catalog.groupTopics(Catalog.topics),
        Array.map(group =>
          groupFilterView(
            group.title,
            group.topicCount,
            Option.some(group.title),
            Option.contains(model.maybeGroup, group.title),
            h,
          ),
        ),
      ),
    ],
  )

const visibleGroups = (model: Model): ReadonlyArray<Catalog.Group> =>
  pipe(
    Catalog.searchTopics(model.searchText),
    Array.filter(topic =>
      Option.match(model.maybeGroup, {
        onNone: () => true,
        onSome: group => topic.group === group,
      }),
    ),
    Catalog.groupTopics,
  )

const libraryView = (model: Model, h: HtmlBuilder<Message>): Html =>
  h.div(
    [
      h.Class(
        'mx-auto flex max-w-[1280px] flex-wrap items-start gap-8 px-4 py-6 sm:px-8 sm:py-8',
      ),
    ],
    [
      categoriesView(model, h),
      h.main(
        [h.Class('flex min-w-0 flex-[999_1_560px] flex-col gap-9')],
        [
          h.div(
            [h.Class('flex flex-col gap-2')],
            [
              h.h1(
                [h.Class('font-display text-[34px] leading-tight font-bold')],
                ['Pick what to practise'],
              ),
              h.p(
                [h.Class('max-w-[620px] text-base text-muted')],
                [
                  'Every topic has levels from first steps to stretch. Choose one to print a worksheet or to answer on screen and have it marked.',
                ],
              ),
            ],
          ),
          ...Array.match(visibleGroups(model), {
            onEmpty: () => [
              h.p(
                [h.Class('text-muted'), h.AriaLive('polite')],
                [`No topics match “${model.searchText.trim()}”.`],
              ),
            ],
            onNonEmpty: groups =>
              Array.map(groups, group => groupView(group, h)),
          }),
        ],
      ),
    ],
  )

const notFoundView = (path: string, h: HtmlBuilder<Message>): Html =>
  h.main(
    [h.Class('mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-8 sm:px-8')],
    [
      h.h1([h.Class('font-display text-[34px] font-bold')], ['Page not found']),
      h.p([h.Class('text-muted')], [`Nothing lives at “${path}”.`]),
      h.a(
        [
          h.Href(libraryRouter()),
          h.Class('font-medium text-accent hover:underline'),
        ],
        ['Back to all topics'],
      ),
    ],
  )

const APP_NAME = 'Math Exercise Generator'

const routeTitle = (model: Model): string =>
  AppRoute.match<string>(model.route, {
    Library: () => APP_NAME,
    Worksheet: () =>
      Option.match(Worksheet.title(model.worksheetPage), {
        onNone: () => APP_NAME,
        onSome: topicTitle => `${topicTitle} | ${APP_NAME}`,
      }),
    NotFound: () => `Page not found | ${APP_NAME}`,
  })

export const view = (model: Model, h: HtmlBuilder<Message>): Document => {
  const routeContent = AppRoute.match(model.route, {
    Library: () => libraryView(model, h),
    Worksheet: () =>
      h.main(
        [],
        [
          h.submodel({
            slotId: 'worksheet',
            model: model.worksheetPage,
            view: Worksheet.view,
            toParentMessage: message =>
              Message.GotWorksheetMessage({ message }),
          }),
        ],
      ),
    NotFound: ({ path }) => notFoundView(path, h),
  })

  return {
    title: routeTitle(model),
    body: h.div(
      [h.Class('min-h-screen bg-ground text-[15px] print:bg-white')],
      [headerView(model, h), routeContent],
    ),
  }
}
