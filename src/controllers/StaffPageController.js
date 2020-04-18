import {router} from '../main/main';

/** контроллер кафе */
export default class StaffPageController {

    constructor(staffListModel, userModel, staffPageView){
        this._staffListModel = staffListModel;
        this._userModel = userModel;
        this._staffPageView = staffPageView;

        this._id = null;
    }


    async _makeViewContext(id){
        this._id = id;
        const staff = this._staffListModel.getStaffById(id);
        let staffContext = {
            'staff': staff
        };

        staffContext['header'] = {
            type: null,
            avatar: {
                photo: this._userModel.photo,
                event: {
                    type: 'click',
                    listener: () => {router._goTo('/profile')}
                }
            }
        };

        return staffContext;
    }

    fireStaff(){
        this.userModel.fireStaff(this.id);
    }

    async _addListeners(id){

        let fireButton = document.getElementsByClassName('staff-page__redactor__button-fire').item(0);
        const context = {
            userModel : this._userModel,
            id : id
        };
        fireButton.addEventListener('click',this.fireStaff.bind(context));

    }

    /** Запуск контроллера
     * @param {int} id идентификатор кафе
     */
    async control(id){
        this._staffPageView.context = await this._makeViewContext(id);
        this._staffPageView.render();
        this._addListeners(id);
    }
}

