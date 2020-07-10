'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InviteSchema = new Schema({
    invite: String,
    isUsed: Boolean,
    comment: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports = mongoose.model('Invite', InviteSchema);