import './Header.css'
import Header from './Header.hbs';

export class HeaderComponent {
    constructor({
                    el = document.body,
                } = {}) {
        this._el = el;
    }

    get data() {
        return this._data;
    }

    set data(d) {
        this._data = d;
    }

    _renderTemplate() {
        this._el.innerHTML = Header();

    }
    render() {
        return this._renderTemplate();
    }

}
