import EditPointView from '../view/path-edit-view';
import PointView from '../view/path-point-view';
import { remove, render, replace } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PathPointPresenter {
  #point = null;
  #pathPoint = null;
  #pathPointEditComponent = null;
  #pointsList = null;
  #changeData = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;
  #changeMode = null;

  constructor(pointsList, changeData, changeMode, destinations, offers) {
    this.#pointsList = pointsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(point) {
    this.#point = point;
    const prevPathPoint = this.#pathPoint;
    const prevEditMenu = this.#pathPointEditComponent;
    this.#pathPoint = new PointView();
    this.#pathPoint.init(this.#point);
    this.#pathPointEditComponent = new EditPointView(this.#point, this.#destinations, this.#offers);
    this.#pathPoint.setClickHandler(this.#swapPointToEditMenu);
    this.#pathPoint.setClickFavouriteHandler(this.#setFavouritePoint);

    if (prevPathPoint === null || prevEditMenu === null) {
      render(this.#pathPoint, this.#pointsList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pathPoint, prevPathPoint);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pathPointEditComponent, prevEditMenu);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPathPoint);
    remove(prevEditMenu);
  }

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pathPointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pathPointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pathPointEditComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pathPointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pathPointEditComponent.shake(resetFormState);
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
      this.#changeData('UPDATE_POINT', 'PATCH', this.#point);
      replace(this.#pathPoint, this.#pathPointEditComponent);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#mode = Mode.DEFAULT;
    }
  };

  #swapEditMenuToPoint = () => {
    replace(this.#pathPoint, this.#pathPointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #swapPointToEditMenu = () => {
    replace(this.#pathPointEditComponent, this.#pathPoint);
    this.#pathPointEditComponent.setClickHandler(this.#rollUpCardHandler);
    this.#pathPointEditComponent.setFormSubmitHandler(this.#submitFormHandler);
    this.#pathPointEditComponent.setDeletePointHandler(this.#deletePointHandler);
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
    this.#changeData('UPDATE_POINT', 'PATCH', startState);
    this.#swapEditMenuToPoint();
  };

  #deletePointHandler = (pointToDelete) => {
    this.#swapEditMenuToPoint();
    this.#changeData('DELETE_POINT', 'MINOR', pointToDelete);
  };

  #setFavouritePoint = () => {
    this.#changeData('UPDATE_POINT','PATCH',{...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
