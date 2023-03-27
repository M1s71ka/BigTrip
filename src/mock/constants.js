const POINT_TYPES = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];
// const OFFERS = ["Add luggage", "Switch to comfort", "Add meal", "Choose seats", "Upgrade to a business class", "Extra Water", "Order Uber"];
const DESTINATION_POINTS = ["New York", "Washington", "San Francisco", "Boston"];
const POINTS_DESCRIPTIONS = ["Great place to visit!", "Wow, that place is amazing!", "You should visit this one."];
const ERROR_MESSAGES = ["Header Authorization is not correct", "Not found"];

const PointPrice = {
	MIN: 200,
	MAX: 1200,
};

const OffersPrice = {
	MIN: 15,
	MAX: 120,
};

const OffersByType = [
  {type: "taxi", offers : [{id: 1, title: "Order Uber", price: 120}]},
  {type: "bus", offers: [{id: 1, title: "Add luggage", price: 25}]},
  {type: "train", offers: [{id: 1, title: "Switch to comfort", price: 60}]},
  {type: "ship", offers: [{id: 1, title: "Choose seats", price: 90}]},
  {type: "drive", offers: [{id: 1, title: "Upgrade to a business class", price: 111}]},
  {type: "flight", offers: [{id: 1, title: "Choose seats", price: 109}]},
  {type: "check-in", offers: [{id: 1, title: "Switch to comfort", price: 54}]},
  {type: "sightseeing", offers: [{id: 1, title: "Extra Water", price: 21}]},
  {type: "restaurant", offers: [{id: 1, title: "Extra Water", price: 88}]}];
	
export { POINT_TYPES, DESTINATION_POINTS, POINTS_DESCRIPTIONS, ERROR_MESSAGES, PointPrice, OffersPrice, OffersByType };