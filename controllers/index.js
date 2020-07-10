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

    async registerNewUser(req, res, next) {
        const newUser = new User(req.body.user);
        const inviteCode = req.body.inviteCode;
        let found = await Invite.findOne({
            invite: inviteCode
        });

        if (found && !(found.isUsed)) {
            await User.register(newUser, req.body.password);
            let user = await User.findOne({
                username: req.body.user.username
            })
            found.isUsed = true;
            found.user = user._id;
            await found.save();
            res.redirect('/');
        } else {

            res.redirect('/register');
        }
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

    logoutUser(req, res, next) {
        req.logout();
        res.redirect('/');
    }
};