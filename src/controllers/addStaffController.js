'use strict';

import {router} from '../main/main';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import FormValidation from '../utils/FormValidation';
import NotificationComponent from "../components/Notification/Notification";

/** контроллер добавления работника */
export default class AddStaffController{

    /**
     * Инициализация AddStaffController
     * @param {UserModel} userModel модель пользователя
     * @param {RegisterView} registerView view регистрации
     * @param {string} uuid иденитфикатор работника
     */
    constructor(userModel, registerView, uuid, position) {
        this._userModel = userModel;
        this._registerView = registerView;
        this._uuid = uuid;
        this._position = position;
    }

    async update(){
        try{
            await this._userModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    /**
     * Создание контекста для RegisterView
     * @return {obj} созданный контекст
     */
    _makeViewContext(){
        return {
            header: {
                type: 'auth',
            },
            register: {
                topText:'Регистрация работника',
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

    /** Event добавления работника */
    async _submitListener(e) {
        e.preventDefault();

        let form = document.getElementsByClassName('authorize__form-container__form').item(0).item(0);
        const validateContext = this._makeValidateContext(form);
        const serverExceptionContext = this._makeExceptionContext(form);

        if((new FormValidation(form)).validate(validateContext)){

            this._userModel.email = form.elements['email'].value.toString();
            this._userModel.password = form.elements['password'].value.toString();
            this._userModel.name = form.elements['full-name'].value.toString();

            try {
                await this._userModel.addStaff(this._uuid, this._position);

            } catch (exception) {
                console.log('exc',exception);

                (new ServerExceptionHandler(form, serverExceptionContext)).handle(exception);
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
                element: form.elements['full-name'],
                validate: () => {
                    if(form.elements['full-name'].value.toString().length < 4){
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
                        return 'Пароль слишком короткий';
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

    /**
     * Создание контекста для ServerExceptionHandler
     * @param {Element} form вылидируемый элемент
     * @return {obj} созданный контекст
     */
    _makeExceptionContext(form){
        return {
            'pq: duplicate key value violates unique constraint "staff_email_key"': [
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
        await this.update();
        this._registerView.context = this._makeViewContext();
        this._registerView.render();
    }
}
