import {makeAutoObservable} from 'mobx' //изменения 
import { fetchPhotos } from "../http/photoAPI";
import { useContext, useEffect } from "react";
import { Context } from "../index";



export default class PhotoStore {
    
    constructor(){
        
        this._types = []
        this._photo = []
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        this._last={}
        this._count = 0
        makeAutoObservable(this)//слежка за изменениями
        
    }
    //при изменении перерендеринг

    setTypes(types) {
        this._types = types
    }

    setPhotos(photo) {
        this._photo = photo
    }

    setSelectedType(type) {

        this.setPage(1)
        this._selectedType = type
        //console.log(this._count)
        if (this._selectedType != this._last || (this._count%2==0 &&this._selectedType == this._last)){
            this._last = this._selectedType
            this._count = 0
            fetchPhotos(this._selectedType.id, this._page, 8).then(data => {
                //console.log(data.count)
                this.setPhotos(data.rows)
                this.setTotalCount(data.count)
            })
            //console.log('Ок')
            }
        else if (this._count%2!=0 && this._selectedType == this._last){
            //console.log('Брух')
            this._selectedType = 0 
            this._count = 1
            fetchPhotos(null, this._page, 8).then(data => {
                //console.log(data.count)
                this.setPhotos(data.rows)
                this.setTotalCount(data.count)
            })
        }
        this._count = this._count+1
    }

    setPage(page) {
        this._page = page
        fetchPhotos(this._selectedType.id, this._page, 8).then(data => {
            //console.log(data.count)
            this.setPhotos(data.rows)
            this.setTotalCount(data.count)
        })
    }
    
    setTotalCount(count) {
        this._totalCount = count
    }

    //компьютед функции, вызываются только при изменении
    get types() {
        return this._types
    }

    get photos() {
        return this._photo
    }
    get selectedType() {
        return this._selectedType
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
