'use strict';


/** Класс модели */
export default class FormCellModel {

    /** Инициализация модели */
    constructor(context) {
        this._question = context['question'];
        this._answerType = context['answerType'];
        this._answerOptions = context['answerOptions']?context['answerOptions']: [];
        console.log('constr new cell ',context )
    }

    set question(question){
        this._question = question;
    }
    set answerType(answerType){
        this._answerType = answerType;
    }
    set answerOptions(answerOptions){
        this._answerOptions = answerOptions;
    }

}
