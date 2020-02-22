import './UserProfileHeader.css'
import UserProfileHeader from './UserProfileHeader.hbs';

export class UserProfileHeaderComponent {
    constructor({
                    el = document.body,
                    imageSrc = "https://sun9-14.userapi.com/c206524/v206524266/45665/yFWB9faNIvU.jpg?ava=1",
                    lastChange = "20 минут"
                } = {}) {
        this._el = el;
        this._imageSrc = imageSrc;
        this._lastChange = lastChange;
    }

    get data() {
        return this._data;
    }

    set data(d) {
        this._data = d;
    }

    _renderTemplate() {
        this._el.innerHTML = UserProfileHeader(
            {
                userImageSrc: this._imageSrc,
                lastChange: this._lastChange,
            });

    }

    render() {
        return this._renderTemplate();
    }

}
