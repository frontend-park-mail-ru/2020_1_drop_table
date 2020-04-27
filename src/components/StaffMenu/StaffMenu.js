import './StaffMenu.scss';
import StaffMenu from './StaffMenu.hbs';
import {constants} from '../../utils/constants';
import {authAjax} from '../../utils/authAjax';
import NotificationComponent from '../Notification/Notification';


export class StaffMenuComponent {

    constructor(el = document.getElementById('application'), uuid) {
        this._el = el;
        this.points = 0;
        this.token = uuid;
    }


    changePointPlus() {
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,  {"coffee_cups":Number(this.points + 1)}, (response) => {
            console.log('response', response);
            if (response.errors === null) {
                console.log('points ok');
                (new NotificationComponent('Успешно')).render();
                this.loadData()
            } else {
                (new NotificationComponent('Ошибка')).render();
                throw response.errors;
            }
        });
    }
    changePointMinus() {
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,  {"coffee_cups":Number(this.points - 1)}, (response) => {
            console.log('response', response);
            if (response.errors === null) {
                console.log('points ok');
                (new NotificationComponent('Успешно')).render();
                this.loadData()
            } else {
                (new NotificationComponent('Ошибка')).render();
                throw response.errors;
            }
        });
    }
    changePointMinusStack() {
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,  {"coffee_cups":Number(this.points - 5)}, (response) => {
            if (response.errors === null) {
                (new NotificationComponent('Успешно')).render();
                this.loadData()
            } else {
                (new NotificationComponent('Ошибка')).render();
                throw response.errors;
            }
        });
    }


    loadData() {
        authAjax('GET', `${constants.PATH}/api/v1/customers/${this.token}/points/`, null, (response) => {
            console.log('response data', response.data);
            if (response.errors === null) {
                this.points = Number(JSON.parse(response.data).coffee_cups);
                document.getElementById('label').innerHTML = '☕️'.repeat(this.points  % 5);

                let e = document.getElementById('stacks');

                let child = e.lastElementChild;

                while (child) {
                    e.removeChild(child);
                    child = e.lastElementChild;
                }
                for (let i = 0; i < Math.floor(this.points / 5); i++) {
                    let btn = document.createElement('button');
                    let t = document.createTextNode('☕️');
                    btn.addEventListener('click', this.changePointMinusStack);
                    btn.appendChild(t);
                    btn.className = 'stackCoffeeButton';
                    document.getElementById('stacks').appendChild(btn);
                }
            } else {
                (new NotificationComponent('Ошибка')).render();
                throw response.errors;
            }
        }).then(() => {
            console.log('then')
        });
    }

    _renderTemplate(){
        this._el.innerHTML = StaffMenu();
    }

    render()
    {
        this._renderTemplate();
        const buttonPlus = this._el.getElementsByClassName('buttonFlex__plus').item(0);
        buttonPlus.addEventListener('click', this.changePointPlus.bind(this));
        const buttonMinus = this._el.getElementsByClassName('buttonFlex__minus').item(0);
        buttonMinus.addEventListener('click', this.changePointMinus.bind(this));
        this.loadData();

    }
}








