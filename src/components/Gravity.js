// @flow strict
import type { Component } from '../../common/ecs/Component';
import { THREAD_MAIN, THREAD_PHYSICS } from '../Thread/threadConstants';

export default class Gravity implements Component {
  static threads = [THREAD_MAIN, THREAD_PHYSICS];
  static componentName = 'gravity';
  static componentType: {| 'gravity': Gravity |};
}

/**
 * Component to mark Entity as affected by gravity
 */
export const GravityComponent = (_: {||}) =>
  // $FlowFixMe
  new Gravity();
