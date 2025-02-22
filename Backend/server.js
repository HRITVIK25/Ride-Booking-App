const http = require("http");
const app = require("./app.js");
const dotenv = require("dotenv");
const {initializeSocket} = require('./socket')
const connectDB = require('./db/db.js')

dotenv.config();
const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port : 
            ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed:", error);
  });
