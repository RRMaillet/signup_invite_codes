'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: String,
    first_name: String,
    last_name: String,
    company: String,
    address: String,
    phone_no: String,
    isAdmin: Boolean
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);