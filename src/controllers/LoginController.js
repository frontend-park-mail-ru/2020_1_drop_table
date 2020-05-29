'use strict';
import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import NotificationComponent from '../components/Notification/Notification';
import {router} from '../main/main';

/** контроллер профиля */
export default class LoginController{

    /**
     * Инициализация UserProfileController
     * @param {UserModel} userModel модель пользователя
     * @param {UserProfileView} userProfileView view профиля
     */
    constructor(userModel, loginView){
        this._userModel = userModel;
        this._loginView = loginView;
    }

    async update(){
        try{
            await this._userModel.update();
            router._goTo('/myCafes')
        } catch (exception) {
            return (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    /** Event изменения профиля */
    async _submitListener(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('authorize__form-container__form').item(0);

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();

            try {
                await this._userModel.login();
            } catch (exception) {
                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
            }
        }
    }

    /**
     * Создание контекста для UserProfileView
     * @return {obj} созданный контекст
     */
    _makeViewContext() {
        return {
            header: {
                type: 'auth',
                isOwner: this._userModel._isOwner,
            },
            login: {
                topText:'Авторизация',
                form: {
                    formFields: [
                        {
                            type: 'email',
                            id: 'email',
                            data: '',
                            labelData: 'Почта',
                            inputOption: 'required',
                        },
                        {
                            type: 'password',
                            id: 'password',
                            data: '',
                            labelData: 'Пароль',

                            inputOption: 'required',
                        },

                    ],
                    redirect: {
                        textRedirect: 'Впервые у нас?',
                        link: '/reg',
                        linkText :'Зарегистрироваться',
                    },

                    submitValue: 'Готово',
                    event: {
                        type: 'submit',
                        listener: this._submitListener.bind(this)
                    },
                },
            }
        };
    }

    /**
     * Создание контекста для FormValidation
     * @param {Element} form элемент валидируеммой формы
     * @return {Array} созданный контекст
     */
    _makeValidateContext(form){
        return [
            {
                element: form.elements['password'],
                validate: () => {
                    if(form.elements['password'].value.toString().length < 8){
                        return 'Пароль слишком короткий. Необходимо минимум 8 символов';
                    }
                }
            },
            {
                element: form.elements['email'],
                validate: () => {
                    const emailRegex = new RegExp('\\S+@\\S+\\.\\S+');
                    if(!emailRegex.test(form.elements['email'].value.toString())){
                        return 'Некорректная почта';
                    }
                }
            },
        ];
    }


    _makeExceptionContext(form = document.body){
        return {
            'incorrect password or email': [
                'Некорректный логин или пароль',
                form['password']
            ],
            'resource you request not found': [
                'Некорректный логин или пароль',
                form['password']
            ],
            'no permission': ()=>{return [null, null]},
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            },
        };
    }

    /** Запуск контроллера */
    async control(){
        try {
            await this.update();
            this._loginView.context = this._makeViewContext();
            this._loginView.render();
        } catch (error) {
            console.log(error.message);
        }
    }
}
