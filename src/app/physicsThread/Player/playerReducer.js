// @flow
import { createReducer } from '../../../common/utils/reducerUtils';

import {
  PLAYER_LOADED,
  PLAYER_CHANGED_ROTATION,
  PLAYER_JUMPED,
  PLAYER_STOPED_JUMPING,
} from './playerConstants';

const initialState = {
  mainPlayerId: null,
  instances: {},
};

function onPlayerLoaded(state, { playerData, mainPlayer }) {
  if (mainPlayer) {
    return {
      ...state,
      mainPlayerId: playerData.id,
      instances: {
        ...state.instances,
        [playerData.id]: playerData,
      },
    };
  }
  return state;
}

const onPlayerChangeRotation = (state, { id, horizontalRotate, verticalRotate }) => ({
  ...state,
  instances: {
    ...state.instances,
    [id]: {
      ...state.instances[id],
      horizontalRotate,
      verticalRotate,
    },
  },
});

const onPlayerJumped = (state, { id }) => ({
  ...state,
  instances: {
    ...state.instances,
    [id]: {
      ...state.instances[id],
      jumping: true,
    },
  },
});

const onPlayerStopedJumping = (state, { id }) => ({
  ...state,
  instances: {
    ...state.instances,
    [id]: {
      ...state.instances[id],
      jumping: false,
    },
  },
});

const onPlayerStartedRemoveBlock = (state, { id, removingBlock }) => ({
  ...state,
  instances: {
    ...state.instances,
    [id]: {
      ...state.instances[id],
      removingBlock,
    },
  },
});

const onPlayerStopedRemoveBlock = (state, { id, removingBlock }) => ({
  ...state,
  instances: {
    ...state.instances,
    [id]: {
      ...state.instances[id],
      removingBlock,
    },
  },
});

export default createReducer(initialState, {
  [PLAYER_LOADED]: onPlayerLoaded,
  [PLAYER_CHANGED_ROTATION]: onPlayerChangeRotation,
  [PLAYER_JUMPED]: onPlayerJumped,
  [PLAYER_STOPED_JUMPING]: onPlayerStopedJumping,
  // [PLAYER_STARTED_REMOVE_BLOCK]: onPlayerStartedRemoveBlock,
  // [PLAYER_STOPED_REMOVE_BLOCK]: onPlayerStopedRemoveBlock,
});
