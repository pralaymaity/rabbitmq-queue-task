require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const { connectRabbitMQ } = require("./src/config/rabbitmq");
const uploadRoute = require("./src/route/upload");

const app = express();
app.use(express.json());



app.use("/api", uploadRoute);

connectDB();
connectRabbitMQ();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
