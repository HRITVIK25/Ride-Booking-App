const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be 3 characters or longer"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be 3 characters or longer"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketid: {
        type: String,
    },

    status:{
        type:String,
        enum: ['active','inactive'],
        default: 'inactive'
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minlength: [3, "Color must be at least 3 characters long"],
        },

        plate:{
            type:String,
            required:true,
            minlength: [3, "Plate must be at least 3 characters long"],
        },

        capacity: {
            type:Number,
            required: true,
            min: [2,"Capacity must be atleast 2"]
        },

        vehicleType:{
            type:String,
            required:true,
            enum: ['car','motorcycle','auto'],
            default: 'active'
        }
    },

    location:{
        lat:{
            type:Number,
        },
        log:{
            type:Number
        },
    },
},{timestamps:true});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captainModel =  mongoose.model('captain',captainSchema);

module.exports = captainModel;

