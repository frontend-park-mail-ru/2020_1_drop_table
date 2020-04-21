'use strict';
import authAjax from  '../utils/authAjax'
import {constants} from '../utils/constants';
import FormCellModel from './FormCellModel';

/** Класс модели кафе */
export default class FormModel {

    /** Инициализация модели */
    constructor(context) {
        console.log('formContext constr', context);
        this._cells = context.cells;

        //this.fillFormData(context);
    }

    async update() {
        await this.getForm();
    }


    get context() {
        return {
            cells: this._cells,
        }
    }

    /**
     * Заполняет поля userModel из объекта context
     * @param {obj} context
     */
    fillFormData(context) {
        if (context) {
            for(let i = 0; i < context.length; i++ ){
                this._cells.push(new FormCellModel(context[i]))
            }

            // this._cells = context['cells'];

        }
    }

    async getForm() {
        await authAjax('GET', constants.PATH + `/api/v1/form/${1}`,
            null,
            (response) => {
                if (response.errors === null) {
                    this.fillFormData(response.data);
                } else {
                    throw response.errors;
                }
            }
        );
    }
}

