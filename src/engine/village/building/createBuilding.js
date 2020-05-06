const createID = require('../../utils/createID');

const createBuilding = ({
  name = 'NO_NAME',
  maxLevels = 10,
  cost = {},
} = {}) => ({
  id: createID('building'),
  name,
  level: 1,
  maxLevels,
  cost,
});

module.exports = createBuilding;
