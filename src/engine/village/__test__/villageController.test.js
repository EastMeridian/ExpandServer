const {
  createVillage,
  createBuilding,
  addBuilding,
  update,
  findBuildingByName,
} = require('../villageController');

describe('createVillage function', () => {
  const village = createVillage();

  it('should create the right id', () => {
    expect(village.id).toBe('village#1');
  });
});

describe('createBuilding function', () => {
  const building = createBuilding();

  it('should create the right id', () => {
    expect(building.id).toBe('building#2');
  });
});

describe('findBuildingByName function', () => {
  const building1 = createBuilding({ name: 'granary' });
  const building2 = createBuilding({ name: 'silo' });
  const buildings = [building1, building2];

  it('shouldnt match anything with wrong name', () => {
    expect(findBuildingByName(buildings, 'test')).toStrictEqual(null);
  });

  it('should match the right building by name', () => {
    expect(findBuildingByName(buildings, 'granary')).toStrictEqual(building1);
  });
});

describe('village income management', () => {
  const village = createVillage();

  it('should add the right income', () => {
    update(village);
    expect(village.resources).toStrictEqual({
      food: 3,
      production: 3,
      science: 1,
    });
  });
});

describe('village building management', () => {
  const village = createVillage();

  it('should add a building', () => {
    const building = createBuilding();

    addBuilding(village, building);
    expect(village.buildings).toStrictEqual([building]);
  });
});
