'use strict'

const axios = require('axios')
const config = require('./config')

module.exports = {
  healthcheck,
  getArticles,
  getArticlesById
}

function healthcheck (req, res) {
  res.send({data: 'OK'})
}

/**
 * For get articles all
 */
async function getArticles (req, res) {
  const response = await getData('search', checkQuery(req.query))
  res.send(response.data)
}

/**
 * For get articles by Id
 */
async function getArticlesById (req, res) {
  const idPath = req.query.id
  const response = await getData(idPath)
  res.send(response.data)
}

/**
 * For filter only query string that allow to use
 * @param Object query
 */
function checkQuery (query) {
  const arrQuert = ['q', 'order-by', 'page']
  const filters = {}
  for (const key in query) {
    if (arrQuert.indexOf(key) !== -1) {
      filters[key] = query[key]
    }
  }
  return filters
}

/**
 * For fetch data from 3rd party (Guardian)
 * @param String path
 * @param Object filters
 */
function getData (path, filters = {}) {
  return axios({
    url: `${config.guardianUrl}/${path}`,
    method: 'GET',
    params: {
      'api-key': config.guardianKey,
      format: 'json',
      ...filters
    }
  })
}
