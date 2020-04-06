import './StaffMenu.scss';
import StaffMenu from './StaffMenu.hbs';
import {constants} from '../../utils/constants';
import {authAjax} from '../../utils/authAjax';


export class StaffMenuComponent {

    constructor(el = document.getElementById('application'), uuid) {
        this._el = el;
        this.points = 0;
        this.token = uuid;
    }


    changePointPlus() {
        let data = {
            token: this.token,
            loyalty_points: this.points + 1
        };

        authAjax('PUT',`${constants.PATH}/api/v1/customers/${data.token}/${data.loyalty_points}/`,  {}, (response) => {
            console.log('response', response);
            if (response.errors === null) {
                console.log('points ok');
                this.loadData()
            } else {
                throw response.errors;
            }
        }).then(() => {
            console.log('then')
        });
    }
    changePointMinus() {
        let data = {
            token: this.token,
            loyalty_points: this.points - 1
        };

        authAjax('PUT',`${constants.PATH}/api/v1/customers/${data.token}/${data.loyalty_points}/`,  {}, (response) => {
            console.log('response', response);
            if (response.errors === null) {
                console.log('points ok');
                this.loadData()
            } else {
                throw response.errors;
            }
        }).then(() => {
            console.log('then')
        });
    }
    changePointMinusStack() {
        let data = {
            token: this.token,
            loyalty_points: this.points -5
        };

        authAjax('PUT',`${constants.PATH}/api/v1/customers/${data.token}/${data.loyalty_points}/`,  {}, (response) => {
            console.log('response', response);
            if (response.errors === null) {
                console.log('points ok');
                this.loadData()
            } else {
                throw response.errors;
            }
        }).then(() => {
            console.log('then')
        });
    }

    changePoints(point) {
        let data = {
            token: this.token,
            loyalty_points: this.points + point
        };

        authAjax('PUT',`${constants.PATH}/api/v1/customers/${data.token}/${data.loyalty_points}/`,  {}, (response) => {
            console.log('response', response);
            if (response.errors === null) {
                console.log('points ok');
                this.loadData()
            } else {
                throw response.errors;
            }
        }).then(() => {
            console.log('then')
        });
    }

    loadData() {
        authAjax('GET', `${constants.PATH}/api/v1/customers/${this.token}/points/`, null, (response) => {
            console.log('response data', response.data);
            if (response.errors === null) {
                this.points = response.data;
                document.getElementById('label').innerHTML = '☕️'.repeat(response.data % 5);

                let e = document.getElementById('stacks');

                let child = e.lastElementChild;

                while (child) {
                    e.removeChild(child);
                    child = e.lastElementChild;
                }
                for (let i = 0; i < Math.floor(response.data / 5); i++) {
                    let btn = document.createElement('button');
                    let t = document.createTextNode('☕️');
                    btn.addEventListener('click', this.changePointMinusStack);
                    btn.appendChild(t);
                    btn.className = 'stackCoffeeButton';
                    document.getElementById('stacks').appendChild(btn);
                }
            } else {
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








