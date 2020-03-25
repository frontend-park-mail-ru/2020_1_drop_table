'use strict';

import {Router} from "../modules/Router";

export default class CafeListController{

    constructor(cafeListModel, userModel, cafeListView) {
        this._cafeListModel = cafeListModel;
        this._userModel = userModel;
        this._cafeListView = cafeListView;
    }

    _headerAvatarListener(){
        Router.redirect('/Profile');
    }

    _cafeListButtonListener(){
        Router.redirect('/createCafe')
    }

    async _checkCafeListModel(){
        if(this._cafeListModel.isEmpty) {
            try {
                await this._cafeListModel.cafesList();
            } catch (exception) {
                alert(exception[0].message); //TODO обработка исключения
            }
        }
    }


    async _checkUserData(){
        if (this._userModel.id == null && this._userModel.email != null) {
            try {
                await this._userModel.getOwner();
            } catch (exception) {
                alert(exception[0].message); //TODO обработка исключения
            }
        }
    }

    async _makeContext(){
        await this._checkCafeListModel();
        await this._checkUserData();

        let cafeListContext = {
            cafeList: this._cafeListModel.context
        };

        cafeListContext['header'] = {
            type: null,
            avatar:{
                photo: this._userModel.photo,
                event:{
                    type: 'click',
                    listener: this._headerAvatarListener.bind(this)
                }
                },
        };

        cafeListContext['button'] = {
            event:{
                type: 'click',
                listener: this._cafeListButtonListener.bind(this)
            }
        };

        return cafeListContext;
    }

    async control(){
        this._cafeListView.context = await this._makeContext();
        this._cafeListView.render();
    }
}
