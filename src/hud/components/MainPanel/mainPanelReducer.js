// @flow strict
import type { SlotID } from '../../../../common/Inventory';
import { createReducer } from '../../../util/reducerUtils';
import {
  PREVIOUS_ITEM_SELECTED,
  NEXT_ITEM_SELECTED,
  SWAP_MAIN_PANEL_ITEMS,
  DELETE_MAIN_PANEL_ITEMS,
  COPY_MAIN_PANEL_ITEMS,
} from './mainPanelConstants';

type MainPanel = {|
  selectedItemIndex: number;
  slots: $ReadOnlyArray<SlotID | null>;
|}

const initialState = {
  selectedItemIndex: 0,
  slots: (new Array(10)).fill(null),
};

const swap = (arr, from, to) => {
  const copy = arr.slice();
  const tmp = copy[from];
  copy[from] = copy[to];
  copy[to] = tmp;
  return copy;
};

const setItem = (arr, from, value) => {
  const copy = arr.slice();
  copy[from] = value;
  return copy;
};

export default createReducer<MainPanel>(initialState, {
  [NEXT_ITEM_SELECTED]: state => ({
    ...state,
    selectedItemIndex: (state.selectedItemIndex + 1) % state.slots.length,
  }),
  [PREVIOUS_ITEM_SELECTED]: state => ({
    ...state,
    selectedItemIndex: (state.slots.length + state.selectedItemIndex - 1) % state.slots.length,
  }),
  [SWAP_MAIN_PANEL_ITEMS]: (state, data) => ({
    ...state,
    slots: swap(state.slots, data.from, data.to),
  }),
  [DELETE_MAIN_PANEL_ITEMS]: (state, data) => ({
    ...state,
    slots: setItem(state.slots, data.from, null),
  }),
  [COPY_MAIN_PANEL_ITEMS]: (state, data) => ({
    ...state,
    slots: setItem(state.slots, data.to, data.value),
  }),
});
