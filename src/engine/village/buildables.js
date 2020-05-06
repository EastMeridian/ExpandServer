const buildables = [
  {
    name: 'granary',
    cost: { production: 5 },
    incomes: { food: 2 },
    level: 1,
  },
  {
    name: 'warehouse',
    cost: { production: 10 },
    incomes: { food: 2 },
    level: 1,
  },
];

const buildableStore = buildables.reduce((acc, next) => ({ ...acc, [next.name]: next }));

module.exports = { buildables, buildableStore };
