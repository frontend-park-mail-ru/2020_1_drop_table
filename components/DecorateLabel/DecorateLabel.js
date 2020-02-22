import './DecorateLabel.css'
import DecorateLabel from './DecorateLabel.hbs';

export class DecorateLabelComponent {
    constructor({
                    el = document.body,
                    labelText = "SampleText",
                } = {}) {
        this._el = el;
        this._labelText = labelText;
    }

    get data() {
        return this._data;
    }

    set data(d) {
        this._data = d;
    }

    _renderTemplate() {
        this._el.innerHTML += DecorateLabel({labelText:this._labelText});

    }
    render() {
        return this._renderTemplate();
    }

}
