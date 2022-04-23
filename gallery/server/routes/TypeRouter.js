const Router = require('express')
const router = new Router()
const typeController = require('../controllers/TypeController')
const checkRole = require('../middleware/roleHandlingMiddleware')

router.post('/', typeController.create)
router.get('/', typeController.getAll)

module.exports = router