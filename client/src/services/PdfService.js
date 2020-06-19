import  Api  from './Api'

export default class PdfService {
  getPdfs () {
    return Api.get('/pdfdoc')
  }

  getOnePdf (pdfId) {
    return Api.get(`/pdfdoc/${pdfId}`)
  }

  createPdf (pdfdoc) {
    return Api.post('/pdfdoc', pdfdoc )
  }
  
}
