import {router} from '../main/main';
import ServerExceptionHandler from "../utils/ServerExceptionHandler";
import NotificationComponent from "../components/Notification/Notification";
import StatisticSerializer from '../Serializers/StatisticSerializer';

/** контроллер кафе */
export default class StaffPageController {

    constructor(staffListModel, userModel, staffPageView){
        this._staffListModel = staffListModel;
        this._userModel = userModel;
        this._staffPageView = staffPageView;
        this._statisticSerializer = new StatisticSerializer();
        this._id = null;
        this._lastAction = 0;
        this._options = {
            cafesList: [],
            staffList: [],
            onePlot: true
        };
        this._limit = 10;
    }

    async update(){
        try {
            await this._userModel.update();
            await this._staffListModel.update();
            console.log('after update', this._staffListModel._statistics)
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }


    async _makeViewContext(id){
        this._id = id;
        const staff = this._staffListModel.getStaffById(id);
        await this._staffListModel.getStat(id, this._limit, this._lastAction);
        let type = 'day';
        await this._staffListModel.getAllStaffPlot(this.getPrevDate(), this.getCurrentDate(),type);//todo date
        let staffContext = {
            'staff': staff,
        };
        this._options.cafesList.push(Number(staff._CafeId));
        this._options.staffList.push(Number(staff._StaffId));
        staffContext['header'] = {
            type: null,
            isOwner: this._userModel._isOwner,
            avatar: {
                photo: this._userModel.photo,
                event: {
                    type: 'click',
                    listener: () => {router._goTo('/profile')}
                }
            }
        };
        console.log('stat12321',this._staffListModel._statistics)
        let plotData = this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options);
        staffContext['statistics']= {
            plot: plotData
        };
        console.log('plotData!!!!', plotData)
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

        let nextActionsBtn = document.getElementsByClassName(
            'staff-actions-container__date__button-next').item(0);
        nextActionsBtn.addEventListener('click',this.addActions.bind(this));

        let prevActionsBtn = document.getElementsByClassName(
            'staff-actions-container__date__button-prev').item(0);
        let scrollDiv = document.getElementsByClassName('staff-actions-container__actions').item(0);
        prevActionsBtn.addEventListener('click',()=>{
            scrollDiv.scrollTop = 0;
        })
    }
    async addActions(){
        await this._staffListModel.getStat(this._id, this._limit, this._lastAction);
        this._lastAction += this._limit;
        this._staffPageView._addActions();
        let scrollDiv = document.getElementsByClassName('staff-actions-container__actions').item(0);
        scrollDiv.scrollBottom = 0;
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
            this._id = id;
            console.log('test staff', id)
            await this.update();
            console.log('test staff update done')
            this._staffPageView.context = await this._makeViewContext(id);
            console.log('test staff make view c done',this._staffPageView.context)
            this._staffPageView.render();
            //let plotData = this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options);
            this._staffPageView._renderPlot(this._staffPageView.context['statistics'].plot);
            this._addListeners(id);
        } catch (error) {
            if(error.message !== 'unknown server error'){
                throw(new Error(error.message));
            }
        }
    }
    getCurrentDate(){
        let date = new Date();
        let month = (date.getMonth()+1>9)?(date.getMonth()+1).toString():`0${date.getMonth()+1}`
        let day = (date.getDate()>9)?(date.getDate()).toString():`0${date.getDate()+1}`
        let res = `${date.getFullYear()}-${month}-${day}_00:00:00.000000`;
        console.log('res',res)
        return res
    }
    getPrevDate(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        if(day < 7){
            if(month < 1){
                day = 30 - day;
            } else{
                month--;
                day = 30 - day;
            }
        } else{
            day -= 7;
        }
        month = (month+1>9)?(month+1).toString():`0${month+1}`
        day = (day>9)?day.toString():`0${day}`
        let res = `${year}-${month}-${day}_00:00:00.000000`;
        console.log('res',res)
        return res
    }
}

