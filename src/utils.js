import dayjs from 'dayjs';
import { createOffers } from './mock/mocks';

export const getRandomNumber = (minimum, maximum) => {
  minimum = Math.ceil(Math.min(Math.abs(minimum), Math.abs(maximum)));
  maximum = Math.floor(Math.max(Math.abs(minimum), Math.abs(maximum)));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

export const changeDateFormatToMonth = (dueDate) => dayjs(dueDate).format('MMM D');
export const getMinutesFromDate = (dueDate) => dayjs(dueDate).format('m');
export const getHoursFromDate = (dueDate) => dayjs(dueDate).format('h');

export const getOffers = (offers) => {
  const tripOffers = createOffers();
  let offersWrapper = '<div class="event__available-offers">';
  for (let i = 0; i < offers.length; i++) {
    for (let j = 0; j < tripOffers.length; j++) {
      if (offers[i] === tripOffers[j].id) {
        offersWrapper += `
				<div class="event__offer-selector">
					<input class="event__offer-checkbox  visually-hidden" id="event-offer-${tripOffers[j].title.toLowerCase().split(' ').join('')}-${tripOffers[j].id}"
					 type="checkbox" name="event-offer-${tripOffers[j].title.toLowerCase().split(' ').join('')}">
					<label class="event__offer-label" for="event-offer-${tripOffers[j].title.toLowerCase().split(' ').join('')}-${tripOffers[j].id}">
				  		<span class="event__offer-title">${tripOffers[j].title}</span>
				  		&plus;&euro;&nbsp;
				  	<span class="event__offer-price">${tripOffers[j].price}</span>
					</label>
				</div>`;
        break;
      }
    }
  }
  offersWrapper += '</div>';
  return offersWrapper;
};
