'use strict';

import BaseView from './BaseView';
import {SurveyComponent} from '../components/SurveyComponent/SurveyComponent';


export default class SurveyView extends BaseView {

    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render(){
        console.log('render view', this.context)
        this._app.innerHTML = '';
        const surveyComponent = document.createElement('div');

        (new SurveyComponent(surveyComponent)).render(this.context);
        this._app.appendChild(surveyComponent);
    }
}
