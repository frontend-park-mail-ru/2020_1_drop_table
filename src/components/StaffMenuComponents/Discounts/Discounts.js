import './Discounts.scss';
import DiscountsTemplate from './Discounts.hbs';

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








