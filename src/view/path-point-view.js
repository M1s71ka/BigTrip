import { getDatesDifferenceByTimeType, changeDateFormatToMonth, changeDateFormatToHours } from '../utils';
import AbstractView from '../framework/view/abstract-view';

const getDatesDifference = (dateFrom, dateTo) => {
  const daysDifference = getDatesDifferenceByTimeType(dateTo, dateFrom, 'd');
  const hoursDifference = getDatesDifferenceByTimeType(dateTo, dateFrom,'h');
  const minutesDifference = getDatesDifferenceByTimeType(dateTo, dateFrom,'m');
  return [daysDifference, hoursDifference, minutesDifference];
};

const getSelectedOffers = (offers) => {
  let selectedOffersWrapper = '<ul class="event__selected-offers">';
    for (let i = 0; i < offers.length; i++) {
        selectedOffersWrapper +=
				`<li class="event__offer">
					<span class="event__offer-title">${offers[i].title}</span>
					&plus;&euro;&nbsp;
					<span class="event__offer-price">${offers[i].price}</span>
	  			</li>`;
      }
  selectedOffersWrapper += '</ul>';
  return selectedOffersWrapper;
};


const createPathPoint = (point) => {
  const {type, basePrice, destination, dateFrom, dateTo, offers} = point;
  return(
    `<li class="trip-events__item">
	<div class="event">
	  <time class="event__date" datetime="2019-03-18">${changeDateFormatToMonth(dateFrom)}</time>
	  <div class="event__type">
		<img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
	  </div>
	  <h3 class="event__title">${type.slice(0,1).toUpperCase() + type.slice(1)} ${destination.name}</h3>
	  <div class="event__schedule">
		<p class="event__time">
		  <time class="event__start-time" datetime="2019-03-18T10:30">${changeDateFormatToHours(dateFrom)}</time>
		  &mdash;
		  <time class="event__end-time" datetime="2019-03-18T11:00">${changeDateFormatToHours(dateTo)}</time>
		</p>
		<p class="event__duration">${getDatesDifference(dateFrom,dateTo)[0]}D ${getDatesDifference(dateFrom,dateTo)[1]}H
		 ${getDatesDifference(dateFrom,dateTo)[2]}M</p>
	  </div>
	  <p class="event__price">
		&euro;&nbsp;<span class="event__price-value">${basePrice}</span>
	  </p>
	  <h4 class="visually-hidden">Offers:</h4>
	  ${getSelectedOffers(offers)}
	  <button class="event__favorite-btn event__favorite-btn--active" type="button">
		<span class="visually-hidden">Add to favorite</span>
		<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
		  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
		</svg>
	  </button>
	  <button class="event__rollup-btn" type="button">
		<span class="visually-hidden">Open event</span>
	  </button>
	</div>
  </li>`);
};

export default class PointView extends AbstractView {
  #point = null;

  init(point) {
	this.#point = point;
  }

  get template() {
    return createPathPoint(this.#point);
  };

  setClickHandler = (callback) => {
	this._callback.expand = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#expand);
  };

  setClickFavouriteHandler = (callback) => {
	this._callback.favourite = callback;
	this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#setFavourite);
  };

  #expand = (evt) => {
	evt.preventDefault();
	this._callback.expand();
  };

  #setFavourite = (evt) => {
	evt.preventDefault();
	this._callback.favourite();
  };
}
