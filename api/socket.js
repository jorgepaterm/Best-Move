const socketIO = require('socket.io');

var socket = {};

const connect = (server) => {
    socket.io = socketIO(server, {
        cors: {
              origin: "*",
              methods: ["GET", "POST"]
          }
      });
}

module.exports = {
    connect,
    socket
}
