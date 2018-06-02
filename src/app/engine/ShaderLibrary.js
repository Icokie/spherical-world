// @flow
import { GlShaderProgram } from './glShader';

const shaderLibraryProvider = () => {
  class ShaderLibrary {
    shaders: Map<string, GlShaderProgram> = new Map();

    get(name: string): ?GlShaderProgram {
      return this.shaders.get(name);
    }

    add(...shaders: GlShaderProgram[]) {
      for (const shader of shaders) {
        this.shaders.set(shader.name, shader);
      }
    }
  }
  return ShaderLibrary;
};

/* ::
export const ShaderLibrary = shaderLibraryProvider();
*/

export default shaderLibraryProvider;