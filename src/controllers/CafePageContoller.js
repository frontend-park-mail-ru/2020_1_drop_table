import {Router} from "../modules/Router";

export default class CafePageController {

    constructor(cafeListModel, userModel, cafePageView){
        this._cafeListModel = cafeListModel;
        this._userModel = userModel;
        this._cafePageView = cafePageView;
    }

    _headerAvatarListener(){
        Router.redirect('/Profile');
    }

    _makeContext(id){
        return new Promise((resolve, reject) => {
            this._checkCafeModel().then(() => {
                this._checkUserModel().then(() => {
                    const cafe = this._cafeListModel.getCafeById(id);
                    let cafeContext = {'cafe': cafe.context};
                    cafeContext['header'] = {
                        type: null,
                        avatar:{
                            photo: this._userModel.photo,
                            event:{
                                type: 'click',
                                listener: this._headerAvatarListener.bind(this)
                            }
                        },
                    };
                    resolve(cafeContext);
                });
            });
        });
    }

    _checkUserModel(){
        return new Promise((resolve, reject) => {
            if(this._userModel.id == null && this._userModel.email != null){
                this._userModel.getOwner().then(() => {
                    resolve();
                });
            } else {
                resolve();
            }

        })
    }

    _checkCafeModel(){
        return new Promise((resolve, reject) => {
            if( this._cafeListModel.isEmpty ) {
                this._cafeListModel.cafesList().then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    control(id){
        this._makeContext(id).then((context) => {
            this._cafePageView.context = context;
            this._cafePageView.render();
        });
    }


}

