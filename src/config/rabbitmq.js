const amqp = require("amqplib");

const QUEUE = "excel_jobs";
let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost:5672");
  channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, {
    durable: true,
  });

  console.log("RabbitMQ connected");
}

function getChannel() {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
}

module.exports = {
  connectRabbitMQ,
  getChannel,
  QUEUE,
};
