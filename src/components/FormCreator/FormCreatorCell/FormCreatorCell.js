
import './FormCreatorCell.scss'

import FormCreatorCellBig from './CellBig/FormCreatorCellBig.hbs'
import FormCreatorCellSmall from './CellSmall/FormCreatorCellSmall.hbs'
import {TypesComponent} from './CellBig/TypesComponent/TypesComponent';
import {OptionsComponent} from './CellBig/OptionsComponent/OptionsComponent';
import {SmallOptionsComponent} from './CellSmall/SmallOptionsComponent/SmallOptionsComponent';
// import FormCreatorCellSmall from './FormCreatorCell/FormCreatorCellSmall.hbs'
/** Компонент карточки кафе */
export class FormCreatorCellComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        console.log('constructor cell', el)
        this._el = el;
        this._cellsList = [];
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */



    _renderTypes(context){
        let answerTypes = this._el.getElementsByClassName('big-form-cell__answer-type').item(0);
        (new TypesComponent(answerTypes).render(context))
    }
    _renderOptions(context){
        if( context.answerType === 'listOne' || context.answerType === 'listMany'){
            let answerOptions =  this._el.getElementsByClassName('big-form-cell__answer-options').item(0);
            (new OptionsComponent(answerOptions)).render(context);
        }
    }
    _renderSmallOptions(context){
        console.log('small options',context)

        let answerOptions =  this._el.getElementsByClassName('small-form-cell__answer-options').item(0);
        if(context.answerType === 'listOne' || context.answerType === 'listMany'){
            (new SmallOptionsComponent(answerOptions)).render(context);
        }
    }

    _renderTemplate(context, type) {
        if(type === 'big'){
            console.log('render template big', this._el);
            this._el.innerHTML = FormCreatorCellBig(context);
            this._renderTypes(context);
            this._renderOptions(context)

        } else if(type === 'small'){
            console.log('render template small', this._el);
            this._el.innerHTML = FormCreatorCellSmall(context);

            this._renderSmallOptions(context)
        }

    }

    /** Отрисоака */
    render(context, type) {
        this._renderTemplate(context, type);

    }
}
