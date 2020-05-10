'use strict';


import StatisticSerializer from '../Serializers/StatisticSerializer';

export default class StatisticsController{


    constructor(statisticsView, statisticsModel) {
        this._statisticsView = statisticsView;
        this._statisticsModel = statisticsModel;
        this._statisticSerializer = new StatisticSerializer();
        this._options = {
            cafesList: ['cafe1','cafe2','cafe3'],
            staffList: ['staff1','staff2','staff3','staff4'],
            onePlot: true
        }
        this._data = {
            'cafe1':{
                'staff1':[
                    {'01.01':1},
                    {'02.01':2},
                    {'03.01':2},
                ],
                'staff2':[
                    {'01.01':2},
                    {'02.01':3},
                    {'03.01':3},
                ],
            },
            'cafe2':{
                'staff1':[
                    {'01.01':1},
                    {'02.01':2},
                    {'03.01':2},
                ],
                'staff3':[
                    {'01.01':4},
                    {'02.01':2},
                    {'03.01':1},
                ],
            },
            'cafe3':{
                'staff1':[
                    {'01.01':2},
                    {'02.01':2},
                    {'03.01':2},
                ],
                'staff3':[
                    {'01.01':2},
                    {'02.01':2},
                    {'03.01':4},
                ],
            },
        }
    }

    _makeViewContext(){
        let context = {};
        //todo Хедер в зависимости от того зареган ли юзер
        context['header'] = {
            type: null,
        };

        context['statistics']= {
            multiselects:{
                cafes:{
                    data:[
                        {label: 'cafe1', value: 'cafe1'},
                        {label: 'cafe2', value: 'cafe2'},
                        {label: 'cafe3', value: 'cafe3'},
                    ],
                    options:{
                        title:'Кафе'
                    },
                    listener: (data)=>{
                        this._options.cafesList = data;
                        this._statisticsView._renderPlot(
                            this._statisticSerializer.serializeLinePlotData(this._data, this._options)
                        );
                    }
                },
                staff:
                    {
                        data:[
                            {label: 'staff1', value: 'staff1'},
                            {label: 'staff2', value: 'staff2'},
                            {label: 'staff3', value: 'staff3'},
                            {label: 'staff4', value: 'staff4'},
                            {label: 'staff5', value: 'staff5'},
                            {label: 'staff5', value: 'staff6'},
                        ],
                        options:{
                            title:'Работники'
                        },
                        listener: (data)=>{
                            console.log('data',data)
                            this._options.staffList = data;
                            this._statisticsView._renderPlot(
                                this._statisticSerializer.serializeLinePlotData(this._data, this._options)
                            );
                        }
                    }
            },
            plot: this._statisticSerializer.serializeLinePlotData(this._data, this._options)
        };

        return context;
    }
    _addListeners(){
        let onePlotCheckbox = document.getElementsByClassName('container-checkbox_input').item(0);
        onePlotCheckbox.addEventListener('change',()=>{
            console.log('change')
            this._options.onePlot = !this._options.onePlot;
            this._statisticsView._renderPlot(
                this._statisticSerializer.serializeLinePlotData(this._data, this._options)
            );
        })
    }


    /** Запуск контроллера */
    async control(){

        let context = this._makeViewContext();
        console.log('test cont', context);
        this._statisticsView.render(context);
        this._addListeners();
    }
}
