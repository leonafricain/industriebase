import  Api  from './Api'

export default class Dossier {
  
  createDossier (dossier) {
    return Api.post('/add', dossier )
  }
  
}
