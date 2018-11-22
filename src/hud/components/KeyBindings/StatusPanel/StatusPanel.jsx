// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { State } from '../../../../reducers/rootReducer';
import Label from '../../../uiElements/Label';
import { labelCommandGroup } from './statusPanel.scss';

type StateProps = {|
  +statusText: string,
|};

type Props = StateProps;

const StatusPanel = ({ statusText }: Props) =>
  <Label text={statusText} size="small" className={labelCommandGroup} />;

const mapState = (state: State) => ({
  statusText: state.keyBindings.status,
});

export default connect(mapState, null)(StatusPanel);