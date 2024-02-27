
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
const passwordHashMiddleware = require('../middlewares/passwordHash');

router.post('/signup', passwordHashMiddleware, userController.createUser);
router.post('/login', userController.userLogin)
router.put('/edituser', userController.editUser)
router.get('/getuser', userController.getUser)
router.delete('/deleteuser', userController.deleteUser)

module.exports = router;
