import './LandingCafesContainer.scss';
import './LandingCafesContainer.color.scss';

import '../LandingCafeCard/LandingCafeCard.scss';
import '../LandingCafeCard/LandingCafeCard.color.scss';

import LandingCafeContainer from './LandingCafesContainer.hbs';
import LandingCafeCard from '../LandingCafeCard/LandingCafeCard.hbs';
import {router} from '../../main/main';

/** Компонент списка кафе */
export class LandingCafesContainerComponent {

    /**
     * Инициализация компоненты списка кафе
     * @param {Element} parent элемент в кором будет размещаеться список кафе
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;

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
        console.log('test',context)
        let cafes = context.map(({photo = photo, name = name, id = id} = {}) => {
            return LandingCafeCard({cafeImageSrc: photo, name: this._cropName(name), id: id});
        });
        this._parent.innerHTML = LandingCafeContainer({cafes:cafes}); //TODO норм шаблоны и лисенеры на кафе
    }

    _addListeners(context){
        for(let i = 0; i < context.length; i++){
            let card = this._parent.getElementsByClassName('landing-cafe-card-container').item(i);
            let cardImage = this._parent.getElementsByClassName('landing-cafe-card-container__image-container').item(i);
            let cardName = this._parent.getElementsByClassName('landing-cafe-card-container__name-container').item(i);
            if(cardImage && cardName) {

                cardImage.addEventListener('click', function () {
                    const cardIdStr = card.getAttribute('id');
                    const cardId = cardIdStr.slice(1, cardIdStr.length);
                    router._goTo(`/cafe/preview/${cardId}`);
                });
                cardName.addEventListener('click', function () {
                    const cardIdStr = card.getAttribute('id');
                    const cardId = cardIdStr.slice(1, cardIdStr.length);
                    router._goTo(`/cafe/preview/${cardId}`)

                });
            }
        }

    }

    /** Отрисовка компоненты списка кафе */
    render(context) {
        this._renderTemplate(context);
        this._addListeners(context)
    }
}
