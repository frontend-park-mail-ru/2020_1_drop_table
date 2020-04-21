import {router} from '../main/main';

/** контроллер кафе */
export default class StaffPageController {

    constructor(staffListModel, userModel, staffPageView){
        this._staffListModel = staffListModel;
        this._userModel = userModel;
        this._staffPageView = staffPageView;

        this._id = null;
    }

    async update(){
        await this._userModel.update();
        await this._staffListModel.update();
    }


    _makeViewContext(id){
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
    changeStaffPosition(){
        console.log('test change staff', this.input.value.toString())
        this.userModel.changeStaffPosition(this.id, this.input.value)
    }

    async _addListeners(id){

        let fireButton = document.getElementsByClassName('staff-page__redactor__button-fire').item(0);
        let positionInput = document.getElementsByClassName('staff-page__top__design__work__position').item(0);
        let context = {
            userModel : this._userModel,
            id : id
        };
        fireButton.addEventListener('click',this.fireStaff.bind(context));

        context = {
            userModel : this._userModel,
            id: id,
            input: positionInput,
        };
        positionInput.addEventListener('change', this.changeStaffPosition.bind(context))
    }

    /** Запуск контроллера
     * @param {int} id идентификатор кафе
     */
    async control(id){
        await this.update();
        this._staffPageView.context = this._makeViewContext(id);
        this._staffPageView.render();
        this._addListeners(id);
    }
}

