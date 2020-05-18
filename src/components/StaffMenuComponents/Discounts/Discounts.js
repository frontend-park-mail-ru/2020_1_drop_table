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
}








