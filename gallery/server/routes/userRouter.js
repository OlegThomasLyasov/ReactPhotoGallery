const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleWare = require('../middleware/authHandlingMiddleWare')

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleWare, userController.check )
router.get('/:id',userController.getOne)

module.exports = router