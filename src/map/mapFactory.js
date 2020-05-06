const uniqueID = require('lodash/uniqueId');
const biomes = require('./biomes');

const generateRandomLayer = () => {
  const random = Math.random();
  if (random > 0.96) return 'mountain';
  if (random > 0.94) return 'iron'; // if (random > 0.92) return 'hills';

  if (random > 0.86) return 'forest_little';
  if (random > 0.82) return 'forest_large';
  if (random > 0.78) return 'forest_left';
  if (random > 0.74) return 'forest_right';
  if (random < 0.04) return 'lake';
  return 'field';
};

const generateVillage = (type) => {
  if (type === 'field') {
    const random = Math.random();

    if (random < 0.005) {
      return 'village';
    }
  }

  return 0;
};

const createTile = (x, y) => {
  const biome = generateRandomLayer();
  return {
    id: uniqueID(),
    x,
    y,
    biome,
    layers: [1, biomes[biome]],
    village: null,
  };
};

const generateRandomMap = (size, chunkX, chunkY) => Array(size).fill(null).map(
  (_, x) => Array(size).fill(null).map((__, y) => createTile(chunkX * size + x, chunkY * size + y)),
);

const createChunk = (x, y, chunkSize) => ({
  x,
  y,
  tiles: generateRandomMap(chunkSize, x, y),
});

const createChunks = (size, chunkSize = 8, onCreate = () => null) => Array(size / chunkSize)
  .fill(null)
  .map((_, x) => Array(size / chunkSize)
    .fill(null)
    .map((__, y) => onCreate(x, y, chunkSize)));

const generateChunks = (size, chunkSize = 8) => createChunks(size, chunkSize, createChunk);

module.exports = {
  generateChunks,
  createChunks,
};
