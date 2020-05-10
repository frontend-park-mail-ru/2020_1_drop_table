import Header from '../components/Header/Header';
import {StaffPageComponent} from '../components/StaffPage/StaffPage';


import BaseView from './BaseView';
import StaffActionsComponent from '../components/StaffActions/StaffActions';
import LinePlot from '../components/LinePlot/LinePlot';


export default class StaffPageView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    _renderHeader(){
        (new Header(this._app)).render(this._context['header']);
    }
    _renderTemplate(){
        const element = document.createElement('div');
        (new StaffPageComponent(element)).render(this._context['staff']);
        this._app.appendChild(element);
    }
    _renderActions(){
        let actions = this._app.getElementsByClassName('staff-page__recent-actions__actions-container').item(0);
        (new StaffActionsComponent(actions)).render();
    }
    _renderPlot(){
        let container = this._app.getElementsByClassName('staff-page__statistics-container__graph-container').item(0);
        const context = {
            textX: 'Время',
            textY: 'Прибыль',
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
        (new LinePlot(container)).render(context);
    }
    render(){
        this._app.innerHTML = '';
        this._renderHeader();
        this._renderTemplate();
        this._renderActions();
        this._renderPlot();
    }

}
