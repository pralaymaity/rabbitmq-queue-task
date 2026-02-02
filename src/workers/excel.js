// src/workers/excel.js
const path = require("path");

// explicitly point to project root .env
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
// src/workers/excel.worker.js
const amqp = require("amqplib");
const { QUEUE } = require("../config/rabbitmq");
const connectDB = require("../config/db");
const User = require("../model/user");

async function startWorker() {
  await connectDB();

  // 2connect RabbitMQ
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });
  channel.prefetch(1);

  console.log("Worker started and waiting for jobs...");

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;

    const row = JSON.parse(msg.content.toString());

    try {
      console.log("Processing:", row);

      // validation
      if (row.age <= 16) {
        throw new Error("Age must be >= 16");
      }

      // REAL DB INSERT
      await User.create({
        name: row.name,
        email: row.email,
        age: row.age,
        phone: row.phone,
      });

      console.log("Saved user:", row.email);

      // acknowledge success
      channel.ack(msg);
    } catch (err) {
      console.error("Failed:", err.message);

      // retry message
      channel.nack(msg, false, true);
    }
  });
}

startWorker();
