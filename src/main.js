import DefaultMarkupPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';

const tripModel = new TripModel();
const markup = new DefaultMarkupPresenter(tripModel);

markup.init();
