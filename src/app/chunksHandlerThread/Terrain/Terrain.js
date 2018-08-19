// @flow
import { ITerrainBase } from '../../Terrain/TerrainBase';
// import { loadChunk, loadTerrainMipmap } from './terrainActions';

const terrainProvider = (TerrainBase: typeof ITerrainBase) => {
  class Terrain extends TerrainBase {
    constructor() {
      super();
      this.size = 16;
      this.halfSize = 8;
    }

    makeMipMappedTextureAtlas(terrainMipMap) {
      this.terrainMipMap = terrainMipMap;
      for (const chunk of this.chunks.values()) {
        chunk.terrainMipMap = this.terrainMipMap;
      }
    }

    componentDidUpdate(prevState) {
      const chunkXold = Math.floor(prevState.playerX / 16) * 16;
      const chunkZold = Math.floor(prevState.playerZ / 16) * 16;

      const chunkX = Math.floor(this.playerX / 16) * 16;
      const chunkZ = Math.floor(this.playerZ / 16) * 16;
      if (chunkX !== chunkXold || chunkZ !== chunkZold) {
        this.chunks = new Map([...this.chunks.entries()].filter(([key, value]) => {
          return (value.x > chunkX - (this.halfSize * 16))
            && (value.x < chunkX + (this.halfSize * 16))
            && (value.z > chunkZ - (this.halfSize * 16))
            && (value.z < chunkZ + (this.halfSize * 16));
        }));
        // this.filterFarChunks();
      }
    }
  }
  return Terrain;
};

/* ::
export const Terrain = terrainProvider();
*/

export default terrainProvider;
