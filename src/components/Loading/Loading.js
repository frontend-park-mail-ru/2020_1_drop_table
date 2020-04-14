import './Loading.scss';
import Loading from './Loading.hbs';

/** Компонент всплывающего окна */
export class LoadingComponent {

    /**
     * Инициализация компоненты всплывающего окна
     * @param {string} text текст окна
     * @param {string} cardLink сыылка на окне
     * @param {image} qrImage изображение на окне
     */
    constructor() {
        this._el = document.getElementById('alert-field');
        this._app = document.getElementById('application');
    }

    /**
     * Отрисовка шаблона всплывающего окна
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML += Loading();
        this._app.style.opacity = '50%';
    }
    remove(){
        this._el.innerHTML = '';
        this._app.style.opacity = '100%';
    }

    /** Отрисовка всплывающего окна */
    render() {
        return this._renderTemplate();
    }
}
