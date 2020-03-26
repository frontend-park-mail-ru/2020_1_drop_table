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

    async _makeContext(){
        let cafeListContext = {
            cafeList: await this._cafeListModel.context
        };

        cafeListContext['header'] = {
            type: null,
            avatar: {
                photo: await this._userModel.photo,
                event: {
                    type: 'click',
                    listener: this._headerAvatarListener.bind(this)
                }
            }
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
        console.log('controll');
        this._cafeListView.context = await this._makeContext();
        this._cafeListView.render();
    }
}
