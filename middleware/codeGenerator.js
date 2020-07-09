const Invite = require('../models/invite_code');


document.querySelector('#newCode').addEventListener('click', () => {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    let newCode = new Invite({
        invite_code: code,
        isUsed: false,
        comment: ''
    });
    newCode.save();
    location.reload();
    return false;
});