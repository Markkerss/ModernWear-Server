const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

function authenticate (req, res, next) {
    try {
        if (req.headers.access_token) {
            let isUser = verifyToken(req.headers.access_token);
            User.findOne({where: {id: isUser.id}})
                .then(data => {
                    if (!data) {
                        next({code: 404, message: 'User not found'});
                    } else {
                        req.currentUser = {id: data.id, role: data.role}
                        next();
                    }
                })
        } else {
            next({code: 401, message: 'Please log in'});
        }
    } catch (err) {
        next({code: 401, message: 'Please log in'})
    }
}

function authorize (req, res, next) {
    if(req.currentUser.role === 'admin') {
        next()
    } else {
        next({code: 403, message: 'Access Denied'})
    }
}

module.exports = { authenticate, authorize };