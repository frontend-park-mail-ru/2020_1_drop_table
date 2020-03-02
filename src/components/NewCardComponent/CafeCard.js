import './CafeCard.css';
import CafeCard from '../CafeCard/CafeCard.hbs';
import Form from "../../componentsAI/form/form";
import ProfileTemplate from "../../componentsAI/profile/profile.hbs";

export class CafeCardComponent {
    // constructor({
    //                 el = document.body,
    //                 imgSrc = 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
    //                 name = 'Кафе',
    //                 id = 0,
    //             } = {}) {
    //     this._el = el;
    //     this._imgSrc = imgSrc;
    //     this._name = name;
    //     this._id = id;
    // }
    //
    // _renderTemplate() {
    //     this._el.innerHTML += CafeCard({cafeImageSrc:this._imgSrc,name:this._name, id:this._id});
    // }
    //
    // render() {
    //     return this._renderTemplate();
    // }


    constructor(parent = document.body) {
        this._parent = parent;
    }

    render(context) {
        this._parent.innerHTML = CafeCard(context);
        const card = document.getElementById(`cafe${this._id}`);
        card.addEventListener('click', function (e) {
            alert(card.getAttribute('id'))
        });
    }

}
