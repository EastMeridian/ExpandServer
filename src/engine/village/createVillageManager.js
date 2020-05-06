const createVillage = require('./createVillage');
const villageController = require('./villageController');

const createVillageManager = ({} = {}) => {
  const villagesID = [];
  const villages = {};

  return ({
    createVillage(options) {
      const village = createVillage(options);
      this.addVillage(village);
      return village;
    },
    addVillage: (village) => {
      const { id } = village;
      villagesID.push(id);
      villages[id] = village;
      console.log('addVillage', villagesID, villages);
    },
    build: (id, buildingName) => {
      villageController.construct(villages[id], buildingName);
    },
    update: (factor) => {
      villagesID.forEach((id) => {
        const village = villages[id];
        village.resources = villageController.incrementResources(village, factor);
      });
    },
  });
};

module.exports = createVillageManager;
