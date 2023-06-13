import DefaultMarkupPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const tripModel = new TripModel();
const filterModel = new FilterModel();
const tripPresenter = new DefaultMarkupPresenter(tripModel, filterModel);

const filtersWrapper = document.querySelector('.trip-controls__filters');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const handleNewTaskFromClose = () => {
  newEventButton.disabled = false;
};

const newEventHandler = (evt) => {
  evt.preventDefault();
  tripPresenter.createTask(handleNewTaskFromClose);
  newEventButton.disabled = true;
};

newEventButton.addEventListener('click', newEventHandler);

const filterPresenter = new FilterPresenter(filtersWrapper, filterModel, tripModel);

filterPresenter.init();
tripPresenter.init();
