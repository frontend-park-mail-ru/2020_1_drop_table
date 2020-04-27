import './LoyaltyCouponComponent.scss';
import LoyaltyCoupon from './LoyaltyCouponComponent.hbs';



/** Компонент карточки кафе */
export class LoyaltyCouponComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        this._el = el;
        this._text = `
        Карта клиента - купон на определенную сумму денег. Вы сможете выпускать купоны разного номинала в ограниченном
        количестве. В разделе статистка вам будет доступна вся информация о купонах
        `
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML = LoyaltyCoupon({text: this._text});

    }

    /** Отрисоака */
    render() {
        this._renderTemplate();

    }
}
