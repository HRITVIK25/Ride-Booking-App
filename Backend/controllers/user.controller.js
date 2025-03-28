const User = require('../models/user.model.js');
const userService = require('../services/user.services.js');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model.js')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const userAlreadyExist = await User.findOne({email})

    if(userAlreadyExist){
        return res.status(401).json({message: "User already exists"});
    }
    try {
        const hashedPassword = await User.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}

module.exports.loginUser = async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).json({message: "Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);

    res.status(201).json({token,user});
}

module.exports.getProfile = async(req,res,next)=>{
    res.status(200).json(req.user) // req.user mai user set hua hai middleware mai
}

module.exports.logoutUser = async(req,res,next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    const isAlreadyBlacklisted = await blacklistTokenModel.findOne({ token }); //search if token already exist to prevtn multiple requests

        if (!isAlreadyBlacklisted) {
            //logout ke time blaclist mai daal do taaki share ya local storage mai save hone par bhi login na ho
            await blacklistTokenModel.create({ token });
        }

    res.status(200).json({message: "User Logged Out"})
}

/*
NOTES:-
Routes mai validation check to express validator karega but agar error hai to uspe jo hoga wo controller mai define hoga
using validationResult, jo galat hai wo req mai aayega
*/