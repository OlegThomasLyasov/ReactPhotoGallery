const Router = require('express')
const router = new Router()
const PhotoController = require('../controllers/photoController')
const checkRole = require('../middleware/roleHandlingMiddleware')

router.post('/',checkRole('ADMIN'),PhotoController.create)
router.get('/',PhotoController.getAll)
router.get('/:id',PhotoController.getOne)

module.exports = router