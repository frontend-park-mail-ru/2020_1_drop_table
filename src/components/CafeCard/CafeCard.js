import './CafeCard.scss';
import CafeCard from '../CafeCard/CafeCard.hbs';

/** Компонент карточки кафе */
export class CafeCardComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor({
        el = document.getElementById('application'),
        imgSrc = 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
        name = 'Кафе',
        id = 0,
    } = {}) {
        this._el = el;
        this._imgSrc = imgSrc;
        this._name = name;
        this._id = id;
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML = CafeCard({cafeImageSrc:this._imgSrc,name:this._name, id:this._id});
    }

    /** Отрисоака карточки кафе */
    render() {
        return this._renderTemplate();
    }
}
