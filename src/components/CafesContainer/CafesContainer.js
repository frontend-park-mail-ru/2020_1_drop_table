import './CafesContainer.css';
import '../CafeCard/CafeCard.css';
import CafeContainer from './CafesContainer.hbs';
import CafeCard from '../CafeCard/CafeCard.hbs';
import {Router} from "../../modules/Router";

export class CafesContainerComponent {
    constructor({
                    el = document.body,
                } = {}) {
        this._el = el;
    }

    get data() {
        return this._data;
    }

    set data(d) {
        this._data = d;
        let center = d.length / 2;
        this._firstColumn = d.slice(0, center);
        this._secondColumn = d.slice(center);
    }
   _cropName(name){
        if(name.length>10){
            return name.slice(0,8).concat('...')
        }
        return name;
    }
    _renderTemplate() {

        let fc = this._firstColumn.map(({photo = photo, name = name, id = id} = {}) => {

            return CafeCard({cafeImageSrc: photo, name: this._cropName(name), id: id});
        });
        let sc = this._secondColumn.map(({photo = photo, name = name, id = id} = {}) => {

            return CafeCard({cafeImageSrc: photo, name: this._cropName(name), id: id});
        });

        this._el.innerHTML = CafeContainer({firstCol: fc, secCol: sc}); //TODO норм шаблоны и лисенеры на кафе

        for(let i = 0; i< this.data.length; i++){
            let card = this._el.getElementsByClassName('cafe-card-container').item(i);
            let cardImage = this._el.getElementsByClassName('cafe-card-container__image-container').item(i);
            let cardName = this._el.getElementsByClassName('cafe-card-container__name-container').item(i);
            cardImage.addEventListener('click',function (e) {
                const cardIdStr = card.getAttribute('id');
                const cardId = cardIdStr.slice(1,cardIdStr.length);
                Router.redirect(`/Cafe/${cardId}`);

            });
            cardName.addEventListener('click',function (e) {
                const cardIdStr = card.getAttribute('id');
                const cardId = cardIdStr.slice(1,cardIdStr.length);
                Router.redirect(`/Cafe/${cardId}`);

            });
        }
    }

    render() {
        return this._renderTemplate();

    }

}
