import FiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import { render } from '../framework/render.js';
import NoTaskView from '../view/no-task.js';
import PointsBoard from '../view/points-board.js';
import PathPointPresenter from './point-presenter.js';
import { sortPointByDateUp, updatePoint, sortPointsByPrice, sortPointsByTime } from '../utils.js';
import { SortingType } from '../mock/constants.js';

export default class DefaultMarkupPresenter {
  #model = null;
  #filters = null;
  #sortingComponent = null;
  #noTaskComponent = null;
  #filtersWrapper = null;
  #pointsBoardComponent = null;
  #tripPointsSection = null;
  #pointsData = null;
  #sourcedPoints = null;
  #pointPresenter = null;
  #currentSortType = null;

  constructor(model) {
	this.#model = model;
  }

  init() {
	this.#pointsData = [...this.#model.points].sort(sortPointByDateUp);
	this.#sourcedPoints = [...this.#pointsData];
    this.#filters = new FiltersView(this.#pointsData);
    this.#sortingComponent = new SortingView();
	this.#noTaskComponent = new NoTaskView();
	this.#pointsBoardComponent = new PointsBoard();
	this.#pointPresenter = new Map();
    this.#filtersWrapper = document.querySelector('.trip-controls__filters');
    this.#tripPointsSection = document.querySelector('.trip-events');
	this.#currentSortType = SortingType.DATE;

    this.#renderFiltersComponent();
    if (this.#pointsData.length !== 0) {
      this.#renderSortButtonsComponent();
	  this.#renderPointsBoardComponent();
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

  #sortPoints = (sortType) => {
	switch(sortType) {
		case SortingType.PRICE:
			this.#pointsData.sort(sortPointsByPrice);
			break;
		case SortingType.TIME: {
			this.#pointsData.sort(sortPointsByTime);
			break;
		}
		default:
			this.#pointsData = [...this.#sourcedPoints];
	}
	this.#currentSortType = sortType;
  };

  #changeSortingType = (sortType) => {
	if (this.#currentSortType === sortType) {
		return;
	}
	this.#sortPoints(sortType);
	this.#clearPointsList();
	this.#renderPathPoints();
  };

  #renderSortButtonsComponent = () => {
	render(this.#sortingComponent, this.#tripPointsSection, 'afterbegin');
	this.#sortingComponent.setSortTypeChangeHandler(this.#changeSortingType);
  };

  #renderFiltersComponent = () => {
	render(this.#filters, this.#filtersWrapper);
  };

  #clearPointsList = () => {
	this.#pointPresenter.forEach((point) => point.destroyPathPoint());
  };

  #renderPathPointComponent = (point, pointsList) => {
    const pathPoint = new PathPointPresenter(pointsList, this.#pointChangeHandler, this.#changeModeHandler);
	pathPoint.init(point);
	this.#pointPresenter.set(point.id, pathPoint);
  };

  #renderPointsBoardComponent = () => {
	render(this.#pointsBoardComponent, this.#tripPointsSection, 'beforeend');
	this.#renderPathPoints();
  };

  #renderPathPoints = () => {
	for (let i = 0; i < this.#pointsData.length; i++) {
		this.#renderPathPointComponent(this.#pointsData[i], this.#pointsBoardComponent.element);
    }
  };
}
