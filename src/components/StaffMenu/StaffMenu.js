import './StaffMenu.css';
import StaffMenu from './StaffMenu.hbs';
import {ajax} from "../../utils/ajax";
import {router} from "../../main/main";
import {constants} from "../../utils/constants";
import {authAjax} from "../../utils/authAjax";
import {staffMenuAjax} from "../../utils/staffMenuAjax";

export class StaffMenuComponent {

    constructor(el = document.getElementById('application'), uuid) {
        this._el = el;
        this.points = 0;
        this.token = uuid;

        this.csrfcookie = function () {
            let cookieValue = null,
                name = 'csrftoken';
            if (document.cookie && document.cookie !== '') {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };

    }


    changePointMinusStack() {
        this.changePoints(-5);
    }

    changePoints() {
        let data = {
            token: this.token,
            loyalty_points: this.points + 1
        };
        console.log(data)
        console.log(this.points, this.token)

        staffMenuAjax(`${constants.PATH}/api/v1/customers/${data.token}/${data.loyalty_points}`, 'PUT', null, (response) => {
            console.log('response', response);
            if (response.errors === null) {
                console.log('points ok');
                this.loadData()
            } else {
                throw response.errors;
            }
        }).then(r => {
            console.log('then')
        });
    }

    loadData() {
        staffMenuAjax('GET', `${constants.PATH}/api/v1/customers/${this.token}/points/`, null, (response) => {
            console.log('response data', response.data);
            if (response.errors === null) {
                this.points = response.data;
                document.getElementById("label").innerHTML = "☕️".repeat(response.data % 5);

                let e = document.getElementById("stacks");

                let child = e.lastElementChild;

                while (child) {
                    e.removeChild(child);
                    child = e.lastElementChild;
                }
                for (let i = 0; i < Math.floor(response.data / 5); i++) {
                    let btn = document.createElement("button");
                    let t = document.createTextNode("☕️");
                    btn.addEventListener('click', this.changePointMinusStack);
                    btn.appendChild(t);
                    btn.className = "stackCoffeeButton";
                    document.getElementById("stacks").appendChild(btn);
                }
            } else {
                throw response.errors;
            }
        }).then(r => {
            console.log('then')
        });
    }

        _renderTemplate(){
        console.log('render teml')
            this._el.innerHTML = StaffMenu();
        }

        render()
        {
            this._renderTemplate();
            const buttonPlus = this._el.getElementsByClassName('buttonFlex__plus').item(0);
            buttonPlus.addEventListener('click', this.changePoints.bind(this));
            const buttonMinus = this._el.getElementsByClassName('buttonFlex__minus').item(0);
            buttonMinus.addEventListener('click', this.changePoints.bind(this));
            this.loadData();

        }
    }








