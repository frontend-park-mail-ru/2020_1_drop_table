import Header from '../components/Header/Header';
import {StaffPageComponent} from '../components/StaffPage/StaffPage';


import BaseView from './BaseView';


export default class StaffPageView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
        console.log('view constructor')
    }

    render(){
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        const profileElement = document.createElement('div');
        (new StaffPageComponent(profileElement)).render(this._context['staff']);
        this._app.appendChild(profileElement);

    }

}
