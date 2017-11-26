export const api = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getPostDetail = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getCommentsByPostId = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getCommentDetail = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
  .then(res => res.json())
  .then(data => console.log(data))
