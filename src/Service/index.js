import axios from 'axios'
export const getItem = async (filters = {}) => {
  const response = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/api/articles`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    },
    params: filters,
    withCredentials: false
  })
  return response.data.response.results
}

export const getItemById = async (id) => {
  const response = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/api/articles/item`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    },
    params: { id },
    withCredentials: false
  })

  return response.data.response.content
}
