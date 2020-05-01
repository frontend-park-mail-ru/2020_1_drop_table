import {router} from '../main/main';
import ServerExceptionHandler from "../utils/ServerExceptionHandler";
import NotificationComponent from "../components/Notification/Notification";

/** контроллер кафе */
export default class StaffPageController {

    constructor(staffListModel, userModel, staffPageView){
        this._staffListModel = staffListModel;
        this._userModel = userModel;
        this._staffPageView = staffPageView;

        this._id = null;
    }

    async update(){
        try {
            await this._userModel.update();
            await this._staffListModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
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

    _makeExceptionContext(){
        return {
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            }
        }
    }

    /** Запуск контроллера
     * @param {int} id идентификатор кафе
     */
    async control(id){
        try {
            await this.update();
            this._staffPageView.context = this._makeViewContext(id);
            this._staffPageView.render();
            this._addListeners(id);
        } catch (error) {
            if(error.message !== 'unknown server error'){
                throw(new Error(error.message));
            }
        }
    }
}

