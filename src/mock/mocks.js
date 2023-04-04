import { POINT_TYPES, OFFERS, DESTINATION_POINTS, POINTS_DESCRIPTIONS, PointPrice, OffersPrice} from './constants.js';
import { getRandomNumber } from '../utils.js';
import dayjs from 'dayjs';

const offers = OFFERS.slice();

const getPointDescription = () => (
  {
    id: '',
    description: POINTS_DESCRIPTIONS[getRandomNumber(0, POINTS_DESCRIPTIONS.length - 1)],
    name: DESTINATION_POINTS[getRandomNumber(0, DESTINATION_POINTS.length - 1)],
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomNumber(50, 100)}`,
        description: POINTS_DESCRIPTIONS[getRandomNumber(0, POINTS_DESCRIPTIONS.length - 1)],
      }
    ]
  }
);

const initRandomDate = () =>  {
  const dayFrom = getRandomNumber(1, 15);
  const dayTo = getRandomNumber(16, 31);
  return [dayjs().add(dayFrom, 'day').toDate(), dayjs().add(dayTo, 'day').toDate()];
};

export const createOffers = () => {
  const tripOffers = [];
  for (let i = 0; i < offers.length; i++) {
    tripOffers[i] = {
      id: i + 1,
      title: offers[i],
      price: getRandomNumber(OffersPrice.MIN, OffersPrice.MAX),
    };
  }
  return tripOffers;
};

export const createPointDescription = () => {
  const pointType = POINT_TYPES[getRandomNumber(0, POINT_TYPES.length - 1)];
  const randomDates = [...initRandomDate()];
  const description = {
    basePrice: getRandomNumber(PointPrice.MIN, PointPrice.MAX),
    dateFrom: randomDates[0],
    dateTo: randomDates[1],
    destination: getPointDescription(),
    id: '',
    isFavorite: false,
    offers: [getRandomNumber(1, offers.length)],
    type: pointType,
  };
  return description;
};

