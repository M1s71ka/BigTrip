const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFERS = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Upgrade to a business class', 'Extra Water', 'Order Uber'];
const DESTINATION_POINTS = ['New York', 'Washington', 'San Francisco', 'Boston', 'Los Angeles'];
const POINTS_DESCRIPTIONS = ['Great place to visit!', 'Wow, that place is amazing!', 'You should visit this one.'];
const ERROR_MESSAGES = ['Header Authorization is not correct', 'Not found'];
const PATH_ID = [];

const PointPrice = {
  MIN: 200,
  MAX: 1200,
};

const OffersPrice = {
  MIN: 15,
  MAX: 120,
};

const SortingType = {
  DATE: 'date',
  TIME: 'time',
  PRICE: 'price',
};

for (let i = 1; i <= 10; i++) {
  PATH_ID.push(i);
}

export { POINT_TYPES, OFFERS, DESTINATION_POINTS, POINTS_DESCRIPTIONS, ERROR_MESSAGES, PATH_ID, PointPrice, OffersPrice, SortingType };
