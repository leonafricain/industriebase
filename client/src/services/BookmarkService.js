import axios from 'axios'

export default class SongService {
  getBookmark (params) {
    return axios.get('/bookmark', {
      params: params
    })
  }
  postBookmark (bookmark) {
    return axios.post('/bookmark', bookmark)
  }
  deleteBookmark (bookmarkId) {
    return axios.delete(`/bookmark/${bookmarkId}`)
  }
}
