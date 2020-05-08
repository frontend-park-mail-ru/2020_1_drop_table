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
    //     context['graph'] = `<svg version="1.2" xmlns="http://www.w3.org/2000/svg"
    //     xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
    //     <title id="title">A line chart showing some information</title>
    //     <g class="grid x-grid" id="xGrid">
    //         <line x1="0" x2="0" y1="0" y2="100vw"></line>
    //     </g>
    //     <g class="grid y-grid" id="yGrid">
    //         <line x1="0" x2="100vw" y1="0" y2="0"></line>
    //     </g>
    //     <g class="labels x-labels">
    //         <text x="100" y="400">2008</text>
    //         <text x="246" y="400">2009</text>
    //         <text x="392" y="400">2010</text>
    //         <text x="538" y="400">2011</text>
    //         <text x="684" y="400">2012</text>
    //         <text x="400" y="440" class="label-title">Year</text>
    //     </g>
    //     <g class="labels y-labels">
    //         <text x="80" y="15">15</text>
    //         <text x="80" y="131">10</text>
    //         <text x="80" y="248">5</text>
    //         <text x="80" y="373">0</text>
    //         <text x="50" y="200" class="label-title">Price</text>
    //     </g>
    //     <g class="data" data-setname="Our first data set">
    //         <circle cx="10vw" cy="10vw" data-value="7.2" r="4"></circle>
    //         <circle cx="20vw" cy="50vw" data-value="8.1" r="4"></circle>
    //         <circle cx="30vw" cy="30vw" data-value="7.7" r="4"></circle>
    //         <circle cx="60vw" cy="50vw" data-value="6.8" r="4"></circle>
    //         <circle cx="80vw" cy="80vw" data-value="6.7" r="4"></circle>
    //          <circle cx="20vw" cy="95vw" data-value="6.7" r="4"></circle>
    //     </g>
    // </svg>`
        return context;
    }



    /** Запуск контроллера */
    async control(){

        let context = this._makeViewContext();
        console.log('1', context)
        this._statisticsView.render(context);
    }
}
