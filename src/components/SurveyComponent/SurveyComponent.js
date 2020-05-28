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
        this._el = el;
    }

    /**
     * Отрисовка шаблона кафе
     * @private
     */
    _renderTemplate(context) {
        this._el.innerHTML = SurveyComponentTemplate({cells:context});
        let cells = this._el.getElementsByClassName('survey__cells__cell');
        for(let i = 0; i < context.length; i++){
            (new FormCreatorCellComponent(cells.item(i)).render(context[i], 'small'))
        }
    }


    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);

    }
}
