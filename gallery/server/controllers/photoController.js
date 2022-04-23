const uuid = require('uuid')
const path = require('path')

const {Photo,PhotoInfo} = require('../models/model')
const ApiError = require('../errors/ApiError')



class PhotoController{

    async create (req,res,next){
        try {
        const {name} = req.body
        const {img} = req.files
        const {userId} = req.body
        const {typeId} = req.body
        const {textPhoto} = req.body
        console.log(textPhoto)
        let fileName = uuid.v4()+ ".jpg"
        img.mv(path.resolve(__dirname,'..','static',fileName))

        const photo = await Photo.create({name,img:fileName,userId,typeId,textPhoto})
        //console.log(info)    
        

        return res.json(photo)

        }catch(e){
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req,res){
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit
        let photos;
        //console.log(typeId)
        if (!typeId) {
            photos= await Photo.findAndCountAll({limit, offset})
        }
        if (typeId) {
            photos = await Photo.findAndCountAll({where:{typeId}, limit, offset})
        }
        return res.json(photos)
    }

    async getOne(req,res){
       //const rememberMe = localStorage.getItem('token'); 

       const {id}=req.params
      
       const photo = await Photo.findOne(
           {
               where: {id},
           }
       ) 
       return res.json(photo)
    }
  
}

module.exports = new PhotoController()