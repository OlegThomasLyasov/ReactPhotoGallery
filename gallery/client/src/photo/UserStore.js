import {makeAutoObservable} from 'mobx' //изменения 

export default class UserStore{
    constructor(){
        this._isAuth = false // не изменять 
        this._user = {}
        makeAutoObservable(this)//слежка за изменениями

    }//при изменении перерендеринг

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    //компьютед функции, вызываются только при изменении
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }


}