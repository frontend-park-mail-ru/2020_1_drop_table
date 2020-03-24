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

    _checkCafeListModel(){
        return new Promise((resolve, reject) => {
            if(this._cafeListModel.isEmpty) {
                this._cafeListModel.cafesList().then(()=>{
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    _checkUserData(){
        return new Promise((resolve, reject) => {
            if (this._userModel.id == null && this._userModel.email != null){
                this._userModel.getOwner().then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    _makeContext(){
        return new Promise((resolve, reject) => {
            this._checkCafeListModel().then(()=>{
                this._checkUserData().then(() => {
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

                    resolve(cafeListContext);
                });
            });
        });
    }

    control(){
        this._makeContext().then((context) => {
            this._cafeListView.context = context;
            this._cafeListView.render();
        });
    }
}
