import AbstractView from '../framework/view/abstract-view.js';
import { SortingType } from '../constants.js';

const createSortingTemplate = (sortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
	<div class="trip-sort__item  trip-sort__item--day">
	  <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${sortType === 'date'? 'checked' : ''}>
	  <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortingType.DATE}">Day</label>
	</div>

	<div class="trip-sort__item  trip-sort__item--event">
	  <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
	  <label class="trip-sort__btn" for="sort-event">Event</label>
	</div>

	<div class="trip-sort__item  trip-sort__item--time">
	  <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${sortType === 'time'? 'checked' : ''}>
	  <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortingType.TIME}">Time</label>
	</div>

	<div class="trip-sort__item  trip-sort__item--price">
	  <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${sortType === 'price'? 'checked' : ''}>
	  <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortingType.PRICE}">Price</label>
	</div>

	<div class="trip-sort__item  trip-sort__item--offer">
	  <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
	  <label class="trip-sort__btn" for="sort-offer">Offers</label>
	</div>
  </form>`
);

export default class SortingView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this. #sortType = sortType;
  }

  get template() {
    return createSortingTemplate(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.changeSortType = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if ((evt.target.dataset.sortType === undefined)) {
      return;
    }
    this._callback.changeSortType(evt.target.dataset.sortType);
  };
}
