'use strict';


module.exports = {

    asyncErrors: (fn) => {
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        }
    }

}