import AbstractView from '../framework/view/abstract-view';

const createFiltersTemplate = (currentFilter) => (
  `<div class="trip-main__trip-controls  trip-controls">
		  <div class="trip-controls__navigation">
			<h2 class="visually-hidden">Switch trip view</h2>
			<nav class="trip-controls__trip-tabs  trip-tabs">
			  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
			  <a class="trip-tabs__btn" href="#">Stats</a>
			</nav>
		  </div>
	  
		  <div class="trip-controls__filters">
			<h2 class="visually-hidden">Filter events</h2>
			<form class="trip-filters" action="#" method="get">
			  <div class="trip-filters__filter">
				<input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything"
				 ${currentFilter === 'everything' ? 'checked' : ''}>
				<label class="trip-filters__filter-label" for="filter-everything">Everything</label>
			  </div>
	  
			  <div class="trip-filters__filter">
				<input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future"
				 ${currentFilter === 'future' ? 'checked' : ''}>
				<label class="trip-filters__filter-label" for="filter-future">Future</label>
			  </div>
	  
			  <div class="trip-filters__filter">
				<input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past"
				 ${currentFilter === 'past' ? 'checked' : ''}>
				<label class="trip-filters__filter-label" for="filter-past">Past</label>
			  </div>
	  
			  <button class="visually-hidden" type="submit">Accept filter</button>
			</form>
		  </div>
		</div>`
);

export default class FiltersView extends AbstractView {
  #currentFilter = null;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFiltersTemplate(this.#currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.changeFilter = callback;
    this.element.addEventListener('change', this.#changeFilter);
  }

  #changeFilter = (evt) => {
    evt.preventDefault();
    this._callback.changeFilter(evt.target.value);
  }
}
