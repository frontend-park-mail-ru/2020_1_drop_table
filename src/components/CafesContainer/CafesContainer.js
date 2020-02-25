import './CafesContainer.css'
import '../CafeCard/CafeCard.css'

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

        //затычка изображения
        let src = 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg';
        let fc = this._firstColumn.map(({imageSrc = src, name = name, id = id} = {}) => {
            return CafeCard({cafeImageSrc: imageSrc, name: name, id: id})
        });
        let sc = this._secondColumn.map(({imageSrc = src, name = name, id = id} = {}) => {
            return CafeCard({cafeImageSrc: imageSrc, name: name, id: id})
        });
        console.log('COLUMN ', this._firstColumn);

        this._el.innerHTML = CafeContainer({firstCol: fc, secCol: sc}); //TODO норм шаблоны и лисенеры на кафе


    }

    render() {
        this._renderTemplate()
        return this._el
    }

}
