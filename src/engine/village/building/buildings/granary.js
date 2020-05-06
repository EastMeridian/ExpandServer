const createBuilding = require('../createBuilding');

function* getNextIncomes(initialValue) {
  let food = yield initialValue;
  while (true) {
    yield food += 1;
  }
}

function* getNextProduction(initialValue) {
  let production = yield initialValue;
  while (true) {
    yield production += 1;
  }
}

const initialCost = { production: 1 };
const initialIncomes = { food: 2 };

const createGranary = () => createBuilding({
  name: 'granary',
  initialize() {
    this.nextState();
  },
  nextLevel(village) {
    if (this.level <= this.maxLevels) {
      this.level += 1;
      this.nextState();
      // eslint-disable-next-line no-param-reassign
      if (village) village.flatIncomes = { ...village.flatIncomes, ...this.incomes };
    }
  },
  nextState() {
    this.incomes.food = this.getNextIncomes.next().value;
    this.cost.production = this.getNextProduction.next().value;
  },
  getNextIncomes: getNextIncomes(initialIncomes.food),
  getNextProduction: getNextProduction(initialCost.production),
  initialCost,
  initialIncomes,
  incomes: {},
});

module.exports = { createGranary };
