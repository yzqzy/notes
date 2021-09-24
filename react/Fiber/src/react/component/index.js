import { scheduleUpdate } from '../reconciliation/index';

export class Component {
  constructor (props) {
    this.props = props;
  }

  setState (partialState) {
    scheduleUpdate(this, partialState);
  }
}