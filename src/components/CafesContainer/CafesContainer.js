import './CafesContainer.css';
import '../CafeCard/CafeCard.css';
import CafeContainer from './CafesContainer.hbs';
import CafeCard from '../CafeCard/CafeCard.hbs';
import {Router} from "../../modules/Router";
import {router} from "../../main/main";

export class CafesContainerComponent {

    constructor(parent = document.getElementById('application')) {
        this._parent = parent;
        this._firstColumn = null;
        this._secondColumn = null;
    }

    _makeData(context){
        let center = context.length / 2;
        this._firstColumn = context.slice(0, center);
        this._secondColumn = context.slice(center);
    }

    _cropName(name){
        if(name.length>10){
            return name.slice(0,8).concat('...')
        }
        return name;
    }

    _renderTemplate(context) {

        let fc = this._firstColumn.map(({photo = photo, name = name, id = id} = {}) => {

            return CafeCard({cafeImageSrc: photo, name: this._cropName(name), id: id});
        });
        let sc = this._secondColumn.map(({photo = photo, name = name, id = id} = {}) => {
            return CafeCard({cafeImageSrc: photo, name: this._cropName(name), id: id});
        });



        const noCafes = !context.length;

        this._parent.innerHTML = CafeContainer({noCafes: noCafes, firstCol: fc, secCol: sc}); //TODO норм шаблоны и лисенеры на кафе

        for(let i = 0; i < context.length; i++){
            let card = this._parent.getElementsByClassName('cafe-card-container').item(i);
            let cardImage = this._parent.getElementsByClassName('cafe-card-container__image-container').item(i);
            let cardName = this._parent.getElementsByClassName('cafe-card-container__name-container').item(i);
            if(cardImage && cardName) {
                cardImage.addEventListener('click', function (e) {
                    const cardIdStr = card.getAttribute('id');
                    const cardId = cardIdStr.slice(1, cardIdStr.length);
                    router._goTo(`/cafe/${cardId}`);
                });

                cardName.addEventListener('click', function (e) {
                    const cardIdStr = card.getAttribute('id');
                    const cardId = cardIdStr.slice(1, cardIdStr.length);
                    // Router.redirect(`/Cafe/${cardId}`);
                    window.location.replace(`/cafe/${cardId}`)

                });
            }
        }

    }

    render(context) {
        this._makeData(context);
        this._renderTemplate(context);
    }

}
