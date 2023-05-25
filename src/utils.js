import dayjs from 'dayjs';
import { createOffers } from './mock/mocks';

const getRandomNumber = (minimum, maximum) => {
  minimum = Math.ceil(Math.min(Math.abs(minimum), Math.abs(maximum)));
  maximum = Math.floor(Math.max(Math.abs(minimum), Math.abs(maximum)));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

const changeDateFormatToMonth = (dueDate) => dayjs(dueDate).format('MMM D');
const getMinutesFromDate = (dueDate) => dayjs(dueDate).format('m');
const getHoursFromDate = (dueDate) => dayjs(dueDate).format('h');

const getOffers = (offers) => {
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

const updatePoint = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const getWeightForNullDate = (dateA, dateB) => {
	if (dateA === null && dateB === null) {
		return 0;
	}

	if (dateA === null) {
		return 1;
	}

	if (dateB === null) {
		return -1;
	}

	return null;
};

const sortPointByDateUp = (pointA, pointB) => {
	const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
	return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointsByPrice = (pointA, pointB) => {
	return pointB.basePrice - pointA.basePrice
};

const sortPointsByTime = (pointA, pointB) => {
	//Возможно нужна проверка на null, проверить, когда будет сервер.
	return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'd') - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'd');
};

export {getRandomNumber, changeDateFormatToMonth, getMinutesFromDate, getHoursFromDate, getOffers, updatePoint, sortPointByDateUp, sortPointsByPrice,
sortPointsByTime};
