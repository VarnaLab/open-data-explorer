
app.components.events = {
  view: (vnode) => [
    m('h2', vnode.attrs.sources.events.title),
    vnode.attrs.events.map((event) =>
      m('.column',
        m('.card',
          // m('.card-image',
          //   m('img.img-responsive', {src: ''})
          // ),
          m('.card-header',
            m('h4.card-title', event.title),
            m('h6.card-subtitle',
              event.date.toLocaleDateString('bg')
            )
          ),
          m('.card-body', m.trust(event.description)),
          m('.card-footer',
            m('a.btn btn-primary [target=_blank]', {
              href: 'https://varnalab.org/events'
                + '/' + event.date.getFullYear()
                + '/' + (event.date.getMonth() + 1)
                + '/' + event.date.getDate()
                + '/' + event.title
              }, 'URL')
          )
        )
      )
    )
  ]
}
