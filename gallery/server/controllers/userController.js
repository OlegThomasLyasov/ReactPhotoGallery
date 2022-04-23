const apiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/model')
const ApiError = require('../errors/ApiError')
const jwt = require('jsonwebtoken')

const generateJWT =(id,email,role)=>
 {
  return  jwt.sign(
    {id:id, email, role},
    process.env.SECRET
)

}


class UserController{

    async registration (req,res,next){
        const {email, password, role} = req.body

        if (!email || !password){
            return next(ApiError.badRequest("Некорректный email или пароль"))
        }
        const cond = await User.findOne({where: {email}})

        if (cond){
            return next(ApiError.badRequest("Пользователь уже есть"))
        }

        const hasPass = await bcrypt.hash(password,5)
        const user = await User.create({email, role, password:hasPass})

        const token = generateJWT(user.id,email,user.role)

        return res.json(token)
    }

    async login (req,res,next){

        const {email,password} = req.body
        const cond = await User.findOne({where: {email}})

        if (!cond){
            return next(ApiError.badRequest("Данный аккаунт не зарегистрирован"))
        }

        let compPass = bcrypt.compareSync(password, cond.password)

        if (!compPass){
            return next(ApiError.badRequest("Пароли не совпадают"))
        }

        const token = generateJWT(cond.id,email,cond.role)
        return res.json(token)
    }

    async check (req,res){
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json(token)
    }

    async getOne(req,res){
        const {id}=req.params
        const user = await User.findOne(
            {
                where: {id}

            }
        ) 
        return res.json(user)
     }

}

module.exports = new UserController()