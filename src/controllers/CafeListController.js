'use strict';

import {Router} from "../modules/Router";
import {router} from "../main/main";

export default class CafeListController{

    constructor(cafeListModel, userModel, cafeListView) {
        this._cafeListModel = cafeListModel;
        this._userModel = userModel;
        this._cafeListView = cafeListView;
    }

    _headerAvatarListener(){
        router._goTo('/profile');
    }

    _cafeListButtonListener(){
        router._goTo('/createCafe');
    }

    async _makeContext(){

        let cafeListContext = {
            cafeList: await this._cafeListModel.context
        };

        cafeListContext['header'] = {
            type: null,
            avatar: {
                photo: this._userModel.photo,
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
        console.log(cafeListContext);
        return cafeListContext;
    }

    async control(){
        this._cafeListView.context = await this._makeContext();
        this._cafeListView.render();
    }
}
