'use strict';

const express = require('express');
const router = express.Router();
const {
    landingPage,
    userRegistration,
    registerNewUser,
    userLogin,
    loginUser,
    insidePage,
    logoutUser
} = require('../controllers');
const {
    asyncErrors
} = require('../middleware');


router.get('/', landingPage);
router.get('/secure', insidePage);
router.get('/register', userRegistration);
router.post('/register', registerNewUser);
router.get('/login', userLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);



module.exports = router;