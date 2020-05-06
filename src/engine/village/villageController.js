/* eslint-disable no-param-reassign */
const createVillage = require('./createVillage');
const createBuilding = require('./building/createBuilding');

const totalIncomes = (
  flatIncome,
  incomePerPopulation,
  population,
  incomeFactor,
) => (flatIncome + incomePerPopulation * population) * incomeFactor;

const incrementResources = ({
  resources,
  flatIncomes,
  incomesFactor,
  incomesPerPopulation,
  population,
}, factor) => Object.keys(resources).reduce((acc, name) => ({
  ...acc,
  [name]: resources[name] + totalIncomes(
    flatIncomes[name],
    incomesPerPopulation[name],
    population,
    incomesFactor[name],
  ) * factor,
}), {});

const construct = (village, buildingName) => {
  const { buildings, buildables } = village;
  const index = buildables.findIndex((building) => building.name === buildingName);
  const building = buildables.splice(index, 1)[0];
  buildings.push(building);
  // building.afterCreate(village, building);
};

const findBuildingByName = (buildings, buildingName) => buildings.filter(
  (build) => build.name === buildingName,
)[0] || null;

const addLevel = (village, buildingName) => {
  const { buildings } = village;
  const building = findBuildingByName(buildings, buildingName);
  building.level += 1;
  building.afterLevel(village, building);
};

module.exports = {
  createVillage,
  createBuilding,
  incrementResources,
  construct,
  findBuildingByName,
};
