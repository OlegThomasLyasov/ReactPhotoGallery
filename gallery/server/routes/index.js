const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const photoPouter = require('./photoRouter')
const typeRouter = require('./typeRouter')


router.use('/user',userRouter)
router.use('/photo',photoPouter)
router.use('/type',typeRouter)
router.use('/admin',typeRouter)

module.exports = router