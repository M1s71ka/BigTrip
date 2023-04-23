import dayjs from 'dayjs';
import { getMinutesFromDate, getHoursFromDate, changeDateFormatToMonth } from '../utils.js';
import { createOffers } from '../mock/mocks.js';
import AbstractView from '../framework/view/abstract-view.js';

const getDatesDifference = (dateFrom, dateTo) => {
  const departureDay = dayjs(dateFrom);
  const arrivingDay = dayjs(dateTo);
  const minutesDifference = getMinutesFromDate(dateTo) - getMinutesFromDate(dateFrom);
  const hoursDifference = getHoursFromDate(dateTo) - getHoursFromDate(dateFrom);
  return [arrivingDay.diff(departureDay, 'd'), minutesDifference, hoursDifference];
};

const getSelectedOffers = (offers) => {
  const tripOffers = createOffers();
  let selectedOffersWrapper = '<ul class="event__selected-offers">';
  for (let i = 0; i < offers.length; i++) {
    for (let j = 0; j < tripOffers.length; j++) {
      if (offers[i] === tripOffers[j].id) {
        selectedOffersWrapper +=
				`<li class="event__offer">
					<span class="event__offer-title">${tripOffers[j].title}</span>
					&plus;&euro;&nbsp;
					<span class="event__offer-price">${tripOffers[j].price}</span>
	  			</li>`;
        break;
      }
    }
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
		  <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
		  &mdash;
		  <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
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
  constructor(point) {
	super();
    this._point = point;
  }

  get template() {
    return createPathPoint(this._point);
  };

  _setClickHandler = (callback) => {
	this._callback.expand = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._expand);
  };

  _expand = (evt) => {
	evt.preventDefault();
	this._callback.expand();
  }
}
