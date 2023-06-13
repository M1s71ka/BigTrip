import {remove, render, RenderPosition} from '../framework/render';
import EditPointView from '../view/path-edit-view';
import {UserAction, UpdateType} from '../mock/constants';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {
  #taskListContainer = null;
  #changeData = null;
  #taskEditComponent = null;
  #destroyCallback = null;

  constructor(taskListContainer, changeData) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#taskEditComponent !== null) {
      return;
    }

    this.#taskEditComponent = new EditPointView();
    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#taskEditComponent.setDeletePointHandler(this.#handleDeleteClick);
	this.#taskEditComponent.setClickHandler(this.#handleDeleteClick);

    render(this.#taskEditComponent, this.#taskListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#taskEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#taskEditComponent);
    this.#taskEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.ADD_POINT, //
      UpdateType.MINOR,
      {id: nanoid(), ...task},
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}