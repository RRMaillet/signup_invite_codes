'use strict';

const express = require('express');
const router = express.Router({
    mergeParams: true
});
const {
    landingPage,
    userRegistration,
    registerNewUser,
    userLogin,
    loginUser,
    logoutUser
} = require('../controllers');
const {
    asyncErrors
} = require('../middleware');


router.get('/', landingPage);
router.get('/register', userRegistration);
router.post('/register', asyncErrors(registerNewUser));
router.get('/login', userLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);


module.exports = router;