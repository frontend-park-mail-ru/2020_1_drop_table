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
    _changeInput(){
        let cellId = this.input.id.split('-')[1];
        this._formModel._cells[cellId].text = this.input.value;

    }

    _addInputListeners(){
        let cellInputs = document.getElementsByClassName('small-form-cell__question_input');
        for(let i = 0; i < cellInputs.length; i++){
            let input = cellInputs.item(i);
            input.addEventListener('change',this._changeInput.bind({
                _formModel: this._formModel,
                input: input,
            }))
        }
    }
    _addListeners(){
        console.log('add listener')
        let submitButton = document.getElementsByClassName('survey__submit__button').item(0);
        submitButton.addEventListener('click', this._submitForm.bind(this));
        this._addInputListeners();



        let optionButtons =
            document.getElementsByClassName('small-form-cell__answer-options__list__cell__button');
        for(let i = 0; i < optionButtons.length; i++){
            let context = {
                _formModel: this._formModel,
                cell_id: Number(optionButtons.item(i).id.split('-')[1]),
                option_id: Number(optionButtons.item(i).id.split('-')[2]),
            };
            optionButtons.item(i).addEventListener('click', this.optionButtonsListener.bind(context))
        }

        let optionButtonsActive =
            document.getElementsByClassName('small-form-cell__answer-options__list__cell__button-active');
        for(let i = 0; i < optionButtonsActive.length; i++){
            let context = {
                _formModel: this._formModel,
                cell_id: Number(optionButtons.item(i).id.split('-')[1]),
                option_id: Number(optionButtons.item(i).id.split('-')[2]),
            };
            optionButtonsActive.item(i).addEventListener('click',  this.optionButtonsListener.bind(context))
        }


    }

    optionButtonsListener(){
        let answerType = this._formModel._cells[this.cell_id].answerType;
        if(answerType === 'listOne'){
            let answerOptions =  this._formModel._cells[this.cell_id].answerOptions;
            for(let i = 0; i < answerOptions.length;i++){
                let button =
                    document.getElementById(`button-${answerOptions[i].cell_id}-${answerOptions[i].option_id}`);

                if(i === this.option_id){
                    if(answerOptions[i].checked){
                        button.className = 'small-form-cell__answer-options__list__cell__button'
                    } else{
                        button.className = 'small-form-cell__answer-options__list__cell__button-active'

                    }
                    answerOptions[i].checked = !answerOptions[i].checked;
                } else {
                    answerOptions[i].checked = false;
                    button.className = 'small-form-cell__answer-options__list__cell__button'
                }
            }

        } else if(answerType === 'listMany'){
            let answerOptions =  this._formModel._cells[this.cell_id].answerOptions;
            for(let i = 0; i < answerOptions.length;i++){
                let button =
                    document.getElementById(`button-${answerOptions[i].cell_id}-${answerOptions[i].option_id}`);
                if(answerOptions[i].checked){
                    button.className = 'small-form-cell__answer-options__list__cell__button'
                } else{
                    button.className = 'small-form-cell__answer-options__list__cell__button-active'

                }
                answerOptions[i].checked = !answerOptions[i].checked;
            }
        }
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
