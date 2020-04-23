import './LoyaltyWalletComponent.scss';
import LoyaltyWallet from './LoyaltyWalletComponent.hbs';



/** Компонент карточки кафе */
export class LoyaltyWalletComponent {

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
        Описание действия wallet Описание действия wallet Описание действия wallet
         Описание действия wallet Описание действия wallet Описание действия wallet
        `
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML = LoyaltyWallet({text: this._text});
    }

    /** Отрисоака */
    render() {
        setTimeout(this._renderTemplate.bind(this), 250);
    }
}
