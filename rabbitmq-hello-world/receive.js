// Require the library
const amqp = require("amqplib/callback_api");
//  connect to RabbitMQ server and create a channel
amqp.connect(
  {
    hostname: "localhost",
    port: 5673,
    protocol: "amqp",
  },
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = "hello";
      var msg = "Hello World!";

      channel.assertQueue(queue, {
        durable: false,
      });
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          noAck: true,
        }
      );
    });
  }
);
