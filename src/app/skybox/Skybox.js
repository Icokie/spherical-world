// @flow
import type { Entity } from '../ecs/Entity';
import GlObject from '../engine/glObject';
import Model, { CUBE } from '../engine/Model';
import { World } from '../ecs';
import { Transform, Visual, Skybox } from '../components';
import { MaterialLibrary } from '../engine/MaterialLibrary';

const skyboxProvider = (ecs: World, materialLibrary: MaterialLibrary) => (id: Entity): Entity => {
  const model = Model.createPrimitive(CUBE, 1000, true);
  const material = materialLibrary.get('skybox');
  const object = new GlObject({ model, material });
  return ecs.createEntity(
    id,
    new Transform(0, 64, 0),
    new Visual(object),
    new Skybox(),
  );
};

export default skyboxProvider;