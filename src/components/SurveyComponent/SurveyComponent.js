import './SurveyComponent.scss';
import SurveyComponentTemplate from './SurveyComponent.hbs';

import {FormCreatorCellComponent} from '../FormCreator/FormCreatorCell/FormCreatorCell'

export class SurveyComponent {

    /**
     * Инициализация компоненты карточки кафе
     * @param {Element} el элемент в кором будет размещаеться хэдер карточки
     * @param {string} imgSrc ссылка на фотографию кафе
     * @param {string} name название кафе
     * @param {int} id идентификатор кафе
     */
    constructor(el) {
        console.log('constr survey', el)
        this._el = el;
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {
        console.log('render 2', context)
        this._el.innerHTML = SurveyComponentTemplate({cells:context});

        //let cellsContainer = document.getElementsByClassName('survey__cells').item(0)
        console.log('render 2.05',this._el.innerHTML)
        let cells = this._el.getElementsByClassName('survey__cells__cell');
        console.log('render 2.1', cells)
        for(let i = 0; i < context.length; i++){
            (new FormCreatorCellComponent(cells.item(i)).render(context[i], 'small'))
        }
        console.log('render 3')
    }


    /** Отрисоака */
    render(context) {
        console.log('render 1', context)
        this._renderTemplate(context);

    }
}
