'use strict';


import ServerExceptionHandler from '../utils/ServerExceptionHandler';
import NotificationComponent from '../components/Notification/Notification';
import {router} from '../main/main';

export default class PageNotFoundController{


    constructor(pageNotFoundView, errorCode, userModel) {
        this._errorCode = errorCode;
        this._pageNotFoundView = pageNotFoundView;
        this._userModel = userModel;
    }

    async update(){
        try {
            await this._userModel.update();
        } catch (exceptions) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exceptions);
        }
    }

    _makeViewContext(){
        let context = {};
        //todo Хедер в зависимости от того зареган ли юзер
        context['header'] = {
            type: null,
            isOwner: this._userModel.isOwner,

        };
        const code = Number(this._errorCode);
        switch (code) {

        case 404:
            context['error']={
                code: code,
                description:`
                404 
                `
            };
            break;
        case 405:
            context['error']={
                code: code,
                description:`
                405 
                `
            };
            break;

        case 406:
            context['error']={
                code: code,
                description:`
                406 ошибка 
                `
            };
            break;
        default:
            context['error']={
                code: code,
                description:`
                Что-то пошло не так.
                `
            };
            break;
        }

        return context;
    }

    _makeExceptionContext(){
        return {
            'no permission': () => {
                router._goTo('/login');
                throw new Error('no permission');
            },
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
            let context = this._makeViewContext()
            this._pageNotFoundView.render(this._makeViewContext(context));
        } catch (error) {
            console.log(error.message);
        }
    }
}
