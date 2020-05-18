import './CoffeeCup.scss';
import CoffeeCupTemplate from './CoffeeCup.hbs';
import {authAjax} from '../../../utils/authAjax';
import {constants} from '../../../utils/constants';
import NotificationComponent from '../../Notification/Notification';


export class CoffeeCup {

    constructor(el = document.getElementById('application'), uuid, context) {
        this._el = el;
        this.points = 0;
        this.token = uuid;
        this._context = context;
        this.stack = JSON.parse(context.points).cups_count;
    }



    _renderTemplate(){
        console.log('add tmpl');
        console.log('aa', this._context);
        this._el.innerHTML = CoffeeCupTemplate();
    }

    _addListeners(){
        console.log('add listeners');
        const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
        let events = entriesPolyFill(this._context['events']);
        console.log('context events', events)
        for(let i = 0; i < events.length; i++){
            console.log('test',events[i]);
            let obj = this._el.getElementsByClassName(events[i][1]['object']).item(0);
            console.log('test',obj);
            obj.addEventListener('click', events[i][1]['listener'].bind(this))
        }
        this.loadCoffeeCups();
    }

    loadCoffeeCups() {
        authAjax('GET', `${constants.PATH}/api/v1/customers/${this.token}/points/`,
            null, (response) => {
                if (response.errors === null) {
                    this.points = Number(JSON.parse(response.data).coffee_cups);
                    document.getElementById('label').innerHTML = '☕️'.repeat(this.points  % this.stack);
                    let e = document.getElementById('stacks');
                    let child = e.lastElementChild;
                    while (child) {
                        e.removeChild(child);
                        child = e.lastElementChild;
                    }
                    for (let i = 0; i < Math.floor(this.points / this.stack); i++) {
                        let btn = document.createElement('button');
                        let t = document.createTextNode('☕️');
                        btn.addEventListener('click', this.coffeeCupPointMinusStack);
                        btn.appendChild(t);
                        btn.className = 'stackCoffeeButton';
                        document.getElementById('stacks').appendChild(btn);
                    }
                } else {
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }
    render()
    {
        this._renderTemplate();
        this._addListeners();

    }
}








