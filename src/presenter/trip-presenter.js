import SortingView from '../view/sorting-view';
import { render, remove } from '../framework/render';
import NoTaskView from '../view/no-task-view';
import PointsBoard from '../view/points-board-view';
import PathPointPresenter from './point-presenter';
import { filter, sortPointByDateUp, sortPointsByPrice, sortPointsByTime } from '../utils';
import { FilterType, SortingType, UpdateType, UserAction } from '../constants';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const TimeLimit = {
	MIN: 350,
	MAX: 1000,
};

export default class DefaultMarkupPresenter {
  #pointsModel = null;
  #filtersModel = null;
  #sortingComponent = null;
  #noTaskComponent = null;
  #pointsBoardComponent = new PointsBoard();
  #tripPointsSection = null;
  #pointPresenter = null;
  #currentSortType = null;
  #filterType = null;
  #newPointPresenter = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.MIN, TimeLimit.MAX);

  constructor(pointsModel, filtersModel) {
	this.#pointsModel = pointsModel;
	this.#filtersModel = filtersModel;
	this.#pointsModel.addObserver(this.#handleModelEvent);
	this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
	this.#filterType = this.#filtersModel.filter;
	const points = this.#pointsModel.points;
	const filteredPoints = filter[this.#filterType](points);

	switch(this.#currentSortType) {
		case SortingType.DATE: 
			return filteredPoints.sort(sortPointByDateUp);
		case SortingType.TIME:
			return filteredPoints.sort(sortPointsByTime);
		case SortingType.PRICE:
			return filteredPoints.sort(sortPointsByPrice);
	}
  };

  init() {
	this.#currentSortType = SortingType.DATE;
	this.#filterType = FilterType.EVERYTHING;
	this.#pointPresenter = new Map();
    this.#tripPointsSection = document.querySelector('.trip-events');
	this.#renderPointsBoardComponent();
  }

  createTask = (callback) => {
	this.#currentSortType = SortingType.DATE;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback);
  };

  #changeModeHandler = () => {
	this.#newPointPresenter.destroy();
	this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleActionView = async (actionType, updateType, update) => {
	this.#uiBlocker.block();
	switch (actionType) {
		case UserAction.UPDATE_POINT:
			this.#pointPresenter.get(update.id).setSaving();
			try {
				await this.#pointsModel.updatePoint(updateType, update);
			} catch(err) {
				this.#pointPresenter.get(update.id).setAborting();
			}
			break;
		case UserAction.ADD_POINT:
			this.#newPointPresenter.setSaving();
			try {
				await this.#pointsModel.addPoint(updateType, update);
			} catch(err) {
				this.#pointPresenter.setAborting();
			}
			break;
		case UserAction.DELETE_POINT:
			this.#pointPresenter.get(update.id).setDeleting();
			try {
				await this.#pointsModel.deletePoint(updateType, update);
			} catch(err) {
				this.#pointPresenter.get(update.id).setAborting();
			}
			break;
	}
	this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
	switch (updateType) {
		case UpdateType.PATCH:
			this.#pointPresenter.get(data.id).init(data);
			break;
		case UpdateType.MINOR:
			this.#changeModeHandler();
			this.#clearPointsList();
			this.#renderPointsBoardComponent();
			break;
		case UpdateType.MAJOR:
			this.#changeModeHandler();
			this.#clearPointsList(true);
			this.#renderPointsBoardComponent();
			break;
		case UpdateType.INIT: {
			this.#isLoading = false;
			remove(this.#loadingComponent);
			this.#renderPointsBoardComponent();
			this.#createNewTaskPresenter();
			break;
		}
	}
  };

  #createNewTaskPresenter = () => {
	this.#newPointPresenter = new NewPointPresenter(this.#pointsBoardComponent, this.#handleActionView, this.#pointsModel.destinations, this.#pointsModel.offers);
  };

  #renderNoTasksComponent = () => {
	this.#noTaskComponent = new NoTaskView(this.#filterType);
	render(this.#noTaskComponent, this.#tripPointsSection);
  };

  #renderLoadingComponent = () => {
	render(this.#loadingComponent, this.#tripPointsSection);
  };

  #changeSortingType = (sortType) => {
	if (this.#currentSortType === sortType) {
		return;
	}
	this.#currentSortType = sortType;
	this.#changeModeHandler();
	this.#clearPointsList();
	this.#renderPointsBoardComponent();
  };

  #renderSortButtonsComponent = () => {
	this.#sortingComponent = new SortingView(this.#currentSortType)
	render(this.#sortingComponent, this.#tripPointsSection, 'afterbegin');
	this.#sortingComponent.setSortTypeChangeHandler(this.#changeSortingType);
  };

  #clearPointsList = (resetSortType = false) => {
	this.#pointPresenter.forEach((point) => point.destroyPathPoint());
	this.#pointPresenter.clear();

	remove(this.#sortingComponent);

	if(this.#noTaskComponent) {
		remove(this.#noTaskComponent);
	}

	if (resetSortType) {
		this.#currentSortType = SortingType.DATE;
	}
  };

  #renderPathPointComponent = (point, pointsList) => {
    const pathPoint = new PathPointPresenter(pointsList, this.#handleActionView, this.#changeModeHandler, this.#pointsModel.destinations,
	this.#pointsModel.offers);
	pathPoint.init(point);
	this.#pointPresenter.set(point.id, pathPoint);
  };

  #renderPointsBoardComponent = () => {
	if (this.#isLoading) {
		this.#renderLoadingComponent();
		return;
	}

	if (this.points.length === 0) {
		this.#renderNoTasksComponent(this.#filterType);
		return;
	}
	this.#renderSortButtonsComponent();
	render(this.#pointsBoardComponent, this.#tripPointsSection, 'beforeend');
	
	this.#renderPathPoints();

  };

  #renderPathPoints = () => {
	for (let i = 0; i < this.points.length; i++) {
		this.#renderPathPointComponent(this.points[i], this.#pointsBoardComponent.element);
    }
  };
}
