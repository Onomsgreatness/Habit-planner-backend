const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn");

//Load environment variables
dotenv.config({path: "./config.env"});

const app = express();
app.use(express.json());    //Middleware

//Connect DB
connectDB();

//Simple test route
app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB(); //connect first
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

