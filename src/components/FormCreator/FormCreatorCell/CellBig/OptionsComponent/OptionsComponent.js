
import OptionsComponentTemplate from './OptionsComponent.hbs'



export class OptionsComponent {


    constructor(el) {
        this._el = el;
    }


    _renderTemplate(context) {
        this._el.innerHTML = OptionsComponentTemplate(context);
        // this._postRender(context);

    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);

    }
}
