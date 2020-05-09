'use strict';


export default class StatisticsController{


    constructor(statisticsView, statisticsModel) {
        this._statisticsView = statisticsView;
        this._statisticsModel = statisticsModel;
    }

    _makeViewContext(){
        let context = {};
        //todo Хедер в зависимости от того зареган ли юзер
        context['header'] = {
            type: null,
        };

        context['statistics']= {
            multiselects:{
                staff:{
                    data:[
                        {label: 'Кафе1', value: '1'},
                        {label: 'Кафе2', value: '2'},
                        {label: 'Кафе3', value: '3'},
                    ],
                    options:{
                        title:'Выбор кафе'
                    }
                },
                cafes:
                    {
                        data:[
                            {label: 'Работник1', value: '1'},
                            {label: 'Работник2', value: '2'},
                            {label: 'Работник3', value: '3'},
                            {label: 'Работник4', value: '4'},
                            {label: 'Работник5', value: '5'},
                            {label: 'Работник6', value: '6'},
                        ],
                        options:{
                            title:'Выбор работника'
                        }
                    }
            },
            stat:{},
        }

        return context;
    }



    /** Запуск контроллера */
    async control(){

        let context = this._makeViewContext();
        console.log('test cont', context);
        this._statisticsView.render(context);
    }
}
