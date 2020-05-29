'use strict';
import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import NotificationComponent from '../components/Notification/Notification';
import {router} from '../main/main';

/** контроллер профиля */
export default class RegisterController{

    /**
     * Инициализация UserProfileController
     * @param {UserModel} userModel модель пользователя
     * @param {UserProfileView} userProfileView view профиля
     */
    constructor(userModel, registerView){
        this._userModel = userModel;
        this._registerView = registerView;
    }

    async update(){
        try{
            await this._userModel.update();
            router._goTo('/myCafes')
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    /** Event изменения профиля */
    async _submitListener(e) {
        e.preventDefault();
        const form = document.getElementsByClassName('authorize__form-container__form').item(0);

        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if ((new FormValidation(form)).validate(validateContext)) {
            this._userModel.name = form.elements['full-name'].value.toString();
            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();

            try {
                await this._userModel.register();
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
            register: {
                topText:'Регистрация',
                form: {
                    formFields: [
                        {
                            type: 'text',
                            id: 'full-name',
                            data: '',
                            labelData: 'Имя',
                            inputOption: 'required',
                        },
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
                        {
                            type: 'password',
                            id: 're-password',
                            data: '',
                            labelData: 'Подтвердите пароль',
                            inputOption: 'required',
                        },

                    ],
                    redirect: {
                        textRedirect: 'Уже есть аккаунт?',
                        link: '/login',
                        linkText :'Войти',
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
                element: form.elements['full-name'],
                validate: () => {
                    if(form.elements['full-name'].value.toString().length < 1){
                        return 'Имя слишком короткое';
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
            {
                element: form.elements['password'],
                validate: () => {
                    if(form.elements['password'].value.toString().length < 8){
                        return 'Пароль слишком короткий.Необходимо минимум 8 символов';
                    }
                }
            },
            {
                element: form.elements['re-password'],
                validate: () => {
                    if(form.elements['re-password'].value.toString() !== form.elements['password'].value.toString()){
                        return 'Пароли не совпадают';
                    }
                }
            },
        ];
    }


    _makeExceptionContext(form = document.body){
        return {
            'pq: duplicate key value violates unique constraint "staff_email_key"': [
                'Пользователь с такой почтой уже существует',
                form['email']
            ],
            'given item already existed': [
                'Пользователь с такой почтой уже существует',
                form['email']
            ],
            'Key: \'Staff.Password\' Error:Field validation for \'Password\' failed on the \'min\' tag': [
                'Минимальная длинна пароля 8 символов',
                form['password']
            ],
            'Key: \'Staff.Name\' Error:Field validation for \'Name\' failed on the \'min\' tag': [
                'Имя слишком короткое',
                form['full-name']
            ],
            'Key: \'Staff.Email\' Error:Field validation for \'Email\' failed on the \'email\' tag': [
                'Некоректная почта',
                form['email']
            ],
            'Key: \'Staff.Name\' Error:Field validation for \'Name\' failed on the \'max\' tag': [
                'Имя слишком длинное',
                form['full-name']
            ],
            'Key: \'Staff.Password\' Error:Field validation for \'Password\' failed on the \'max\' tag': [
                'Пароль слишком длинный',
                form['password']
            ],
            'no permission': ()=>{return [null, null]},
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            }
        };
    }

    /** Запуск контроллера */
    async control(){
        try {
            await this.update();
            this._registerView.context = this._makeViewContext();
            this._registerView.render();
        } catch (error) {
            console.log(error.message);
        }
    }

}
