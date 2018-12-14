// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Label from '../../uiElements/Label';
import ModalWindow from '../../uiElements/ModalWindow';
import { INVENTORY } from './inventoryConstants';
import { setUIState as doSetUIState } from '../../utils/StateRouter';

import {
  inventory,
  inventorySlots,
  slot as slotStyle,
  coins,
  coin,
  label,
  empty,
  content,
  gold,
  silver,
  bronze,
  icon,
} from './inventory.module.scss';
import InventorySlot from '../../uiElements/InventorySlot';
import type { InventorySlotDetails } from '../../uiElements/InventorySlot/InventorySlot';

type MappedProps = {|
  +slots: $ReadOnlyArray<InventorySlotDetails>;
|};

type DispatchProps = {|
  +setUIState: typeof doSetUIState,
|};

type Props = MappedProps & DispatchProps;

const Footer = () => (
  <footer className={coins}>
    <div className={`${coin} ${gold}`}>
      <Label className={icon}>🔘</Label>
      <Label className={label}>gold</Label>
    </div>
    <div className={`${coin} ${silver}`}>
      <Label className={icon}>🔘</Label>
      <Label className={label}>silver</Label>
    </div>
    <div className={`${coin} ${bronze}`}>
      <Label className={icon}>🔘</Label>
      <Label className={label}>bronze</Label>
    </div>
  </footer>
);

const Inventory = ({ setUIState, slots }: Props) => {
  const close = useCallback(() => setUIState(INVENTORY, false));
  return (
    <ModalWindow caption="author's inventory" onClose={close}>
      <div className={content}>
        <div className={inventory}>
          <ul className={inventorySlots}>
            { slots.map(slot =>
              (slot
                ? <InventorySlot slot={slot} />
                : <li className={`${slotStyle} ${empty}`} />))
            }
          </ul>
        </div>
        <Footer />
      </div>
    </ModalWindow>
  );
};

const getPlaceholderSlots = (count: number) =>
  (new Array(count)).fill(null);


const imageSlots = (new Array(46)).fill(0).map((_, index) => ({
  count: index,
  image: `${Math.random() > 0.5 ? 'diamond' : 'ironIngot'}`,
}));

const mapState = () => ({
  slots: imageSlots.concat(getPlaceholderSlots(imageSlots.length)),
});

const mapActions = {
  setUIState: doSetUIState,
};

export default connect(mapState, mapActions)(Inventory);
