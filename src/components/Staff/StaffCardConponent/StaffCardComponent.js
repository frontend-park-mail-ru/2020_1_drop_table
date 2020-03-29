import './StaffCardComponent.css';
import StaffCard from './StaffCardComponent.hbs';

export class StaffCardComponent {
    constructor({ el = document.getElementById('application'),} = {}) {
        this._el = el;
    }

    _renderTemplate(context) {
        this._el.innerHTML += StaffCard(context);
    }

    render(context) {
        return this._renderTemplate(context);
    }
}
