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
        Карточка клиента - накопительная. Кешбек с покупок в Вашем заведении можно потратить на ваши товары и услуги.
        `
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {
        console.log('context wallet', context)
        let cashback = context.cashback;
        this._el.innerHTML = LoyaltyWallet({text: this._text, cashback: cashback});
    }

    /** Отрисоака */
    render(context) {

        this._renderTemplate(context);
    }
}
