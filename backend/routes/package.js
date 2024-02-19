var express = require('express');
var router = express.Router();
var packageController = require('../controllers/package')

router.post('/newpackage', packageController.createPackage);

module.exports = router;
