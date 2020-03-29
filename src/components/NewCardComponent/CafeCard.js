import './CafeCard.css';
import CafeCard from '../CafeCard/CafeCard.hbs';

export class CafeCardComponent {
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML = CafeCard(context);
        const card = document.getElementById(`cafe${this._id}`);
        card.addEventListener('click', function (e) {
            alert(card.getAttribute('id'))
        });
    }

}
