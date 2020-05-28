import './LoyaltyStampComponent.scss';
import LoyaltyStamp from './LoyaltyStampComponent.hbs';



/** Компонент карточки кафе */
export class LoyaltyStampComponent {

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
        Карта клиента - карточка с печатями. Клиент покупает напиток или товар на Ваше усмотрение несколько раз, после 
        этого он может получить его в качестве подарка.
        `
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {
        let stamps = context.cups_count;
        this._el.innerHTML = LoyaltyStamp({text: this._text, stamps:stamps });
    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);
    }
}
