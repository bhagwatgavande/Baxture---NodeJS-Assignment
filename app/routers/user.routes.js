const express = require('express');
const router = express.Router();
const usercontrollers = require('../controllers/user.controller')

// create new user //
router.post('/users', usercontrollers.UsersignUp)

// get all user data //
router.get('/users', usercontrollers.getAllUser)

// get user data using id //
router.get('/users/:id', usercontrollers.getAllUserByID)

// update data using id //
router.patch('/users', usercontrollers.updateUserByID)

//delete user data using id //
router.delete('/users/:userId', usercontrollers.deleteUserByID)


module.exports = router;