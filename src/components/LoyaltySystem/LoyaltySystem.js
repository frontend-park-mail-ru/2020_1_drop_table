import LoyaltySystem from './LoyaltySystem.hbs';

/** Компонент карточки кафе */
export class LoyaltySystemComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        this._el = el;
        console.log('constr ls')
    }

    _addListeners(){

    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {
        this._el.innerHTML = LoyaltySystem(context);
    }
    remove(){
        this._el.innerHTML ='';
    }

    /** Отрисоака карточки кафе */
    render(context) {
        console.log('render ls')
        this._renderTemplate(context);
        this._addListeners()
    }
}
