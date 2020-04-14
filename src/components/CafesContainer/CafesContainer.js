import './CafesContainer.scss';
import './CafesContainer.color.scss';


import '../CafeCard/CafeCard.scss';
import '../CafeCard/CafeCard.color.scss';

import CafeContainer from './CafesContainer.hbs';
import CafeCard from '../CafeCard/CafeCard.hbs';
import {router} from '../../main/main';

/** Компонент списка кафе */
export class CafesContainerComponent {

    /**
     * Инициализация компоненты списка кафе
     * @param {Element} parent элемент в кором будет размещаеться список кафе
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
        this._firstColumn = null;
        this._secondColumn = null;
    }



    /**
     * Обрезание динного названия
     * @param {string} name произвольная строка
     * @return {string} обрезанная строка
     * @private
     */
    _cropName(name){

        if (name.length > 10) {
            return name.slice(0, 8).concat('...')
        }
        return name;
    }

    /**
     * Отрисовка шаблона
     * @param {obj} context контекст нужный для отрисовки компонента
     * @private
     */
    _renderTemplate(context) {

        let cafes = context.map(({photo = photo, name = name, id = id} = {}) => {
            return CafeCard({cafeImageSrc: photo, name: this._cropName(name), id: id});
        });

        const noCafes = !context.length;

        this._parent.innerHTML = CafeContainer({noCafes: noCafes, cafes:cafes}); //TODO норм шаблоны и лисенеры на кафе

        for(let i = 0; i < context.length; i++){

            let card = this._parent.getElementsByClassName('cafe-card-container').item(i);
            if( i % 2 && i <= 4){
                card.style.marginTop = '7vw';
            }
            let cardImage = this._parent.getElementsByClassName('cafe-card-container__image-container').item(i);
            let cardName = this._parent.getElementsByClassName('cafe-card-container__name-container').item(i);
            if(cardImage && cardName) {
                cardImage.addEventListener('click', function () {
                    const cardIdStr = card.getAttribute('id');
                    const cardId = cardIdStr.slice(1, cardIdStr.length);
                    router._goTo(`/cafe/${cardId}`);
                });

                cardName.addEventListener('click', function () {
                    const cardIdStr = card.getAttribute('id');
                    const cardId = cardIdStr.slice(1, cardIdStr.length);
                    router._goTo(`/cafe/${cardId}`)

                });
            }
        }
    }

    /** Отрисовка компоненты списка кафе */
    render(context) {
        this._renderTemplate(context);
    }
}
