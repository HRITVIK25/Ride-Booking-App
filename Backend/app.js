const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.routes.js');
const captainRoute = require('./routes/captain.routes.js')
const mapsRoutes = require('./routes/map.routes.js')
const rideRoutes = require('./routes/ride.routes.js')

app.use(cors({
    origin: '*', // Change this to your specific forwarded port if needed
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/users',userRoute)
app.use('/captain',captainRoute);
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)

module.exports = app;
