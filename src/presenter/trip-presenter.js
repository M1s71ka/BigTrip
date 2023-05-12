import FiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import { render } from '../framework/render.js';
import NoTaskView from '../view/no-task.js';
import PathPointPresenter from './point-presenter.js';
import { updatePoint } from '../utils.js';

export default class DefaultMarkupPresenter {
  #model = null;
  #filters = null;
  #sortingButtons = null;
  #noTaskComponent = null;
  #filtersWrapper = null;
  #tripPointsSection = null;
  #pointsList = null;
  #pointsData = null;
  #pointPresenter = null;

  constructor(model) {
	this.#model = model;
  }

  init() {
	this.#pointsData = [...this.#model.points]
    this.#filters = new FiltersView(this.#pointsData);
    this.#sortingButtons = new SortingView();
	this.#noTaskComponent = new NoTaskView();
	this.#pointPresenter = new Map();
    this.#filtersWrapper = document.querySelector('.trip-controls__filters');
    this.#tripPointsSection = document.querySelector('.trip-events');
    this.#pointsList = document.querySelector('.trip-events__list');

    this.#renderFiltersComponent();
    if (this.#pointsData.length !== 0) {
      this.#renderSortButtonsComponent();
      this.#renderPathPoints();
    } else {
		this.#renderNoTasksComponent();
    }
  }

  #changeModeHandler = () => {
	this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #pointChangeHandler = (updatedItem) => {
	this.#pointsData = updatePoint(this.#pointsData, updatedItem);
	this.#pointPresenter.get(updatedItem.id).init(updatedItem);
  };

  #renderNoTasksComponent = () => {
	render(this.#noTaskComponent, this.#tripPointsSection);
  };

  #renderSortButtonsComponent = () => {
	render(this.#sortingButtons, this.#tripPointsSection, 'afterbegin');
  };

  #renderFiltersComponent = () => {
	render(this.#filters, this.#filtersWrapper);
  };

  #renderPathPointComponent = (point, pointsList) => {
    const pathPoint = new PathPointPresenter(pointsList, this.#pointChangeHandler, this.#changeModeHandler);
	pathPoint.init(point);
	this.#pointPresenter.set(point.id, pathPoint);
  }

  #renderPathPoints = () => {
	for (let i = 0; i < this.#pointsData.length; i++) {
		this.#renderPathPointComponent(this.#model.points[i], this.#pointsList);
    }
  }
}
