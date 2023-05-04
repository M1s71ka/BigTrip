import FiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import EditPointView from '../view/path-editing.js';
import PointView from '../view/path-pointing.js';
import { createElement, render, replace } from '../framework/render.js';

export default class DefaultMarkupPresenter {
  init(model) {
    this._model = model;
    this._filters = new FiltersView(this._model.points);
    this._sortingButtons = new SortingView();
    this._filtersWrapper = document.querySelector('.trip-controls__filters');
    this._tripPointsSection = document.querySelector('.trip-events');
    this._pointsList = document.querySelector('.trip-events__list');

    render(this._filters, this._filtersWrapper);
    if (this._model.points.length !== 0) {
      render(this._sortingButtons, this._tripPointsSection, 'afterbegin');
      for (let i = 0; i < 3; i++) {
        this._renderPathPoint(this._model.points[i]);
      }
    } else {
      const message = '<p class="trip-events__msg">Click New Event to create your first point</p>';
      this._tripPointsSection.append(createElement(message));
    }
  }

  _renderPathPoint(point) {
    const pathPoint = new PointView(point);
    const editMenu = new EditPointView(point);

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        replace(pathPoint, editMenu);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const swapEditMenuToPoint = () => {
      replace(pathPoint, editMenu);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const swapPointToEditMenu = () => {
      replace(editMenu, pathPoint);
      editMenu._setClickHandler(swapEditMenuToPoint);
      editMenu._setSaveButtonHandler(swapEditMenuToPoint);
      document.addEventListener('keydown', onEscKeyDown);
    };

    pathPoint._setClickHandler(swapPointToEditMenu);

    render(pathPoint, this._pointsList);
  }
}
