import './UserProfileForm.css'
import UserProfileForm from './UserProfileForm.hbs';

export class UserProfileFormComponent {
    constructor({
                    el = document.body,
                    email = "samplemail@mail.ru",
                    name = "Сэмпл Сэмплов"
                } = {}) {
        this._el = el;
        this._email = email;
        this._name = name;
    }

    get data() {
        return this._data;
    }

    set data(d) {
        this._data = d;
    }

    _renderTemplate() {
        this._el.innerHTML += UserProfileForm({name: this._name, email:this._email});

    }
    render() {
        return this._renderTemplate();
    }

}
