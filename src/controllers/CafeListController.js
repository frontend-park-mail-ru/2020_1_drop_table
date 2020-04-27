'use strict';

import {router} from '../main/main';
import NotificationComponent from "../components/Notification/Notification";
import ServerExceptionHandler from "../utils/ServerExceptionHandler";

/** контроллер списка кафе */
export default class CafeListController{

    /**
     * Инициализация CafeListController
     * @param {CafeListModel} cafeListModel модель списка кафе
     * @param {UserModel} userModel модель пользователя
     * @param {CafeListView} cafeListView view списка кафе
     */
    constructor(cafeListModel, userModel, cafeListView) {
        this._cafeListModel = cafeListModel;
        this._userModel = userModel;
        this._cafeListView = cafeListView;
    }

    async update(){
        try {
            await this._userModel.update();
            await this._cafeListModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    /**
     * Создание контекста для CafeListView
     * @return {obj} созданный контекст
     */
    _makeViewContext(){

        let cafeListContext = {
            cafeList: this._cafeListModel.context
        };

        cafeListContext['header'] = {
            type: null,
            avatar: {
                photo: this._userModel.photo,
                event: {
                    type: 'click',
                    listener: () => {router._goTo('/profile')}
                }
            }
        };

        cafeListContext['button'] = {
            event:{
                type: 'click',
                listener: () => {router._goTo('/createCafe')}
            }
        };

        return cafeListContext;
    }

    _makeExceptionContext(){
        return {
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            }
        };
    }

    /** Запуск контроллера */
    async control(){
        await this.update();
        this._cafeListView.context = this._makeViewContext();
        this._cafeListView.render();
    }
}
