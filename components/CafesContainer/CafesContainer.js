
import './CafesContainer.css'
import '../CafeCard/CafeCard.css'

import CafeContainer from './CafesContainer.hbs';
import CafeCard from '../CafeCard/CafeCard.hbs';

import CafeCardComponent from '../CafeCard/CafeCard.js';

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
        let fc = this._firstColumn.map(({imageSrc="src", cafeName="sampleCafe"} = {})=>{
            return CafeCard({cafeImageSrc:imageSrc, cafeName:cafeName})});
        let sc = this._secondColumn.map(({imageSrc="src", cafeName="sampleCafe"} = {})=>{
            return CafeCard({cafeImageSrc:imageSrc, cafeName:cafeName})});

        this._el.innerHTML = CafeContainer({firstCol:fc, secCol:sc})

    }
    render() {
        return this._renderTemplate();
    }

}
