const { GET_CHUNK } = require('../map/messages');

const socketMapEvents = (socket, map) => {
  socket.on(GET_CHUNK, ({ position, id }) => {
    const { x, y } = position;
    socket.emit(`${GET_CHUNK}:${id}`, map.getChunk(x || 0, y || 0));
  });
};

module.exports = socketMapEvents;
