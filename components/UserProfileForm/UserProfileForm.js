import './UserProfileForm.css'
import UserProfileForm from './UserProfileForm.hbs';

export class UserProfileFormComponent {
    constructor({
                    el = document.body,
                    email = "samplemail@mail.ru",
                    username = "Сэмпл Сэмплов"
                } = {}) {
        this._el = el;
        this._email = email;
        this._username = username;
    }

    get data() {
        return this._data;
    }

    set data(d) {
        this._data = d;
    }

    _renderTemplate() {
        this._el.innerHTML += UserProfileForm({username: this._username, email:this._email});

    }
    render() {
        return this._renderTemplate();
    }

}
