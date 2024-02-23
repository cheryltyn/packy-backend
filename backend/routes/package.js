var express = require('express');
var router = express.Router();
var packageController = require('../controllers/package')

router.post('/newpackage', packageController.createPackage);
router.get('/fetchpackage', packageController.fetchPackage); 
router.get('/packages', packageController.getAllPackages);
router.put('/editpackage', packageController.editPackage);
router.delete('/deletepackage', packageController.deletePackage);


module.exports = router;
