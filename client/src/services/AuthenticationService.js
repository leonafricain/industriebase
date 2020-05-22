import  Api  from './Api'

export default class PostService {
  register (credentials) {
    return Api.post('/register', credentials)
  }

  login (credentials) {
    return Api.post('/login', credentials)
  }
}
