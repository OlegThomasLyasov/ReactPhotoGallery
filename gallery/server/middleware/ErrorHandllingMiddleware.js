const ApiError = require('../errors/ApiError')

module.exports = function(err, req, res, next){
    if (err instanceof ApiError){
        res.status(err.status).json(err.message)

    }
    return res.status(500).json({message: "Непредвиденная ошибка"})
}

