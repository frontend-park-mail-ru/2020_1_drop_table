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
    _renderTemplate() {
        this._el.innerHTML = LoyaltySystem();
    }
    remove(){
        this._el.innerHTML ='';
    }

    /** Отрисоака карточки кафе */
    render() {
        console.log('render ls')
        this._renderTemplate();
        this._addListeners()
    }
}
