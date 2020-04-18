'use strict';

import {router} from '../main/main';

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

    /**
     * Создание контекста для CafeListView
     * @return {obj} созданный контекст
     */
    async _makeViewContext(){
        let cafeListContext = {
            cafeList: await this._cafeListModel.context
        };

        cafeListContext['header'] = {
            type: null,
            avatar: {
                photo: this._userModel.photo,
                event: {
                    type: 'click',
                    listener: () => {router._goTo('/profile');}
                }
            }
        };

        cafeListContext['button'] = {
            event:{
                type: 'click',
                listener: () => {router._goTo('/createCafe');}
            }
        };
        console.log(cafeListContext);
        return cafeListContext;
    }

    _serviceWorkerEventListener(event){
        if(event.data.type === 'refresh'){
            this.control();
        }
    }

    /** Запуск контроллера */
    async control(){
        this._cafeListView.context = await this._makeViewContext();
        this._cafeListView.render();
    }
}
