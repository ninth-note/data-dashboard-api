const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// CRUD - operations for managing users
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router