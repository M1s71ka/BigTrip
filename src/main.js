import DefaultMarkupPresenter from './presenter/trip-presenter';
import TripModel from './model/trip-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';

const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic h4f6ny3ci85t9ogm';

const tripModel = new TripModel(new PointsApiService(END_POINT, AUTHORIZATION));
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
tripModel.init()
  .finally(() => {
    newEventButton.disabled = false;
  });
