import Header from '../components/Header/Header';
import {CafePageComponent} from '../components/CafePageComponent/CafePage';
import CardRedactorController from '../controllers/CardRedactorController';
import CardRedactorView from './CardRedactorView';
import {AppleCardModel} from '../models/AppleCardModel';

import FormModel from '../models/FormModel';
import FormRedactorController from '../controllers/FormRedactorController';
import FormRedactorView from '../view/FormRedactorView';

import BaseView from './BaseView';

/** view страницы кафе */
export default class CafePageView extends BaseView {

    /**
     * Инициализация CafePageView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
        this._formContext = {
            cells: [
                {
                    cell_id: 0,
                    question: 'Вопрос',
                    answerType: 'text',
                    answerOptions: [
                        {
                            cell_id : 0,
                            option_id: 0,
                            text:'Первое'
                        },
                        {
                            cell_id : 0,
                            option_id: 1,
                            text:'Второе'
                        },
                        {
                            cell_id : 0,
                            option_id: 2,
                            text:'Третье'
                        },

                    ],
                },
                {
                    cell_id: 1,
                    question: 'Вопрос',
                    answerType: 'text',
                    answerOptions: null,
                },
            ]
        }
    }

    applePassButtonClick () { //TODO move to controller
        let cardContainer = document.getElementsByClassName('card-creator-container').item(0);
        // let formContainer = document.getElementsByClassName('form-creator-container').item(0);
        if( cardContainer.innerHTML.toString().length <= 2 ) {
            const appleCardModel = new AppleCardModel(this._context['cafe'].id);
            const cardRedactorView = new CardRedactorView();
            const cardRedactorController = new CardRedactorController(appleCardModel, cardRedactorView);
            cardRedactorController.control();


            const formModel = new FormModel(this._formContext);
            console.log('formModel context ',formModel.context)
            const formRedactorView = new FormRedactorView();
            const formRedactorController = new FormRedactorController(formModel, formRedactorView);
            formRedactorController.control();


        }

    }

    /** Отрисовка страницы с кафе */
    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);

        const profileElement = document.createElement('div');
        (new CafePageComponent(profileElement)).render(this._context['cafe']);
        this._app.appendChild(profileElement);


        const buttonApplePass =  document.getElementsByClassName('buttons__apple-pass-button').item(0);
        buttonApplePass.addEventListener('click',this.applePassButtonClick.bind(this));


        const buttonAddStaff =  document.getElementsByClassName('buttons__add-staff-button').item(0);
        buttonAddStaff.addEventListener('click',this.context['add-staff-button']);


        const buttonEditCafe =  document.getElementsByClassName('cafe-page__cafe-info__edit-button').item(0);
        buttonEditCafe.addEventListener('click',this.context['cafe-page__cafe-info__edit-button']);
    }

}
