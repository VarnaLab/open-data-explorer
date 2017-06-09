
var app = {}

app.components = {}

app.files = ['articles', 'events', 'group', 'page']

app.sources = {
  articles: {
    tab: 'Статии',
    title: 'Статии публикувани във varnalab.org',
    active: true
  },
  events: {
    tab: 'Събития',
    title: 'Събития публикувани във varnalab.org'
  },
  group: {
    tab: 'FB Група',
    title: 'Събития публикувани във Facebook групата'
  },
  page: {
    tab: 'FB Страница',
    title: 'Събития публикувани на Facebook страницата'
  }
}

app.get = (file) => {
  if (!app.sources[file].data) {
    m.request({
      url: 'https://raw.githubusercontent.com/varnalab/varnalab-data/master/dump/'
        + file + '.json'
    })
    .then((data) => {
      app.sources[file].data = data
    })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  m.route(document.querySelector('body'), '/articles', {
    '/articles': {
      onmatch: () => {
        app.files.forEach((file) => app.sources[file].active = false)
        app.sources.articles.active = true
        app.get('articles')
      },
      render: () =>
        m(app.components.layout, {
          sources: Object.keys(app.sources)
            .map((key) => (app.sources[key].id = key, app.sources[key]))
        },
          m(app.components.articles, {
            sources: app.sources,
            articles: (app.sources.articles.data || [])
              .map((article) =>
                (article.date = new Date(article.created.$date), article))
              .sort((a, b) => (b.date - a.date))
          }))
    },
    '/events': {
      onmatch: () => {
        app.files.forEach((file) => app.sources[file].active = false)
        app.sources.events.active = true
        app.get('events')
      },
      render: () =>
        m(app.components.layout, {
          sources: Object.keys(app.sources).map((key) => app.sources[key])
        },
          m(app.components.events, {
            sources: app.sources,
            events: (app.sources.events.data || [])
              .map((event) =>
                (event.date = new Date(event.startDateTime.$date), event))
              .sort((a, b) => (b.date - a.date))
          }))
    },
    '/group': {
      onmatch: () => {
        app.files.forEach((file) => app.sources[file].active = false)
        app.sources.group.active = true
        app.get('group')
      },
      render: () =>
        m(app.components.layout, {
          sources: Object.keys(app.sources).map((key) => app.sources[key])
        },
          m(app.components.group, {
            sources: app.sources,
            group: (app.sources.group.data || [])
              .map((event) =>
                (event.date = new Date(event.start_time), event))
              .sort((a, b) => (b.date - a.date))
          }))
    },
    '/page': {
      onmatch: () => {
        app.files.forEach((file) => app.sources[file].active = false)
        app.sources.page.active = true
        app.get('page')
      },
      render: () =>
        m(app.components.layout, {
          sources: Object.keys(app.sources).map((key) => app.sources[key])
        },
          m(app.components.page, {
            sources: app.sources,
            page: (app.sources.page.data || [])
              .map((event) =>
                (event.date = new Date(event.start_time), event))
              .sort((a, b) => (b.date - a.date))
          }))
    }
  })
})
