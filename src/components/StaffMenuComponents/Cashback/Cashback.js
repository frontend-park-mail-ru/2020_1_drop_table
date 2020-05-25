import './Cashback.scss';
import CashbackTemplate from './Cashback.hbs';
import {authAjax} from '../../../utils/authAjax';
import {constants} from '../../../utils/constants';
import NotificationComponent from '../../Notification/Notification';

export class Cashback {

    constructor(el = document.getElementById('application'), uuid, context) {
        this._el = el;
        this.token = uuid;
        this._context = context;
        this.balance = JSON.parse(context.points).points_count;
    }

    _renderTemplate(){
        console.log('render templ', this._context, this.balance)
        this._el.innerHTML = CashbackTemplate({balance: this.balance});
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
    }

    render()
    {
        this._renderTemplate();
        this._addListeners();
    }
    cashbackSetPoints() {
        let purchaseInput = this._el.getElementsByClassName('main__input-field_input').item(0)
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,
            {'points_count':Number(purchaseInput.value)}, (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Успешно')).render();
                } else {
                    console.log(response.errors);
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }
}








