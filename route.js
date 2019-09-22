const controller = require('./libs/controller')

module.exports = app => {
  app.get('/', controller.healthcheck)
  app.get('/api/articles', controller.getArticles)
  app.get('/api/articles/item', controller.getArticlesById)
}
