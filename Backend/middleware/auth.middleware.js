const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



module.exports.authUser = async(req,res,next) =>{ 
const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message: "Unauthorized Access"})
    }

    //logout ho jaye sharing ya local storage mai token save hone ke baad bhi

const isBlacklisted = await User.findOne({token: token});
if(isBlacklisted){
    return res.status(401).json({message: "Unauthorized Access"})
}

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        req.user = user;

        return next()
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized Access'})
    }
}