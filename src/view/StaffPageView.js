import Header from '../components/Header/Header';
import {StaffPageComponent} from '../components/StaffPage/StaffPage';


import BaseView from './BaseView';
import StaffActionsComponent from '../components/StaffActions/StaffActions';


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
    render(){
        this._app.innerHTML = '';
        this._renderHeader();
        this._renderTemplate();
        this._renderActions();
    }

}
