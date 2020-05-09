import Header from '../components/Header/Header';
import StatisticsComponent from '../components/StatisticsComponent/StatisticsComponent.js';

import BaseView from './BaseView';


export default class StatisticsView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render(context){
        console.log('test view', context);
        this._app.innerHTML = '';
        (new Header(this._app)).render(context['header']);
        const element = document.createElement('div');
        (new StatisticsComponent(element)).render(context['statistics']);
        this._app.appendChild(element);

    }

}
