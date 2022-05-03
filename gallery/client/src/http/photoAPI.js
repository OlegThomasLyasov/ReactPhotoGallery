import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}


export const createPhoto = async (Photo) => {
    const {data} = await $authHost.post('api/photo', Photo)
    return data
}

export const fetchPhotos = async (typeId,userId, page, limit= 5) => {
    const {data} = await $host.get('api/photo', {params: {
            typeId, userId, page, limit
        }})
    //console.log(userId)
    return data
}

export const fetchOnePhoto = async (id) => {
    let token = localStorage.getItem('token')
    //console.log(token)
    if (token){
    const {data} = await $host.get('api/photo/' + id)
    return data
    }
}

