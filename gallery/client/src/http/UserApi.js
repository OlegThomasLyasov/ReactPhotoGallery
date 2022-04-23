import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"; //для раскодировки jwt токена

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    console.log(data) //получение токена
    localStorage.setItem('token', data)
    return jwt_decode(data)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data)//добавление токена в локальное хранилище
    return jwt_decode(data)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data)
    return jwt_decode(data)
}

export const getOne = async (id) => {
    const {data} = await $host.get('api/user/' + id)
    //console.log(data)
    return data
}