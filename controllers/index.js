'use strict';

const passport = require('passport');
const User = require('../models/user');
const Invite = require('../models/invite_code');


module.exports = {
    landingPage(req, res, next) {
        res.render('index');
    },

    userRegistration(req, res, next) {
        res.render('user/new');
    },

    registerNewUser(req, res, next) {
        const newUser = new User(req.body.user)
        if (req.body.user.isAdmin) {
            newUser.isAdmin = true;
        } else {
            newUser.isAdmin = false;
        }
        User.register(newUser, req.body.password);
        res.redirect('/');
    },

    userLogin(req, res, next) {
        res.render('user/login');
    },

    loginUser(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/secure',
            failureRedirect: '/login'
        })(req, res, next);
    },

    insidePage(req, res, next) {
        res.render('secure/show', {
            user: req.user
        });
    },

    logoutUser(req, res, next) {
        req.logout();
        res.redirect('/');
    }

}