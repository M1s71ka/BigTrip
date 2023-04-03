import FiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import PathMenuView from '../view/path-creating.js';
import EditPointView from '../view/path-editing.js';
import PointView from '../view/path-pointing.js';
import { render } from '../render.js';

export default class DefaultMarkupPresenter {
  init(model) {
	this.model = model;
	this.filters = new FiltersView();
    this.sortingButtons = new SortingView();
    this.pointMenu = new PathMenuView(this.model.points[0]);
    this.editMenu = new EditPointView();
    this.filtersWrapper = document.querySelector('.trip-controls__filters');
    this.tripPointsSection = document.querySelector('.trip-events');
    this.pointsList = document.createElement('ul');

	render(this.filters.getElement(), this.filtersWrapper);
    render(this.sortingButtons.getElement(), this.tripPointsSection);
	this.pointsList.classList.add('.trip-events__list');
    render(this.pointsList, this.tripPointsSection);
	render(this.pointMenu.getElement(), this.pointsList);
    render(this.editMenu.getElement(), this.pointsList);
    for (let i = 0; i < 3; i++) { 
      render(new PointView(this.model.points[i]).getElement(), this.pointsList);
    }
  }
}
