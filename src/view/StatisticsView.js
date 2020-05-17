import Header from '../components/Header/Header';
import StatisticsComponent from '../components/StatisticsComponent/StatisticsComponent.js';

import BaseView from './BaseView';
import LinePlot from '../components/LinePlot/LinePlot';


export default class StatisticsView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    _renderPlot(context){
        console.log('render plot 11', this._app)
        let container = this._app.getElementsByClassName(
            'statistics-component__graph-container__with-scroll').item(0);
        (new LinePlot(container)).render(context);
        console.log('render plot 2')
    }

    render(context){
        this._app.innerHTML = '';
        (new Header(this._app)).render(context['header']);
        const element = document.createElement('div');
        console.log('add stat to', element, context);
        (new StatisticsComponent(element)).render(context['statistics']);
        console.log('add stat to', element)
        this._app.appendChild(element);

        //this._renderPlot(context['statistics'].plot)
    }

}
