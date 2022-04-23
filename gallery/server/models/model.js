const sequelize = require("../db")
const {DataTypes} = require('sequelize')


//создание моделей БД 
const User = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email: {type:DataTypes.STRING,unique:true},
    password: {type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue:"USER"},

})

//тип фотографии
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})


const Photo = sequelize.define('photo',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull:false},
    textPhoto: {type:DataTypes.TEXT}
})

//создание связей
User.hasMany(Photo)
Photo.belongsTo(User)

Type.hasMany(Photo)
Photo.belongsTo(Type)

module.exports = {
    User,Type,Photo
}