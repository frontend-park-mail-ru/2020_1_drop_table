import './Cashback.scss';
import CashbackTemplate from './Cashback.hbs';

export class Cashback {

    constructor(el = document.getElementById('application'), uuid, context) {
        this._el = el;
        this.token = uuid;
        this._context = context;
        this.balance = JSON.parse(context.points).points_count;
    }

    _renderTemplate(){
        this._el.innerHTML = CashbackTemplate({balance: this.balance});
    }

    _addListeners(){
        const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
        let events = entriesPolyFill(this._context);
        for(let i = 0; i < events.length; i++){
            events[i]['object'].addEventListener('click', events[i]['listener'].bind(this))
        }
    }

    render()
    {
        this._renderTemplate();
        this._addListeners();
    }
}








