import FiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import PathMenuView from '../view/path-creating.js';
import EditPointView from '../view/path-editing.js';
import PointView from '../view/path-pointing.js';
import { render } from '../render.js';

export default class DefaultMarkupPresenter {
  #model = null;
  #filters = null;
  #sortingButtons = null;
  #pointMenu = null;
  #editMenu = null;
  #pathPoint = null;
  #filtersWrapper = null;
  #tripPointsSection = null;
  #pointsList = null;
  init(model) {
    this.#model = model;
    this.#filters = new FiltersView();
    this.#sortingButtons = new SortingView();
    // this.#pointMenu = new PathMenuView(this.#model.points[0]);
    // this.#editMenu = new EditPointView(this.#model.points[1]);
    this.#filtersWrapper = document.querySelector('.trip-controls__filters');
    this.#tripPointsSection = document.querySelector('.trip-events');
    this.#pointsList = document.createElement('ul');

    render(this.#filters.element, this.#filtersWrapper);
    render(this.#sortingButtons.element, this.#tripPointsSection);
    this.#pointsList.classList.add('.trip-events__list');
    render(this.#pointsList, this.#tripPointsSection);
    // render(this.#pointMenu.element, this.#pointsList);
    // render(this.#editMenu.element, this.#pointsList);
    for (let i = 0; i < 3; i++) {
	  this.#renderPathPoint(this.#model.points[i]);
    }	
  }

  #renderPathPoint = (point) => {
    const pathPoint = new PointView(point);
	const editMenu = new EditPointView(point);
	const pointElement = pathPoint.element;
	const editMenuElement = editMenu.element;

	const onEscKeyDown = (evt) => {
		if (evt.keyCode === 27) {
			evt.preventDefault();
			this.#pointsList.replaceChild(pointElement, editMenuElement);
			document.removeEventListener('keydown', onEscKeyDown);
			pointElement.querySelector('.event__rollup-btn').addEventListener('click', swapPointToEditMenu);
		}
	}

	const swapPointToEditMenu = (evt) => {
		evt.preventDefault();
		this.#pointsList.replaceChild(editMenuElement, pointElement);
		editMenuElement.querySelector('.event__save-btn').addEventListener('click', swapEditMenuToPoint);
        editMenuElement.querySelector('.event__rollup-btn').addEventListener('click', swapEditMenuToPoint);
		pointElement.querySelector('.event__rollup-btn').removeEventListener('click', swapPointToEditMenu);
		document.addEventListener('keydown', onEscKeyDown);
	}

	const swapEditMenuToPoint = (evt) => {
		evt.preventDefault();
		this.#pointsList.replaceChild(pointElement, editMenuElement);
		editMenuElement.querySelector('.event__save-btn').removeEventListener('click', swapEditMenuToPoint);
		editMenuElement.querySelector('.event__rollup-btn').removeEventListener('click', swapEditMenuToPoint);
		pointElement.querySelector('.event__rollup-btn').addEventListener('click', swapPointToEditMenu);
	}

	pointElement.querySelector('.event__rollup-btn').addEventListener('click', swapPointToEditMenu);
	
	render(pointElement, this.#pointsList);
  }
}
