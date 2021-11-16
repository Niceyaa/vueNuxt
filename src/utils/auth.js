import Cookie from 'js-cookie'

const tokenKey = 'smdToken'

export function getToken() {
    return Cookie.get(tokenKey)
}

export function setToken(token){
    return Cookie.set(tokenKey,token,{'expires':30})
}

export function removeToken(){
    return Cookie.remove(tokenKey)
}
