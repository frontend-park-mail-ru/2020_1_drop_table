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
            await this._staffListModel.getAllStaffPlot();
        } catch (exception) {

        }
    }

    _makeMultiSelectsContext(){
        let cafes = [];
        let staff = [];
        let res = {
            cafes:[],
            staff:[]
        };
        console.log('test212321', this._staffListModel._staffModelsList)
        for(let i = 0; i < this._staffListModel._staffModelsList.length; i++){
            let staffModel = this._staffListModel._staffModelsList[i];
            if(!staff.includes(staffModel._StaffName)){
                staff.push(staffModel._StaffName);
                res.staff.push({label:staffModel._StaffName, value: staffModel._StaffName });
            }
            if(!cafes.includes(staffModel._CafeName)){
                cafes.push(staffModel._CafeName);
                res.cafes.push({label:staffModel._CafeName, value: staffModel._CafeName });
            }
        }
        return res;
    }
    _makeViewContext(){
        let context = {};
        //todo Хедер в зависимости от того зареган ли юзер
        context['header'] = {
            type: null,
        };
        let msData = this._makeMultiSelectsContext();
        context['statistics']= {
            multiselects:{
                cafes:{
                    data:msData.cafes,
                    options:{
                        title:'Кафе'
                    },
                    listener: (data)=>{
                        this._options.cafesList = data;
                        this._statisticsView._renderPlot(
                            this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options)
                        );
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
                            this._statisticsView._renderPlot(
                                this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options)
                            );
                        }
                    }
            },
            plot: this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options)
        };

        return context;
    }
    _addListeners(){
        let onePlotCheckbox = document.getElementsByClassName('container-checkbox_input').item(0);
        onePlotCheckbox.addEventListener('change',()=>{

            this._options.onePlot = !this._options.onePlot;
            this._statisticsView._renderPlot(
                this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options)
            );
        })
    }


    /** Запуск контроллера */
    async control(){
        await this.update();
        let context = this._makeViewContext();
        this._statisticsView.render(context);
        this._addListeners();
    }
}
