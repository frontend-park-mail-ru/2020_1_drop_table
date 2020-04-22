
import SmallOptionsComponentTemplate from './SmallOptionsComponent.hbs'



export class SmallOptionsComponent {


    constructor(el) {
        this._el = el;
    }


    _renderTemplate(context) {
        this._el.innerHTML = SmallOptionsComponentTemplate(context);
        // this._postRender(context);

    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);

    }
}
