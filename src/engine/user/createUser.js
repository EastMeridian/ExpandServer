const createUser = ({ username, socketId, villages = [] }) => ({
  username,
  socketId,
  villages,
  resources: {
    money: 50,
  },
  addVillage(village) {
    this.villages.push(village);
  },
});

module.exports = createUser;
