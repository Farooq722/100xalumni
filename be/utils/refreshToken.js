const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const refreshToken = async(userId) => {

    const token =  jwt.sign({id: userId}, process.env.SECRET_KEY_REFRESH, {expiresIn: '7d'})

    const updateRefreshToken = await user.updateOne(
        {
        _id: userId
        },
        {
            refresh_token: token
        } 
    )
    return token;
}

module.exports = refreshToken;