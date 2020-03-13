import './CafeCard.css';
import CafeCard from '../CafeCard/CafeCard.hbs';
import ProfileComponent from "../../componentsAI/profile/profile";

export class CafeCardComponent {
    constructor({
                    el = document.body,
                    imgSrc = 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
                    name = 'Кафе',
                    id = 0,
                } = {}) {
        this._el = el;
        this._imgSrc = imgSrc;
        this._name = name;
        this._id = id;
    }

    _renderTemplate() {
        this._el.innerHTML = CafeCard({cafeImageSrc:this._imgSrc,name:this._name, id:this._id});
    }

    render() {
        return this._renderTemplate();
    }
}
