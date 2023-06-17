import ApiService from "./framework/api-service";

const Method = {
	GET: 'GET',
	PUT: 'PUT',
}

export default class PointsApiService extends ApiService {
	get points() {
		return this._load({url: 'points'})
		  .then(ApiService.parseResponse);
	};

	get destinations() {
		return this._load({url:'destinations'})
		  .then(ApiService.parseResponse);
	};

	get offers() {
		return this._load({url:'offers'})
		  .then(ApiService.parseResponse);
	};

	updatePoint = async (point) => {
		console.log(point);
		const response = await this._load({
			url: `points/${point.id}`,
			method: Method.PUT,
			body: JSON.stringify(this.#adaptToServer(point)),
			headers: new Headers({'Content-Type': 'application/json'}),
		});

		console.log(JSON.stringify(this.#adaptToServer(point)));
		const parsedResponse = await ApiService.parseResponse(response);

		return parsedResponse;
	}

	#adaptToServer = (point) => {
		const adaptedPoint = {
			...point,
			base_price: point.basePrice,
			date_from: point.dateFrom,
			date_to: point.dateTo,
			destination: point.destination.id,
			is_favorite: point.isFavorite,
			offers: [1],
		};

		delete adaptedPoint.basePrice;
		delete adaptedPoint.dateFrom;
		delete adaptedPoint.dateTo;
		delete adaptedPoint.isFavorite;

		return adaptedPoint;
	};
}