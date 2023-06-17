import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../mock/constants';

const NoPointMessage = {
	[FilterType.EVERYTHING]: 'Click New Event to create your first point',
	[FilterType.FUTURE]: 'There are no future events now',
	[FilterType.PAST]: 'There are no past events now',
}

const createNoTaskTemplate = (filterType) => {
	const noPointMessage = NoPointMessage[filterType];
	return (
		`<p class="trip-events__msg">${noPointMessage}</p>`
	);
}

export default class NoTaskView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
	super();
	this.#filterType = filterType;
  }

  get template() {
    return createNoTaskTemplate(this.#filterType);
  }
}
