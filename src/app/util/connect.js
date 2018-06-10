// @flow
import shallowEqual from './shallowEqual';

type MapActions = () => {| [string]: Function |};

export default function connect(mapState: ?Function, mapActions: ?MapActions, store: Object) {
  return function decorator(Target: Function) {
    if (!store) {
      return Target;
    }
    class Connected extends Target {
      constructor(...params) {
        super(...params);
        try {
          if (mapState) {
            let prevProps = mapState(store.getState(), this);
            this[Symbol('unsubscribe')] = store.subscribe(() => {
              const nextProps = mapState(store.getState(), this);
              if (shallowEqual(prevProps, nextProps)) {
                return;
              }
              if (this.componentDidUpdate) {
                Object.assign(this, nextProps);
                const arg = prevProps; // needed in case if update will throw and fall down to infinite loop
                prevProps = nextProps;
                this.componentDidUpdate(arg);
              } else {
                Object.assign(this, nextProps);
              }
            });
            Object.assign(this, prevProps);
            if (this.componentDidMount) {
              this.componentDidMount();
            }
          }
        } catch (e) {
          console.error(e.stack);
        }
      }
    }
    if (mapActions) {
      for (const [key, action] of Object.entries(mapActions())) {
        Connected.prototype[key] = (...params) => store.dispatch(action(...params));
      }
    }
    return Connected;
  };
}
