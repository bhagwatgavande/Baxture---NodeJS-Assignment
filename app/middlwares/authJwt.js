const jwt = require("jsonwebtoken")
const global  = require("../constant/globalvar")
const config  = require("../config/auth.config")
const Users = require('../models/users.model');

var Id = ""
 verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(400).json({
            message: noToken
        });
    }
jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
        return res.status(400).json({
            message: unauthorized
        });
    }
    data = JSON.parse(atob(token.split('.')[1]))
    Id = data._id
    next()
})
}

const authJwt = {
    verifyToken:verifyToken
}
module.exports = authJwt