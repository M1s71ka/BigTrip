import { POINT_TYPES, OFFERS, DESTINATION_POINTS, POINTS_DESCRIPTIONS, PATH_ID, PointPrice, OffersPrice} from './constants.js';
import { getRandomNumber, getOffersByPointType, getPhotosByDestination } from '../utils.js';
import dayjs from 'dayjs';

const offers = OFFERS.slice();
let idList = PATH_ID.slice();

const getPointDescription = () => {
  const destinationName = DESTINATION_POINTS[getRandomNumber(0, DESTINATION_POINTS.length - 1)];
  return {
    id: String(idList[0]),
    description: POINTS_DESCRIPTIONS[getRandomNumber(0, POINTS_DESCRIPTIONS.length - 1)],
    name: destinationName,
    pictures: [
      ...getPhotosByDestination(destinationName)
    ]
  };
};

const initRandomDate = () => {
  const dayFrom = getRandomNumber(1, 15);
  const dayTo = getRandomNumber(16, 31);
  return [dayjs().add(dayFrom, 'day').toDate(), dayjs().add(dayTo, 'day').toDate()];
};

export const createOffers = (offersByType) => {
  const tripOffers = [];
  for (let i = 0; i < offersByType.length; i++) {
    tripOffers[i] = {
      id: i + 1,
      title: offers[offersByType[i]],
      price: OffersPrice[offers[offersByType[i]]],
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
    id: String(idList[0]),
    isFavorite: false,
    offers: getOffersByPointType(pointType),
    type: pointType,
  };
  idList = idList.slice(1);
  return description;
};

