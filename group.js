
app.components.group = {
  view: (vnode) => [
    m('h2', vnode.attrs.sources.group.title),
    vnode.attrs.group.map((event) =>
      m('.column',
        m('.card',
          m('.card-image',
            m('img.img-responsive', {src: event.cover && event.cover.source})
          ),
          m('.card-header',
            m('h4.card-title', event.name),
            m('h6.card-subtitle', event.owner.name + ' / ' +
              event.date.toLocaleDateString('bg')
            )
          ),
          m('.card-body', m.trust(event.description)),
          m('.card-footer',
            m('a.btn btn-primary [target=_blank]', {
              href: 'https://www.facebook.com/events/' + event.id
              }, 'URL')
          )
        )
      )
    )
  ]
}
