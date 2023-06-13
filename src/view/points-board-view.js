import AbstractView from '../framework/view/abstract-view';

const createBoardTemplate = () =>(
  '<ul class="trip-events__list"></ul>'
);

export default class PointsBoard extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
