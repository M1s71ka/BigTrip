import DefaultMarkupPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';

const markup = new DefaultMarkupPresenter();
const tripModel = new TripModel();

markup.init(tripModel);
