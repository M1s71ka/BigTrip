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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const OffersByType = {
  TAXI: [0, 1],
  BUS: [0, 3, 5],
  TRAIN: [0, 3, 4, 5],
  SHIP: [],
  DRIVE: [3, 6],
  FLIGHT: [0, 1, 3, 5],
  CHECKIN: [2, 6],
  SIGHTSEEING: [6],
  RESTAURANT: [6],
};

const PhotosByDestination = {
  NEWYORK: [50],
  WASHINGTON: [60],
  SANFRANCISCO: [70],
  BOSTON: [80],
  LOSANGELES: [90],
};

const SortingType = {
  DATE: 'date',
  TIME: 'time',
  PRICE: 'price',
};

for (let i = 1; i <= 10; i++) {
  PATH_ID.push(i);
}

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const OffersPrice = {
  'Add luggage': 120,
  'Switch to comfort': 80,
  'Add meal': 20,
  'Choose seats': 50,
  'Upgrade to a business class': 150,
  'Extra Water': 5,
  'Order Uber': 30,
};

export { POINT_TYPES, OFFERS, DESTINATION_POINTS, POINTS_DESCRIPTIONS, ERROR_MESSAGES,
  PATH_ID, PointPrice, OffersPrice, FilterType, OffersByType, PhotosByDestination,
  SortingType, UserAction, UpdateType };
