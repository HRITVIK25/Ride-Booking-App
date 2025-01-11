// These aee services which will interact with Databases
const User  = require('../models/user.model.js');

// iss function ka yeh kaam hai ki user ko create karo aur usse pehle kuch checks karo
module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = await User.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}

