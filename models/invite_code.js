'use strict';

const mongoose = require('mongoose');
const {
    stringify
} = require('querystring');
const Schema = mongoose.Schema;

const InviteCodeSchema = new Schema({
    invite_code: String,
    isUsed: Boolean,
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})


module.exports = mongoose.model('InviteCode', InviteCodeSchema);