'use strict';


export default class PageNotFoundController{


    constructor(pageNotFoundView, errorCode) {
        this._errorCode = errorCode;
        this._pageNotFoundView = pageNotFoundView;
    }

    _makeViewContext(){
        let context = {};
        context['header'] = {
            type: 'profile',

        };

        switch (Number(this._errorCode)) {

        case 404:
            context['error']={
                code: this._errorCode,
                description:`
                404 ошибка краткое описание или чето еще
                `
            };
            break;
        case 405:
            context['error']={
                code: this._errorCode,
                description:`
                405 ошибка краткое описание или чето еще
                `
            };
            break;

        case 406:
            context['error']={
                code: this._errorCode,
                description:`
                406 ошибка краткое описание или чето еще
                `
            };
            break;
        default:
            context['error']={
                code: this._errorCode,
                description:`
                Что-то новенькое 
                `
            };
            break;
        }

        return context;
    }



    /** Запуск контроллера */
    async control(){
        this._pageNotFoundView.render(this._makeViewContext());
    }
}
