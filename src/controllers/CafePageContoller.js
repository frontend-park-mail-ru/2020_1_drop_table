import {router} from "../main/main";


export default class CafePageController {

    constructor(cafeListModel, userModel, cafePageView){
        this._cafeListModel = cafeListModel;
        this._userModel = userModel;
        this._cafePageView = cafePageView;
    }

    addStaffButtonClick(e){
        this._userModel.addStaffQR(this._id);
    }

    editCafeButtonClick(e){
        router._goTo(`/editCafe/${this._id}`);
    }

    _headerAvatarListener(){
        router._goTo('/profile');
    }

    async _makeContext(id){
        this._id = id;
        const cafe = this._cafeListModel.getCafeById(id);
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
        cafeContext['add-staff-button'] = this.addStaffButtonClick.bind(this);

        cafeContext['cafe-page__cafe-info__edit-button'] = this.editCafeButtonClick.bind(this);

        return cafeContext;
    }

    async control(id){
        this._cafePageView.context = await this._makeContext(id);
        this._cafePageView.render();
    }


}

