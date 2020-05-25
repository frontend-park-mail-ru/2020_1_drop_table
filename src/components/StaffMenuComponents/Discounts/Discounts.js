import './Discounts.scss';
import DiscountsTemplate from './Discounts.hbs';
import {authAjax} from '../../../utils/authAjax';
import {constants} from '../../../utils/constants';
import NotificationComponent from '../../Notification/Notification';

export class Discounts {

    constructor(el = document.getElementById('application'), uuid, context) {
        this._el = el;
        this.token = uuid;
        this._context = context;
        this._discount =  JSON.parse(context.points).discount;

    }



    _renderTemplate(){
        this._el.innerHTML = DiscountsTemplate({discount:this._discount});
    }

    _addListeners(){
        const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
        let events = entriesPolyFill(this._context['events']);
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

    discountPurchase() {
        let purchaseInput = this._el.getElementsByClassName('main__input-field_input').item(0)
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,
            {'new_purchases':Number(purchaseInput.value)}, (response) => {
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








