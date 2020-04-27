import './InputAlertWindow.scss';
import './InputAlertWindow.color.scss';
import InputAlertWindow from './InputAlertWindow.hbs';

/** Компонент всплывающего окна */
export class InputAlertWindowComponent {

    /**
     * Инициализация компоненты всплывающего окна
     * @param {string} text текст окна
     * @param {string} cardLink сыылка на окне
     * @param {image} qrImage изображение на окне
     */
    constructor(callback, id) {
        this._el = document.getElementById('alert-field');
        this._callback = callback;
        this.cafeid = id;

    }

    /**
     * Отрисовка шаблона всплывающего окна
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML += InputAlertWindow();
        const background = document.getElementsByClassName('input-alert-window-container').item(0);

        //const window = document.getElementsByClassName('input-alert-window-container__window')
        const app = document.getElementById('application');
        app.style.opacity = '50%';
        background.addEventListener('click', (e)=>{
            if(e.target === background) {
                this._el.removeChild(background);
                app.style.opacity = '100%';
            }
        })

        const btn = document.getElementsByClassName('input-alert-window-container__window__field__button').item(0);
        //let input = this._el.getElementsByClassName('input-alert-window-container__window__field_input').item(0);

        btn.addEventListener('click',this._callback.bind(this))
    }

    /** Отрисовка всплывающего окна */
    render() {
        return this._renderTemplate();
    }
}
