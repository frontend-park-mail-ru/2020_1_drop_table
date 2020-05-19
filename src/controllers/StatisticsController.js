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
            cafesList: [],
            staffList: [],
            onePlot: false
        };

    }
    async update(){
        try {
            await this._staffListModel.update();
            let startDate = this.getPrevDate(false);
            let endDate = this.getCurrentDate(false);
            let type = 'day';
            await this._staffListModel.getAllStaffPlot(startDate, endDate, type);

            console.log('date... after', this._staffListModel._statistics)
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
                res.staff.push({label:staffModel._StaffName, value: staffModel._StaffId  });
                this._options.staffList.push(staffModel._StaffId );
            }
            if(!cafes.includes(staffModel._CafeName)){
                cafes.push(staffModel._CafeName);
                res.cafes.push({label:staffModel._CafeName, value: staffModel._CafeId });
                this._options.cafesList.push(staffModel._CafeId)
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
        console.log('test statistics', this._staffListModel._statistics)
        console.log('test statistics opt', this._options)
        let plotData = this._statisticSerializer.serializeLinePlotData(this._staffListModel._statistics, this._options);
        //this._statisticsView._renderPlot(plotData);
        console.log('test statistics AFTER SERIALIZE', this._staffListModel._statistics)
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
        // let onePlotCheckbox = document.getElementsByClassName('container-checkbox_input').item(0);
        // onePlotCheckbox.addEventListener('change',()=>{
        //     this._options.onePlot = !this._options.onePlot;
        //     let plotData = this._statisticSerializer.serializeLinePlotData(
        //         this._staffListModel._statistics, this._options);
        //     this._statisticsView._renderPlot(
        //         plotData
        //     );
        // })

        let startContainer = document.getElementsByClassName('statistics-component__head__interval-start').item(0)
        let startInput = startContainer.getElementsByClassName('date-input_input').item(0);
        let endContainer = document.getElementsByClassName('statistics-component__head__interval-end').item(0)
        let endInput = endContainer.getElementsByClassName('date-input_input').item(0);


        startInput.value = this.getPrevDate(true);
        endInput.value = this.getCurrentDate(true);

        startInput.addEventListener('change',async (e)=>{
            console.log('inputik start',this.getDateFromInput(startInput.value));
            let type = 'day';
            let startDate = this.getDateFromInput(startInput.value);
            let endDate = this.getDateFromInput(endInput.value);
            await this._staffListModel.getAllStaffPlot(startDate, endDate, type);
            this.updatePlot();
        })

        endInput.addEventListener('change',async (e)=>{
            console.log('inputik end', this.getDateFromInput(endInput.value));
            let type = 'day';
            let startDate = this.getDateFromInput(startInput.value);
            let endDate = this.getDateFromInput(endInput.value);
            await this._staffListModel.getAllStaffPlot(startDate, endDate, type);
            this.updatePlot();
        })
    }



    updatePlot(){
        let plotData = this._statisticSerializer.serializeLinePlotData(
            this._staffListModel._statistics, this._options);
        this._statisticsView._renderPlot(plotData);
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


    getCurrentDate(inputFormat){
        let date = new Date();
        let month = (date.getMonth() + 1 > 9) ? (date.getMonth() + 1).toString() : `0${date.getMonth() + 1}`
        let day = (date.getDate() > 9) ? (date.getDate()).toString() : `0${date.getDate() + 1}`
        if(!inputFormat) {
            let res = `${date.getFullYear()}-${month}-${day}_00:00:00.000000`;
            console.log('res', res)
            return res
        }
        return `${month} / ${day} / ${date.getFullYear()}`

    }
    getPrevDate(inputFormat){
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
        day = (day>9)?day.toString():`0${day}`;
        if(!inputFormat){
            let res = `${year}-${month}-${day}_00:00:00.000000`;
            return res
        }
        return `${month} / ${day} / ${date.getFullYear()}`


    }

    getDateFromInput(date){
        let arr = date.split('/');
        console.log('input arr', arr, arr.length)
        let curdate = new Date();
        let year = curdate.getFullYear();
        if(arr.length === 3 &&  Number(arr[2])<=Number(year)){
            return `${Number(arr[0])}-${Number(arr[1])}-${Number(arr[2])}_00:00:00.000000`;
        }
        return this.getCurrentDate(false)//todo  не соображаю но ограничение есть
    }
}
