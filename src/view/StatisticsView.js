import Header from '../components/Header/Header';
import StatisticsComponent from '../components/StatisticsComponent/StatisticsComponent.js';
import StaffActionsComponent from '../components/StaffActions/StaffActions';
import BaseView from './BaseView';


export default class StatisticsView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render(context){
        this._app.innerHTML = '';
        (new Header(this._app)).render(context['header']);
        const element = document.createElement('div');
        (new StaffActionsComponent(element)).render();
        //(new StatisticsComponent(element)).render(context);
        this._app.appendChild(element);

    }

}
