import Header from '../components/Header/Header';
import {CafePreviewComponent} from '../components/CafePreview/CafePreview';


import BaseView from './BaseView';

/** view страницы кафе */
export default class CafePreView extends BaseView {

    /**
     * Инициализация CafePageView
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        super(app);
    }


    /** Отрисовка страницы с кафе */
    render(){
        console.log('render preview')
        this._app.innerHTML = '';
        (new Header(this._app)).render(this._context['header']);
        const profileElement = document.createElement('div');
        (new CafePreviewComponent(profileElement)).render(this._context['cafe']);
        this._app.appendChild(profileElement);

    }

}
