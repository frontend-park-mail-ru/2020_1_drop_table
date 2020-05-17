'use strict';


import StatisticSerializer from '../Serializers/StatisticSerializer';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';

export default class StatisticsController{


    constructor(statisticsView, statisticsModel, staffListModel) {
        this._statisticsView = statisticsView;
        this._statisticsModel = statisticsModel;
        this._staffListModel = staffListModel;
        this._statisticSerializer = new StatisticSerializer();
        this._options = {
            cafesList: ['cafe1','cafe2','cafe3'],
            staffList: ['staff1','staff2','staff3','staff4'],
            onePlot: false
        };


        // this._data = {
        //     'cafe1':{
        //         'staff1':[
        //             {'01.01':1},
        //             {'02.01':2},
        //             {'03.01':2},
        //             {'04.01':1},
        //             {'05.01':2},
        //             {'06.01':2},
        //
        //         ],
        //         'staff2':[
        //             {'01.01':2},
        //             {'02.01':3},
        //             {'03.01':2},
        //             {'04.01':4},
        //             {'05.01':2},
        //             {'06.01':2},
        //         ],
        //     },
        //     'cafe2':{
        //         'staff1':[
        //             {'01.01':1},
        //             {'02.01':2},
        //             {'03.01':3},
        //             {'04.01':1},
        //             {'05.01':5},
        //             {'06.01':2},
        //         ],
        //         'staff3':[
        //             {'01.01':4},
        //             {'02.01':2},
        //             {'03.01':1},
        //             {'04.01':1},
        //             {'05.01':2},
        //             {'06.01':2},
        //         ],
        //     },
        //     'cafe3':{
        //         'staff1':[
        //             {'01.01':2},
        //             {'02.01':1},
        //             {'03.01':1},
        //             {'04.01':3},
        //             {'05.01':2},
        //             {'06.01':2},
        //         ],
        //         'staff3':[
        //             {'01.01':1},
        //             {'02.01':1},
        //             {'03.01':2},
        //             {'04.01':1},
        //             {'05.01':2},
        //             {'06.01':2},
        //         ],
        //     },
        // }
    }
    async update(){
        try {
            await this._staffListModel.update();
            let startDate = this.getPrevDate();
            let endDate = this.getCurrentDate();
            console.log('date...', startDate, endDate);
            await this._staffListModel.getAllStaffPlot(startDate, endDate);
            console.log('date... after', )
        } catch (exception) {
            console.log('ex', exception)
        }
    }

    _makeMultiSelectsContext(){
        let cafes = [];
        let staff = [];
        let res = {
            cafes:[],
            staff:[]
        };
        for(let i = 0; i < this._staffListModel._staffModelsList.length; i++){
            let staffModel = this._staffListModel._staffModelsList[i];
            if(!staff.includes(staffModel._StaffName)){
                staff.push(staffModel._StaffName);
                res.staff.push({label:staffModel._StaffName, value: staffModel._StaffName });
            }
            if(!cafes.includes(staffModel._CafeName)){
                cafes.push(staffModel._CafeName);
                res.cafes.push({label:staffModel._CafeName, value: staffModel._CafeId });
            }
        }
        return res;
    }
    _makeViewContext(){
        let context = {};
        //todo Хедер в зависимости от того зареган ли юзер
        context['header'] = {
            type: null,
            isOwner: true,
        };
        let msData = this._makeMultiSelectsContext();
        let plotData = this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options);
        //this._statisticsView._renderPlot(plotData);
        context['statistics']= {
            multiselects:{
                cafes:{
                    data:msData.cafes,
                    options:{
                        title:'Кафе'
                    },
                    listener: (data)=>{
                        this._options.cafesList = data;
                        let plotData = this._statisticSerializer.serializeLinePlotData(
                            this._staffListModel._statistics, this._options);
                        this._statisticsView._renderPlot(plotData);
                    }
                },
                staff:
                    {
                        data:msData.staff,
                        options:{
                            title:'Работники'
                        },
                        listener: (data)=>{
                            this._options.staffList = data;
                            let plotData = this._statisticSerializer.serializeLinePlotData(
                                this._staffListModel._statistics, this._options);
                            this._statisticsView._renderPlot(plotData);
                        }
                    }
            },
            plot: plotData
        };

        return context;
    }
    _addListeners(){
        let onePlotCheckbox = document.getElementsByClassName('container-checkbox_input').item(0);
        onePlotCheckbox.addEventListener('change',()=>{
            this._options.onePlot = !this._options.onePlot;
            let plotData = this._statisticSerializer.serializeLinePlotData(
                this._staffListModel._statistics, this._options);
            this._statisticsView._renderPlot(
                plotData
            );
        })
    }


    /** Запуск контроллера */
    async control(){
        console.log('in control')
        await this.update();
        let context =  await this._makeViewContext();
        this._statisticsView.render(context);
        this._statisticsView._renderPlot(context['statistics'].plot);
        this._addListeners();
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
