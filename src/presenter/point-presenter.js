import EditPointView from '../view/path-edit-view.js';
import PointView from '../view/path-point-view.js';
import { remove, render, replace } from '../framework/render.js';

const Mode = {
	DEFAULT: 'DEFAULT',
	EDITING: 'EDITING'
}

export default class PathPointPresenter {
	#point = null;
	#pathPoint = null;
	#editMenu = null;
	#pointsList = null;
	#changeData = null;
	#mode = Mode.DEFAULT;
	#changeMode = null;

	constructor(pointsList, changeData, changeMode) {	
		this.#pointsList = pointsList;
		this.#changeData = changeData;
		this.#changeMode = changeMode;
	}

	init(point) {
		this.#point = point;
		const prevPathPoint = this.#pathPoint;
		const prevEditMenu = this.#editMenu;
		this.#pathPoint = new PointView(); 
		this.#pathPoint.init(this.#point);
    	this.#editMenu = new EditPointView(this.#point);
		this.#pathPoint.setClickHandler(this.#swapPointToEditMenu);
		this.#pathPoint.setClickFavouriteHandler(this.#setFavouritePoint);

		if (prevPathPoint === null || prevEditMenu == null) {
			render(this.#pathPoint, this.#pointsList);
			return;
		}
		
		if (this.#mode === Mode.DEFAULT) {
			replace(this.#pathPoint, prevPathPoint);
		}

		if (this.#mode === Mode.EDITING) {
			replace(this.#editMenu, prevEditMenu);
		}

		remove(prevPathPoint);
		remove(prevEditMenu);
	};

	resetView = () => {
		if (this.#mode !== Mode.DEFAULT) {
			this.#swapEditMenuToPoint();
		}
	};

	destroyPathPoint = () => {
		remove(this.#pathPoint);
	}

	#onEscKeyDown = (evt) => {
		if (evt.keyCode === 27) {
		  evt.preventDefault();
		  replace(this.#pathPoint, this.#editMenu);
		  this.#changeData('UPDATE_POINT', 'PATCH', this.#point)
		  document.removeEventListener('keydown', this.#onEscKeyDown);
		  this.#mode = Mode.DEFAULT;
		}
	};

	#swapEditMenuToPoint = () => {
		replace(this.#pathPoint, this.#editMenu);
		document.removeEventListener('keydown', this.#onEscKeyDown);
		this.#mode = Mode.DEFAULT;
	};

	#swapPointToEditMenu = () => {
		replace(this.#editMenu, this.#pathPoint);
		this.#editMenu.setClickHandler(this.#rollUpCardHandler);
		this.#editMenu.setFormSubmitHandler(this.#submitFormHandler);
		this.#editMenu.setDeletePointHandler(this.#deletePointHandler);
		document.addEventListener('keydown', this.#onEscKeyDown);
		this.#changeMode();
		this.#mode = Mode.EDITING;
	};

	#submitFormHandler = (update) => {
		this.#swapEditMenuToPoint();
		if (JSON.stringify(this.#point) === JSON.stringify(update)) {
			return;
		}
		this.#changeData('UPDATE_POINT', 'MINOR', update);
	};

	#rollUpCardHandler = (startState) => {
		this.#swapEditMenuToPoint();
		this.#changeData('UPDATE_POINT', 'PATCH', startState);
	};

	#deletePointHandler = (pointToDelete) => {
		this.#swapEditMenuToPoint();
		this.#changeData('DELETE_POINT', 'MINOR', pointToDelete);
	};

	#setFavouritePoint = () => {
		this.#changeData('UPDATE_POINT','PATCH',{...this.#point, isFavorite: !this.#point.isFavorite})
	};
}