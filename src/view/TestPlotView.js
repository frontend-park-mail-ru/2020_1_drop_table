'use strict';

import BaseView from './BaseView';
import LinePlot from '../components/LinePlot/LinePlot';


export default class TestPlotView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render(){
        this._app.innerHTML = '';
        const context = {
            array:[
                {
                    color:'#814ad0',
                    array: [
                        {x:'январь', y:1},
                        {x:'февраль', y:2},
                        {x:'март', y:5},
                        {x:'апрель', y:4},
                        {x:'май', y:6},
                        {x:'июнь', y:5},
                        {x:'июль', y:3}
                    ]
                },
                {
                    color:'#f260ff',
                    array: [
                        {x:'январь', y:3},
                        {x:'февраль', y:4},
                        {x:'март', y:3},
                        {x:'апрель', y:2.5},
                        {x:'май', y:3},
                        {x:'июнь', y:2.5},
                        {x:'июль', y:4}
                    ]
                },
            ]
        };
        let plot = new LinePlot();
        plot.render(context);
    }
}
