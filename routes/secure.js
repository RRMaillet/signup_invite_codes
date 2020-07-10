'use strict';

const express = require('express');
const router = express.Router({
    mergeParams: true
});
const {
    insidePage,
    postNewCode
} = require('../controllers/secure');
const {
    asyncErrors
} = require('../middleware');


router.get('/', asyncErrors(insidePage));
router.post('/', postNewCode);


module.exports = router;