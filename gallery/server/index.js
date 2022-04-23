require('dotenv').config() //окр.среда БД
const express = require('express');//работа с БД
const sequelize = require('./db')//подключение БД
const models = require('./models/model')//модели БД
const cors = require('cors')
const fileUpload = require("express-fileupload")//для загрузки файлов
const router = require('./routes/index') //для связи
const path = require('path')//для создания пути
const errorHandler = require('./middleware/ErrorHandllingMiddleware')//для вылавливания ошибок

const PORT = process.env.PORT || 5000 //подключение порта
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static'))) // получение картинки указание пути к папке
app.use(fileUpload({})) //подключение файлов для отправки в БД
app.use('/api', router) //создание путей



app.use(errorHandler)//обработка ошибок

const start = async()=>{
try{
    await sequelize.authenticate()//аутентификация пользователя
    await sequelize.sync()//проверка состояние БД с схемой
    app.listen(PORT, ()=>console.log(`Server start on ${PORT}`))
}
catch (e){
    console.log(e)
}

}

start()
