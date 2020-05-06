const { BUILD_BUILDING, GET_USER } = require('./messages');
const villageManager = require('./villageManager');
const userManager = require('./userManager');

const socketVillageEvents = (socket, username) => {
  socket.on(BUILD_BUILDING, ({ village, building }) => {
    console.log('SOCKET EVENT', BUILD_BUILDING, village, building);
    const { id } = village;
    villageManager.build(id, building.name);
    console.log(villageManager, userManager.getUser(username));
    socket.emit(GET_USER, userManager.getUser(username));
  });
};

module.exports = socketVillageEvents;
