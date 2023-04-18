import FiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import EditPointView from '../view/path-editing.js';
import PointView from '../view/path-pointing.js';
import { render } from '../render.js';

export default class DefaultMarkupPresenter {
  init(model) {
    this._model = model;
    this._filters = new FiltersView();
    this._sortingButtons = new SortingView();
    this._filtersWrapper = document.querySelector('.trip-controls__filters');
    this._tripPointsSection = document.querySelector('.trip-events');
    this._pointsList = document.createElement('ul');

    render(this._filters.element, this._filtersWrapper);
    render(this._sortingButtons.element, this._tripPointsSection);
    this._pointsList.classList.add('.trip-events__list');
    render(this._pointsList, this._tripPointsSection);
    for (let i = 0; i < 3; i++) {
      this._renderPathPoint(this._model.points[i]);
    }
  }

  _renderPathPoint (point){
    const pathPoint = new PointView(point);
    const editMenu = new EditPointView(point);
    const pointElement = pathPoint.element;
    const editMenuElement = editMenu.element;

    const replaceEditByPoint = () => {
      this._pointsList.replaceChild(pointElement, editMenuElement);
    };

    const replacePointByEdit = () => {
      this._pointsList.replaceChild(editMenuElement, pointElement);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        replaceEditByPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const swapEditMenuToPoint = (evt) => {
      evt.preventDefault();
      replaceEditByPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const swapPointToEditMenu = (evt) => {
      evt.preventDefault();
      replacePointByEdit();
      editMenuElement.querySelector('.event__save-btn').addEventListener('click', swapEditMenuToPoint);
      editMenuElement.querySelector('.event__rollup-btn').addEventListener('click', swapEditMenuToPoint);
      document.addEventListener('keydown', onEscKeyDown);
    };

    pointElement.querySelector('.event__rollup-btn').addEventListener('click', swapPointToEditMenu);

    render(pointElement, this._pointsList);
  }
}
