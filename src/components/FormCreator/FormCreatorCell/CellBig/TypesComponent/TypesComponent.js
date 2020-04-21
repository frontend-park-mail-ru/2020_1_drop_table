
import TypesComponentTemplate from './TypesComponent.hbs'



export class TypesComponent {


    constructor(el) {
        this._el = el;
    }

    cellTypeIndex(type){
        switch (type) {
        case 'text':
            return 0;
        case 'phone':
            return 1;
        case 'date':
            return 2;
        case 'listOne':
            return 3;
        case 'listMany':
            return 4;

        }
    }
    _postRender(context){
        let types = this._el.getElementsByClassName(`big-form-cell__answer-type__types__type-active`);
        if(types) {
            for (let i = 0; i < types.length; i++) {
                types.item(i).className = 'big-form-cell__answer-type__types__type';
            }
        }
        types = this._el.getElementsByClassName(`big-form-cell__answer-type__types__type`);
        types.item(this.cellTypeIndex(context.answerType)).className += '-active';
    }
    _renderTemplate(context) {
        this._el.innerHTML = TypesComponentTemplate(context);
        this._postRender(context);

    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);

    }
}
