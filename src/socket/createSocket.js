const socketio = require('socket.io');
const {
  CONNECTION,
  DISCONNECT,
  GET_USER,
  SEND_DATA,
} = require('./messages');
const socketMapEvents = require('./socketMapEvents');
const socketVillageEvents = require('./socketVillageEvents');
const createMap = require('../map/createMap');
const createUser = require('../engine/user/createUser');
const createTaskManager = require('../tasks/createTaskManager');
const villageManager = require('./villageManager');
const userManager = require('./userManager');

const map = createMap();
const taskManager = createTaskManager({ enabled: true });

taskManager.addListener((date) => {
  console.log('[tick date]: ', date);
  villageManager.update(1 / 3600);
});

const createUserStore = () => {
  const connectedUser = {};
  return ({
    connectedUser,
    subscribeUser: (socketID, username) => { connectedUser[socketID] = username; },
    unsubscribeUser: (socketID) => { delete connectedUser[socketID]; },
  });
};

const userStore = createUserStore();

const makeUser = (username, socketId) => {
  const { x, y } = map.buildFirstVillage(username);
  const village = villageManager.createVillage({ x, y });
  const user = createUser({ username, socketId, villages: [village] });
  userManager.addUser(user).display();
};

const createSocket = ({ http }) => {
  const io = socketio(http);

  io.on(CONNECTION, (socket) => {
    const { handshake, id } = socket;
    const { username } = handshake.query;
    console.log('a user connected', id);
    console.log('handshake', username);
    if (!userManager.getUser(username)) {
      console.log('NO USER FOUND', userManager.getUser(username));
      makeUser(username, id);
    }
    socketMapEvents(socket, map);
    socketVillageEvents(socket, username);
    userStore.subscribeUser(id, username);
    socket.emit(GET_USER, userManager.getUser(username));

    socket.on(DISCONNECT, (reason) => {
      console.log('a user disconnected', reason);
      userStore.unsubscribeUser(id);
    });
  });

  taskManager.addListener(() => {
    console.group('[connected users]');
    Object.keys(io.sockets.sockets).map((key) => {
      const client = io.sockets.sockets[key];
      console.log('| ', client.id);
      client.emit(GET_USER, userManager.getUser(userStore.connectedUser[client.id]));
    });
    console.groupEnd();
  });
};

module.exports = createSocket;
