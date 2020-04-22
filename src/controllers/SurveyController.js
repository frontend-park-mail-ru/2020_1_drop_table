'use strict';

/** контроллер авторизации */
export default class SurveyController {

    /**
     * Инициализация LoginController
     * @param {UserModel} userModel модель пользователя
     * @param {LoginView} loginView view для авторизации
     */
    constructor(formModel, surveyView) {
        this._formModel = formModel;
        this._surveyView = surveyView;
    }
    _addListeners(){
        console.log('add listener')
        let submitButton = document.getElementsByClassName('survey__submit__button').item(0);
        submitButton.addEventListener('click', this._submitForm.bind(this));
    }
    _submitForm(){
        console.log('submit');
        this._formModel.submitSurvey();
    }

    /** Запуск контроллера */
    async control(){
        await this.update();
        console.log('control 1', this._formModel._cells)
        this._surveyView.context = this._formModel._cells;
        console.log('test228', this._surveyView.context)
        this._surveyView.render();
        this._addListeners()

    }
    async update(){
        await this._formModel.update();
    }
}
