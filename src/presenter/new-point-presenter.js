import {remove, render, RenderPosition} from '../framework/render';
import EditPointView from '../view/path-edit-view';
import {UserAction, UpdateType} from '../constants';

const BLANK_POINT = {
  basePrice: 100,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    id: 1,
    description: 'Chamonix, is a beautiful city, with crowded streets, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.',
    name: 'Chamonix',
    pictures: [
      {
        'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
        'description': 'Chamonix street market'
      },
      {
        'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
        'description': 'Chamonix embankment'
      },
      {
        'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
        'description': 'Chamonix kindergarten'
      },
      {
        'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
        'description': 'Chamonix park'
      },
      {
        'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
        'description': 'Chamonix park'
      },
      {
        'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
        'description': 'Chamonix park'
      },
    ]
  },
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

export default class NewPointPresenter {
  #taskListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #destinations = null;
  #offers = null;

  constructor(taskListContainer, changeData, destinations, offers) {
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView(BLANK_POINT, this.#destinations, this.#offers);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeletePointHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#taskListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
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
