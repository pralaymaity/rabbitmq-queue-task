const { getChannel, QUEUE } = require("../config/rabbitmq");

async function sendToQueue(data) {
  const channel = getChannel();

  channel.sendToQueue(
    QUEUE,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );

  console.log("Job queued:", data.email || data.name);
}

module.exports = {
  sendToQueue,
};
