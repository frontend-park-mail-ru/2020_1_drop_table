'use strict';

import BaseView from './BaseView';
import LinePlot from '../components/LinePlot/LinePlot';
import CirclePlot from '../components/CirclePlot/CirclePlot';


export default class TestPlotView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render(){
        this._app.innerHTML = '';
        const context = {
            textX: 'Время',
            textY: 'Прибыль',
            array:[
                {
                    color:'#814ad0',
                    name:'Brrew',
                    array: [
                        {x:'январь', y:1},
                        {x:'февраль', y:2},
                        {x:'март', y:5},
                        {x:'апрель', y:4},
                        {x:'май', y:6},
                        {x:'июнь', y:5},
                        {x:'июль', y:3},
                        {x:'март', y:5},
                        {x:'апрель', y:4},
                        {x:'май', y:6},
                        {x:'июнь', y:5},
                        {x:'июль', y:3}
                    ]
                },
                {
                    color:'#f260ff',
                    name: 'Coffix',
                    array: [
                        {x:'январь', y:3},
                        {x:'февраль', y:4},
                        {x:'март', y:3},
                        {x:'апрель', y:2.5},
                        {x:'май', y:3},
                        {x:'июнь', y:2.5},
                        {x:'июль', y:4},
                        {x:'март', y:3},
                        {x:'апрель', y:2.5},
                        {x:'май', y:3},
                        {x:'июнь', y:2.5},
                        {x:'июль', y:4},
                    ]
                },
            ]
        };
        let plot = new LinePlot();
        // let context = [
        //     {percent:0.3,color:'#ff0000'},
        //     {percent:0.3,color:'#ffe400'},
        //     {percent:0.4,color:'#95ff00'},
        // ];
        // let plot = new CirclePlot();
        plot.render(context);
    }
}
