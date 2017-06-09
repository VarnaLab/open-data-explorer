
app.components.articles = {
  view: (vnode) => [
    m('h2', vnode.attrs.sources.articles.title),
    vnode.attrs.articles.map((article) =>
      m('.column',
        m('.card',
          // m('.card-image',
          //   m('img.img-responsive', {src: ''})
          // ),
          m('.card-header',
            m('h4.card-title', article.title),
            m('h6.card-subtitle', article.originalAuthor,
              article.date.toLocaleDateString('bg')
            )
          ),
          m('.card-body', m.trust(article.content)),
          m('.card-footer',
            m('a.btn btn-primary [target=_blank]', {
              href: 'https://varnalab.org/blogs'
                + '/' + article.date.getFullYear()
                + '/' + (article.date.getMonth() + 1)
                + '/' + article.date.getDate()
                + '/' + article.slug
              }, 'URL')
          )
        )
      )
    )
  ]
}
