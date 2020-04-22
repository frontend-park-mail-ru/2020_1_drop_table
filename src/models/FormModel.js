'use strict';
import {ajax} from  '../utils/ajax'
import {constants} from '../utils/constants';
import NotificationComponent from '../components/Notification/Notification';

/** Класс модели кафе */
export class FormModel {

    /** Инициализация модели */
    constructor(cafeId, uuid) {
        console.log('test survey', cafeId, uuid)
        this._cells = [];
        this._cafeId = cafeId;
        this._uuid = uuid;
    }
    getData(){
        return this._cells;
    }

    async update() {
        await this.getSurvey();
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
            this._cells = JSON.parse(context);
        }
    }

    async saveSurvey() {
        let formData = await this._cells;
        let id = await this._cafeId;
        await ajax( constants.PATH + `/api/v1/survey/set_survey_template/${id}`,'POST',
            formData,
            (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Сохранено')).render();
                } else {
                    throw response.errors;
                }
            }
        );
    }

    async getSurvey() {
        let id = await this._cafeId;
        console.log('saveSurvey id',  this._cafeId);
        await ajax( constants.PATH + `/api/v1/survey/get_survey_template/${id}`,'GET',
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

    async submitSurvey() {
        let formData = await this._cells;
        let uuid = await this._uuid;
        await ajax( constants.PATH + `/api/v1/survey/submit_survey/${uuid}`,'POST',
            formData,
            (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Спасибо')).render();
                } else {
                    throw response.errors;
                }
            }
        );
    }
}

