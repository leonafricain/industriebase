import axios from 'axios'

export default class SongService {
  getAllSongs (search) {
    return axios.get('/songs', {
      params: {
        search: search
      }
    })
  }
  createSong (song) {
    return axios.post('/songs', song)
  }
  getOneSong (songId) {
    return axios.get(`/songs/${songId}`)
  }
  updateSong (song) {
    return axios.put(`/songs/${song._id}`, song)
  }
}
