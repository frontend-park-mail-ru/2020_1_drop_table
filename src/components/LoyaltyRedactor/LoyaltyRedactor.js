import './LoyaltyRedactor.scss';
import LoyaltyRedactor from './LoyaltyRedactor.hbs';

/** Компонент карточки кафе */
export class LoyaltyRedactorComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        this._el = el;
    }

    _addListeners(){
        const normalButtonState = `width: 50px; height: 50px; transition: height 0.5s linear 0s; border-radius: 50%;
            transition: border-radius 0.25s linear 0.25s`;

        const clickButtonState = `border-radius: 15px  15px 0 0;height: 300px; transition: height 0.5s linear 0s;`;


        const normalDescrState = `width: 0px; height: 0px; transition: height 0.5s linear 0s; transition: width 0.25s linear 0s;`;
        const clickDescrState = `width: 250px;
         height: 250px;
          transition: height 1s linear 0s;
           // transition: width 1s linear 0s;
           `;

        const clickDescrCenterState = `width: 50px;
         height: 265px;
          transition: height 1s linear 0s;
           transition: width 1s linear 0s;`;

        const buttons = this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__button');
        const descrCenter = this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-center');
        const descrRight = this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-right');
        const descrLeft = this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-left');
        for(let i = 0; i < buttons.length; i++){
            buttons.item(i).addEventListener('click',(e)=>{
                for(let i = 0; i < buttons.length;i++){
                    buttons.item(i).setAttribute("style", normalButtonState);
                    descrRight.item(i).setAttribute("style", normalDescrState);
                    descrLeft.item(i).setAttribute("style", normalDescrState);

                    descrCenter.item(i).setAttribute("style", normalDescrState);
                }
                e.target.setAttribute("style", clickButtonState);

                const descrsCont = e.target.closest('.loyalty-redactor__buttons-field__loyalty-field');
                descrsCont.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-right').
                    item(0).setAttribute("style", clickDescrState);
                descrsCont.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-left').
                    item(0).setAttribute("style", clickDescrState);

                descrsCont.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-center').
                    item(0).setAttribute("style", clickDescrCenterState);

            })
        }
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML = LoyaltyRedactor();
    }

    /** Отрисоака карточки кафе */
    render() {
        this._renderTemplate();
        this._addListeners()
    }
}
