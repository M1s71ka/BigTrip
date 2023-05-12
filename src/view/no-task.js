import AbstractView from '../framework/view/abstract-view';

const createNoTaskTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoTaskView extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}
