const http = require("http");
const app = require("./app.js");
const dotenv = require("dotenv");
const connectDB = require('./db/db.js')

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port : 
            ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed:", error);
  });
