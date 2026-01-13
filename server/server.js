const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Load env variables
dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load("./swagger.yaml");

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

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
