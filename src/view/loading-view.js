import AbstractView from "../framework/view/abstract-view";

const createLoadingTemplate = () => (
	`<p class="board__no-points">
		Loading...
	</p> `
)

export default class LoadingView extends AbstractView {
	get template() {
		return createLoadingTemplate();
	}
}