import axios from "axios";

//для обычных запросов
const $host = axios.create({
    baseURL: 'http://localhost:5000/'  
})

//имеющих токен
const $authHost = axios.create({
    baseURL: 'http://localhost:5000/'
})

//подстановка токена
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}