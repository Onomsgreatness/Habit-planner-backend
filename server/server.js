const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn");

// Load env variables
dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB(); // connect DB first
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
};

startServer();
