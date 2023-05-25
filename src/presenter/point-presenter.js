import EditPointView from '../view/path-editing.js';
import PointView from '../view/path-pointing.js';
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
		this.#pathPoint = new PointView(this.#point);
    	this.#editMenu = new EditPointView(this.#point);
		this.#pathPoint._setClickHandler(this.#swapPointToEditMenu);
		this.#pathPoint._setClickFavouriteHandler(this.#setFavouritePoint);

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
		  document.removeEventListener('keydown', this.#onEscKeyDown);
		  
		}
	};

	#swapEditMenuToPoint = () => {
		replace(this.#pathPoint, this.#editMenu);
		document.removeEventListener('keydown', this.#onEscKeyDown);
		this.#mode = Mode.DEFAULT;
	};

	#swapPointToEditMenu = () => {
		replace(this.#editMenu, this.#pathPoint);
		this.#editMenu._setClickHandler(this.#swapEditMenuToPoint);
		this.#editMenu._setSaveButtonHandler(this.#swapEditMenuToPoint);
		document.addEventListener('keydown', this.#onEscKeyDown);
		this.#changeMode();
		this.#mode = Mode.EDITING;
	};

	#setFavouritePoint = () => {
		this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite})
	}
}