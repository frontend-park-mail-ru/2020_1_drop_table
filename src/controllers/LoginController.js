'use strict';
import FormValidation from '../utils/FormValidation';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import NotificationComponent from '../components/Notification/Notification';

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
            },
            login: {
                topText:'Логин',
                form: {
                    formFields: [
                        {
                            type: 'text',
                            id: 'full-name',
                            data: this._userModel.name,
                            labelData: 'Имя',
                            inputOption: 'required',
                        },
                        {
                            type: 'email',
                            id: 'email',
                            data: this._userModel.email,
                            labelData: 'Почта',
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
                element: form.elements['Position'],
                validate: () => {
                    if(form.elements['Position'].value.toString().length < 4){
                        return 'Должность слишком короткая';
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
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.', 2000)).render();
                return [null, null]
            }
        };
    }

    /** Запуск контроллера */
    async control(){
        await this.update();
        this._loginView.context = this._makeViewContext();
        this._loginView.render();
    }

}
