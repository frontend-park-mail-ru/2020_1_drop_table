import './FormCreator.scss';
import FormCreator from './FormCreator.hbs';

import {FormCreatorCellComponent} from './FormCreatorCell/FormCreatorCell'

/** Компонент карточки кафе */
export class FormCreatorComponent {

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

        this._el.innerHTML = FormCreator(context);
        //let cells = document.getElementsByClassName('form-creator-container__cells-container__cell');
        for(let i = 0; i < context.cells.length; i++){
            this._renderCell(context.cells[i], 'big');
            //(new FormCreatorCellComponent(cells.item(i)).render(context.cells[i], 'big'))
        }
    }

    _renderCell(context, type){
        console.log('_render cell ')
        console.log( context)
        let cell = document.getElementById(`cell-${context.cell_id}`);

        if(type === 'big'){
            (new FormCreatorCellComponent(cell).render(context, 'big'))
        } else if(type === 'small'){
            (new FormCreatorCellComponent(cell).render(context, 'small'))
        }
    }

    /** Отрисоака */
    render(context) {
        this._renderTemplate(context);

    }
}
