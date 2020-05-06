const createID = require('../utils/createID');
const { buildables } = require('./buildables');

const createVillage = ({
  x,
  y,
  name = 'Nouveau village',
} = {}) => ({
  id: createID('village'),
  name,
  x,
  y,
  buildings: [],
  buildables,
  buildingsQueue: [],
  population: 1,
  influenceRange: 2,
  limits: {
    resources: 800,
  },
  resources: {
    food: 0,
    production: 0,
    science: 0,
  },
  flatIncomes: {
    food: 3600,
    production: 3,
    science: 1,
    money: 10,
  },
  incomesPerPopulation: {
    food: 0,
    production: 0,
    science: 0,
    money: 0,
  },
  incomesFactor: {
    food: 1,
    production: 1,
    science: 1,
    money: 1,
  },
});


module.exports = createVillage;
