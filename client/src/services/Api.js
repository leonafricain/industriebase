import axios from 'axios'
import store from '../store'

console.log(store.state.authModule)
export default axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${store.state.authModule.token}`
    }
})
