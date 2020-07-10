'use strict';

const Invite = require('../models/invite_code');

module.exports = {
    async insidePage(req, res, next) {
        let invites = await Invite.find({}).populate('user');

        res.render('secure/show', {
            user: req.user,
            invites
        });
    },

    postNewCode(req, res, next) {
        let code = req.body.newCode;
        let newCode = new Invite({
            invite: code,
            isUsed: false,
        });

        newCode.save();
        res.redirect('/secure');
    }
}