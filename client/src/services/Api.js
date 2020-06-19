import axios from 'axios'
import store from '../store'

/* export default axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${store.state.authModule.token}`
    }
})
 */
const http = axios.create ({
    baseURL: process.env.VUE_APP_ROOT_API || 'http://localhost:5000',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
  });
  
  http.interceptors.request.use (
    function (config) {
      const token = store.state.authModule.token;
      
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject (error.message);
    }
  );
  
  export default http;