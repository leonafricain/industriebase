import  Api  from './Api'


export default class PdfService {
  getPdfs () {
    return Api.get('/pdfdoc')
  }

  getOnePdf (pdfId) {
    return Api.get(`/pdfdoc/${pdfId}`)
  }
  /* post (bookmark) {
    return axios.post('/bookmark', bookmark)
  }
  deleteBookmark (bookmarkId) {
    return axios.delete(`/bookmark/${bookmarkId}`)
  } */
}
