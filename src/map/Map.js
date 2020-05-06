const { generateChunks } = require('./mapFactory');
const createVillage = require('./createMapVillage');

function Map(size = 256, chunkSize = 8) {
  this.chunks = generateChunks(size, chunkSize);
  this.size = size;
  this.chunkSize = chunkSize;
}

Map.prototype.getChunkPosition = (x, y, chunkSize) => ({
  x: Math.floor(x / chunkSize),
  y: Math.floor(y / chunkSize),
});

Map.prototype.getTilePosition = (x, y, chunkSize) => ({
  x: x % chunkSize,
  y: y % chunkSize,
});

Map.prototype.getChunk = function getChunk(x, y) {
  return this.chunks[x][y];
};

Map.prototype.getTile = function getTile(x, y, chunkSize) {
  const { x: chunkX, y: chunkY } = this.getChunkPosition(x, y, chunkSize);
  const { x: tileX, y: tileY } = this.getTilePosition(x, y, chunkSize);
  try {
    return this.chunks[chunkX][chunkY].tiles[tileX][tileY];
  } catch (e) {
    console.log(e, chunkX, chunkY, tileX, tileY, x, y, chunkSize, this.chunks);
    console.log('chunk', chunkX, chunkY, this.chunks[chunkX][chunkY], chunkSize, this.chunks);
  }
};

Map.prototype.randomFindBiome = function randomFindBiome(biome, validation = () => true) {
  let found = null;
  while (!found) {
    const randomX = Math.round(Math.random() * this.size);
    const randomY = Math.round(Math.random() * this.size);
    const tile = this.getTile(randomX, randomY, this.chunkSize);
    if (tile.biome === biome && validation(tile)) {
      found = tile;
    }
  }
  return found;
};

Map.prototype.buildVillage = function buildVillage(username, tile) {
  tile.layers.push(119);
  // eslint-disable-next-line no-param-reassign
  tile.village = createVillage({ username, ...tile });
};

Map.prototype.buildFirstVillage = function buildFirstVillage(username) {
  const tile = this.randomFindBiome('field', (found) => found.village === null);
  this.buildVillage(username, tile);
  console.log(tile);
  return tile;
};

module.exports = Map;
