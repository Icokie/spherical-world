// @flow strict
import type EventObservable from './GameEvent/EventObservable';

export type THREAD_ID = number;

export interface Thread {
  +id: THREAD_ID;
  +events: EventObservable<any>;
  +postMessage: (message: mixed, ports?: any) => mixed;
}
