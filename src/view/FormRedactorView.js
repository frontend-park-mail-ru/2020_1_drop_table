'use strict';

import {FormCreatorComponent} from '../components/FormCreator/FormCreator.js';
import '../components/CardCreator/CardCreator.scss'
import '../components/CardCreator/CardCreator.color.scss'

import BaseView from './BaseView';


/** view редактора крточки */
export default class FormRedactorView extends BaseView{

    /**
     * Инициализация CardRedactorView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
        this._context = null;
        this._formModel = null;
        let container = document.getElementsByClassName('form-creator-container').item(0);
        this.formCreator = new FormCreatorComponent(container);
    }

    /** Отрисовка редактора крточки */
    render() {
        console.log('render formredactor ',this._formModel.context )
        this.formCreator.render(this._formModel.context);

    }
}
