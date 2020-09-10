const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

// GET users
router.get('/users/:page',userController.users);

//POST add new user
router.post('/general_add',userController.general_add);
module.exports = router;

// GET number of users
router.get('/numberOfUsers',userController.numberOfUsers);