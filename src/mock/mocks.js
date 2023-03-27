import { POINT_TYPES, OFFERS, DESTINATION_POINTS, POINTS_DESCRIPTIONS, ERROR_MESSAGES, PointPrice, OffersPrice, OffersByType } from './constants.js';
import { getRandomNumber } from '../utils.js';

const getPointDescription = (id) => (
	{
		id,
		description: POINTS_DESCRIPTIONS[getRandomNumber(0, POINTS_DESCRIPTIONS.length - 1)],
		name: DESTINATION_POINTS[getRandomNumber(0, DESTINATION_POINTS.length - 1)],
		pictures: [
			{
				src: `http://picsum.photos/id/${getRandomNumber(50, 1000)}/300/200`,
				description: POINTS_DESCRIPTIONS[getRandomNumber(0, POINTS_DESCRIPTIONS.length - 1)],
			}
		]
	}
);

export const createPointDescription = () => (
	{
		base_price: getRandomNumber(PointPrice.MIN, PointPrice.MAX),
		date_from: null,
		date_to: null,
		destination: getPointDescription(1),
		id: '1',
		is_favorite: false,
		offers: [1],
		type: POINT_TYPES[getRandomNumber(0, POINT_TYPES.length - 1)],
	}
)	
		
	
	