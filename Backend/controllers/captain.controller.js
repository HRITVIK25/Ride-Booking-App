const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model.js')
const captainService = require('../services/captain.services.js')

module.exports.registerCaptain = async(req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname,email,password,vehicle} = req.body;

    const captainAlreadyExist = await captainModel.findOne({email});

    if(captainAlreadyExist){
        return res.status(401).json({messsage: "Captain already exist"})
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain})
}

module.exports.loginCaptain = async(res,req,next)=>{
    const {email,password} = req.body;

    const captain = captainModel.findOne({email});

    if(!captain){
        return res.status(401).json({message:"Invalid email or password"})
    }

    const isPasswordCorrect = captain.comparePassword(password)

    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid email or password"})
    }

    const token = captain.generateAuthToken();

    res.cookie('token',token);

    res.status(201).json({token,captain})
}