const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },

    pickup: {
        type:String,
        required:true,
    },

    destination: {
        type:String,
        required:true,
    },

    fare: {
        type: Number,
        require:true,
    },

    status:{
        type:String,
        enum:['pending','accepted','completed','cancelled'],
        default:'pending'
    },

    duration:{
        type:Number //seconds
    },

    distance:{
        type:Number // metres
    },

    paymentID: {
        type:String
    },

    orderId: {
        type:String
    },

    signature:{
        type:String
    },

    otp:{
        type:String,
        select:false,
        required:true,
    },

},{timestamps:true})

const rideModel =  mongoose.model('ride',rideSchema);

module.exports = rideModel;