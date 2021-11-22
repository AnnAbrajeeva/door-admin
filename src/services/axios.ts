import axios from 'axios'
import router from '../router/index'


const requestAxios = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

requestAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    const authorizationToken = token ? `Bearer ${token}` : ''
    config.headers!.Authorization = authorizationToken
    return config
})

requestAxios.interceptors.response.use(undefined, error => {
    if(error.response.status === 401) {
        router.push('/auth?message=auth')
    }
    return Promise.reject(error);
});

export default requestAxios;
