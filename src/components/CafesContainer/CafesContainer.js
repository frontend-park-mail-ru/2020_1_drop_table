import './CafesContainer.css';
import '../CafeCard/CafeCard.css';

import CafeContainer from './CafesContainer.hbs';
import CafeCard from '../CafeCard/CafeCard.hbs';

export class CafesContainerComponent {
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
        let center = d.length / 2;
        this._firstColumn = d.slice(0, center);
        this._secondColumn = d.slice(center);
    }

    _renderTemplate() {

        let fc = this._firstColumn.map(({photo = photo, name = name, id = id} = {}) => {
            return CafeCard({cafeImageSrc: photo, name: name, id: id});
        });
        let sc = this._secondColumn.map(({photo = photo, name = name, id = id} = {}) => {
            return CafeCard({cafeImageSrc: photo, name: name, id: id});
        });

        this._el.innerHTML = CafeContainer({firstCol: fc, secCol: sc}); //TODO норм шаблоны и лисенеры на кафе

        for(let i = 0; i< this.data.length; i++){
            let card = this._el.getElementsByClassName('cafe-card-container').item(i);
            card.addEventListener('click',function (e) {
                alert(card.getAttribute('id'));
                window.location.href = '#cafe';

            })
        }
    }

    render() {
        return this._renderTemplate();
    }

}
