'use strict';

import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import {router} from '../main/main';
import NotificationComponent from '../components/Notification/Notification';

/** контроллер авторизации */
export default class LoginController {

    /**
     * Инициализация LoginController
     * @param {UserModel} userModel модель пользователя
     * @param {LoginView} loginView view для авторизации
     */
    constructor(userModel, loginView) {
        this._userModel = userModel;
        this._loginView = loginView;
    }

    /** Event авторизации */
    async _submitListener(e){
        e.preventDefault();
        const form = document.getElementsByClassName('formContainer').item(0).firstElementChild;
        this._userModel.email = form.elements['email'].value;
        this._userModel.password = form.elements['password'].value;

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            try{
                await this._userModel.login();
            } catch (exception) {
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }

        }
    }

    /**
     * Создание контекста для LoginView
     * @return {obj} созданный контекст
     */
    _makeViewContext(){
        return {
            header: {
                type: 'auth',
                avatar: {
                    photo: null
                }
            },
            login: {
                form: {
                    event: {
                        type: 'submit',
                        listener: this._submitListener.bind(this)
                    }
                },
                register: {
                    event: {
                        type: 'click',
                        listener: ()=>{router._goTo('/reg');}
                    }
                }
            }
        }
    }

    /**
     * Создание контекста для FormValidation
     * @param {Element} form элемент валидируеммой формы
     * @return {Array} созданный контекст
     */
    _makeValidateContext(form){
        return [
            {
                element: form.elements['email'],
                validate: () => {
                    const emailRegex = new RegExp('\\S+@\\S+\\.\\S+');
                    if(!emailRegex.test(form.elements['email'].value.toString())){
                        return 'Некорректная почта';
                    }
                }
            },
            {
                element: form.elements['password'],
                validate: () => {
                    if(form.elements['password'].value.toString().length < 8){
                        return 'Пароль слишком короткий';
                    }
                }
            }
        ];
    }

    /**
     * Создание контекста для ServerExceptionHandler
     * @param {Element} form вылидируемый элемент
     * @return {obj} созданный контекст
     */
    _makeExceptionContext(form){
        return {
            'resource you request not found': [
                'Некорректный логин или пароль',
                form['password']
            ],
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.', 2000)).render();
                return [null, null]
            }
        };
    }

    /** Запуск контроллера */
    async control(){
        this._loginView.context = this._makeViewContext();
        this._loginView.render();

    }
}
