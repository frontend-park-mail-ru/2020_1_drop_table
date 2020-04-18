import './LoyaltyRedactor.scss';
import LoyaltyRedactor from './LoyaltyRedactor.hbs';
import {LoyaltySystemComponent} from '../LoyaltySystem/LoyaltySystem'

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

    _renderLoyaltyDescription(id){
        let data = [
            {
                text:'Описание1 Описание1 Описание1 Описание1 Описание1 Описание1 Описание1 Описание1 Описание1'
            },
            {
                text:'Описание2 Описание2 Описание2 Описание2 Описание2 Описание2 Описание2 Описание2 Описание2'
            },
            {
                text:'Описание3 Описание3 Описание3 Описание3 Описание3 Описание3 Описание3 Описание3 Описание3'
            },
            {
                text:'Описание4 Описание4 Описание4 Описание4 Описание4 Описание4 Описание4 Описание4 Описание4'
            },
        ]
        const description =
            this._el.getElementsByClassName('description-loyalty').item(0);
        this._loyaltySystem = new LoyaltySystemComponent(description);
        this._loyaltySystem.render(data[id]);
    }
    _removeLoyaltyDescription(){
        if(this._loyaltySystem) {
            this._loyaltySystem.remove();
        }
    }

    _normalizeButtons(){

    }

    _addListeners(){
        const buttonWidth = 100;// px
        const marginButton = 0;// px

        const normalButtonState = ()=>{
            return`width:${buttonWidth}px; height: 100px; transition: height 1s linear 0s; border-radius: 50%;
            transition: border-radius 0.25s linear 0s`;
        };
        const normalImgState = ()=>{
            return`  position: absolute;border-radius: 50%;max-width: 100px;max-height: 100px;`;
        };
        const clickImgState = ()=>{
            return`  position: absolute;border-radius: 15px  15px 0 0;max-width: 100px;max-height: 100px;`;
        };

        const clickButtonState = `border-radius: 15px  15px 0 0;height: 310px; transition: height 0.5s linear 0s;`;
        const normalDescrState = `width: 0px; height: 0px;
         transition: height 0.5s linear 0s; transition: width 0.5s linear 0s;`;

        const calcWidth1 = (i)=> {
            return `width: ${(4.5-i)*buttonWidth + (4-i)*marginButton - buttonWidth/2 - marginButton }px;
                height: 200px;transition: height 0.25s linear 0s;transition: width 0.25s linear 0s;`
        };

        const calcWidth2 = (i)=> {
            return `width: ${(i+0.5)*buttonWidth + (1+i)*marginButton + i*buttonWidth/4}px;
                height: 200px;transition: height 0.25s linear 0s;transition: width 0.25s linear 0s;`
        };

        const clickDescriptionState =(i, direction)=>{
            if(direction === 'left'){
                if( i >= 2){
                    return calcWidth1(3 - i)
                } else{
                    return calcWidth2(i)
                }
            } else if(direction === 'right'){
                if( i >= 2){
                    return calcWidth2(3 - i)
                }
                return calcWidth1(i)
            }
        };


        const clickDescrCenterState = `width: 100px;height: 215px;transition: height 0.1s linear 0s;`;
        const descriptionCenter =
            this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-center');
        const descriptionRight =
            this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-right');
        const descriptionLeft =
            this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-left');
        const buttons = this._el.getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__button');


        for(let i = 0; i < buttons.length; i++){
            buttons.item(i).addEventListener('click',(e)=>{
                for(let i = 0; i < buttons.length;i++){
                    buttons.item(i).setAttribute('style', normalButtonState());
                    buttons.item(i).getElementsByTagName('img').
                        item(0).setAttribute('style',normalImgState());
                    descriptionRight.item(i).setAttribute('style', normalDescrState);
                    descriptionLeft.item(i).setAttribute('style', normalDescrState);
                    descriptionCenter.item(i).setAttribute('style', normalDescrState);

                }
                const description =
                    document.getElementsByClassName('description-loyalty').item(0);
                description.innerHTML = ' ';
                description.style.transition ='';
                description.style.opacity = '0';

                const button = e.target;
                button.setAttribute('style', clickButtonState);
                console.log('btn', button);
                // button.getElementsByTagName('img').
                //     item(0).setAttribute('style',clickImgState());

                const descriptionContainer = button.closest('.loyalty-redactor__buttons-field__loyalty-field');
                descriptionContainer.
                    getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-left').
                    item(0).setAttribute('style', clickDescriptionState(i,'right'));
                descriptionContainer.
                    getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-right').
                    item(0).setAttribute('style', clickDescriptionState(i,'left'));

                descriptionContainer.
                    getElementsByClassName('loyalty-redactor__buttons-field__loyalty-field__description-center').
                    item(0).setAttribute('style', clickDescrCenterState);

                this._renderLoyaltyDescription(i);
                description.style.transition ='opacity 0.25s linear ';
                description.style.opacity = '100%';
            })
        }

        const specifiedElement = document.getElementsByClassName('loyalty-redactor').item(0);

        document.addEventListener('click', function(e) {
            let isClickInside = specifiedElement.contains(e.target);
            if (!isClickInside) {
                for(let i = 0; i < buttons.length; i++){
                    buttons.item(i).setAttribute('style', normalButtonState());
                    // buttons.item(i).getElementsByTagName('img').item(0).
                    //     setAttribute('style', normalImgState());
                    descriptionRight.item(i).setAttribute('style', normalDescrState);
                    descriptionLeft.item(i).setAttribute('style', normalDescrState);
                    descriptionCenter.item(i).setAttribute('style', normalDescrState);
                }
                const description =
                    document.getElementsByClassName('description-loyalty').item(0);
                description.innerHTML = '';
                description.style.opacity = '0';
            }
        });
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML = LoyaltyRedactor();
    }

    /** Отрисоака */
    render() {
        this._renderTemplate();
        this._addListeners()
    }
}
