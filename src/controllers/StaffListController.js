'use strict';

import {router} from '../main/main';
import {InputAlertWindowComponent} from '../components/InputAlertWindow/InputAlertWindow';
import ServerExceptionHandler from "../utils/ServerExceptionHandler";
import NotificationComponent from "../components/Notification/Notification";

/** контроллер списка работников */
export default class StaffListController{

    /**
     * Инициализация StaffListController
     * @param {StaffListModel} staffListModel модель списка работников
     * @param {UserModel} userModel модель пользователя
     * @param {StaffListView} staffListView view списка работников
     */
    constructor(staffListModel, staffListView) {
        this._staffListModel = staffListModel;
        this._staffListView = staffListView;
    }

    async update(){
        try {
            await this._staffListModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    /**
     * Создание контекста для StaffListView
     * @return {obj} созданный контекст
     */
    _makeViewContext(){

        let staffListContext = {
            staffList : this._staffListModel.context

            // await = this._staffListModel.context
        };

        staffListContext['header'] = {
            type: null,
            avatar: {
                //await this._userModel.photo,
                photo: null,
                event: {
                    type: 'click',
                    listener: () => {router._goTo('/profile');}
                }
            }
        };
        return staffListContext;
    }

    _addStaffQR(){
        (new InputAlertWindowComponent(this.staffListModel.addStaffQR, this.id)).render();
        // this.staffListModel.addStaffQR(this.id);
    }
    _redirectStaff(){
        router._goTo(`/staff/${this.id}`)
    }


    async _addListeners(){

        let addButtons = document.getElementsByClassName('cafe-staff-container__add-staff-container__button');
        for(let i = 0; i < addButtons.length; i++){
            const context = {
                staffListModel : this._staffListModel,
                id : addButtons.item(i).getAttribute('id').split('-')[1]
            };
            addButtons.item(i).addEventListener('click',this._addStaffQR.bind(context))
        }

        let staffCards = document.getElementsByClassName('staff-card-container');
        for(let i = 0; i < staffCards.length; i++){
            const context = {
                id : staffCards.item(i).getAttribute('id').split('-')[1]
            };
            staffCards.item(i).addEventListener('click',this._redirectStaff.bind(context))
        }

    }

    _makeExceptionContext(){
        return {
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            }
        }
    }

    /** Запуск контроллера */
    async control(){
        try {
            await this.update();
            this._staffListView.context = this._makeViewContext();
            this._staffListView.render();
            this._addListeners();
        } catch (error) {
            if(error.message !== 'unknown server error'){
                throw(new Error(error.message));
            }
        }
    }
}
