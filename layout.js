
app.components.layout = {
  view: (vnode) => [
    m('.container e-header',
      m('.column col-12',
        m('header.navbar',
          m('section',
            m('a.navbar-brand mr-10', 'VarnaLab Open Data Explorer')
          )
        )
      )
    ),
    m('.container e-content',
      m('.column',
        m('ul.tab tab-block', vnode.attrs.sources.map((source) =>
          m('li.tab-item', {class: source.active ? 'active' : null},
            m('a', {
              class: source.active ? 'active' : null,
              href: '/' + source.id,
              oncreate: m.route.link
            }, source.tab)
          )
        ))
      ),
      m('.column', vnode.children)
    )
  ]
}
