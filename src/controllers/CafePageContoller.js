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

    async _makeContext(id){
        const cafe = this._cafeListModel.getCafeById(id);
        console.log(cafe);

        let cafeContext = {
            'cafe': cafe.context
        };

        cafeContext['header'] = {
            type: null,
            avatar: {
                photo: this._userModel.photo,
                event: {
                    type: 'click',
                    listener: this._headerAvatarListener.bind(this)
                }
            }
        };

        return cafeContext;
    }

    async control(id){
        this._cafePageView.context = await this._makeContext(id);
        this._cafePageView.render();
    }


}

