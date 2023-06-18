import Observable from '../framework/observable';
import { UpdateType } from '../constants';

export default class TripModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor(pointsApiService) {
	super();
	this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
	return this.#destinations;
  }

  get offers() {
	return this.#offers;
  }

  set points(newPoints) {
	this.#points = newPoints;
  }

  init = async () => {
	try {
		const points = await this.#pointsApiService.points;
		const destinations = await this.#pointsApiService.destinations;
		const offers = await this.#pointsApiService.offers;
		this.#destinations = destinations;
		this.#offers = offers;
		this.#points = points.map(this.#adaptToClient);
	} catch(err) {
		this.#points = [];
		this.#destinations = [];
		this.#offers = [];
	}

	this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
	const index = this.#points.findIndex((item) => item.id === update.id);
  
	if (index === -1) {
	  throw new Error ('Can\'t update unexisting point');
	}
  
	try {
		const response = await this.#pointsApiService.updatePoint(update);
		const updatedPoint = this.#adaptToClient(response);
		this.#points = [
			...this.#points.slice(0, index),
			update,
			...this.#points.slice(index + 1)
		];
		this._notify(updateType, updatedPoint);
	} catch(err) {
		throw new Error('Couldn\'t update this point');
	}
};

  addPoint = async (updateType, update) => {
	try {
		const response = await this.#pointsApiService.addPoint(update);
		const newPoint = this.#adaptToClient(response);
		this.#points = [
			newPoint,
			...this.#points
		];
	} catch(err) {
		throw new Error('Couldn\'t create new point')
	}
	
	this._notify(updateType, update);
  };

  deletePoint = async (updateType, update) => {
	const index = this.#points.findIndex((item) => item.id === update.id);

	if (index === -1) {
		throw new Error('Can\'t delete unexisting point');
	}

	try {
		await this.#pointsApiService.deletePoint(update);
		this.#points = [
			...this.#points.slice(0, index),
			...this.#points.slice(index + 1)
		];
	} catch(err) {
		throw new Error('Couldn\'t delete this point');
	}

	this._notify(updateType);
  };

  #adaptToClient = (point) => {
	const adaptedPoint = {
		...point,
		basePrice: point['base_price'],
		dateFrom: point['date_from'],
		dateTo: point['date_to'],
		destination: this.destinations.find((destination) => destination.id === point['destination']),
		isFavorite: point['is_favorite'],
		offers: this.offers.find((offer) => offer.type === point.type).offers.filter((offer) => point.offers.includes(offer.id)),
	};

	delete adaptedPoint['base_price'];
	delete adaptedPoint['date_from'];
	delete adaptedPoint['date_to'];
	delete adaptedPoint['is_favorite'];

	return adaptedPoint;
  };
}
