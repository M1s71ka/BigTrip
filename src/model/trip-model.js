import { createPointDescription } from '../mock/mocks';
import Observable from '../framework/observable';

export default class TripModel extends Observable {
  #points = Array.from({length: 5}, createPointDescription);

  get points() {
    return this.#points;
  }

  set points(newPoints) {
	this.#points = newPoints;
  }

  updatePoint = (updateType, update) => {
	const index = this.#points.findIndex((item) => item.id === update.id);
  
	if (index === -1) {
	  throw new Error ('Can\'t update unexisting point');
	}
  
	this.#points = [
	  ...this.#points.slice(0, index),
	  update,
	  ...this.#points.slice(index + 1)
	];

	this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
	this.#points = [
		update,
		...this.#points
	];

	this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
	const index = this.#points.findIndex((item) => item.id === update.id);

	if (index === -1) {
		throw new Error('Can\'t delete unexisting point');
	}

	this.#points = [
		...this.#points.slice(0, index),
		...this.#points.slice(index + 1)
	];

	this._notify(updateType);
  };
}
