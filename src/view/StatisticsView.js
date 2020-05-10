import Header from '../components/Header/Header';
import StatisticsComponent from '../components/StatisticsComponent/StatisticsComponent.js';

import BaseView from './BaseView';
import LinePlot from '../components/LinePlot/LinePlot';


export default class StatisticsView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    _renderPlot(context){
        let container = this._app.getElementsByClassName(
            'statistics-component__graph-container__with-scroll').item(0);
        (new LinePlot(container)).render(context);
    }

    render(context){
        this._app.innerHTML = '';
        (new Header(this._app)).render(context['header']);
        const element = document.createElement('div');
        (new StatisticsComponent(element)).render(context['statistics']);
        this._app.appendChild(element);
        this._renderPlot(context['statistics'].plot)
    }

}
