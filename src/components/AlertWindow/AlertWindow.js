import './AlertWindow.scss';
import './AlertWindow.color.scss';
import AlertWindow from './AlertWindow.hbs';

/** Компонент всплывающего окна */
export class AlertWindowComponent {

    /**
     * Инициализация компоненты всплывающего окна
     * @param {string} text текст окна
     * @param {string} cardLink сыылка на окне
     * @param {image} qrImage изображение на окне
     */
    constructor(text ,cardLink, qrImage) {
        this._el = document.getElementById('alert-field');
        this._text = text;
        this._qrImage = qrImage;
        this._cardLink = cardLink;
    }

    /**
     * Отрисовка шаблона всплывающего окна
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML += AlertWindow({text: this._text , cardLink: this._cardLink ,qrImage: this._qrImage});
        const background = document.getElementsByClassName('apple-card-published-qr-container').item(0);
        const app = document.getElementById('application');
        app.style.opacity = '50%';
        this._el.addEventListener('click', (e)=>{
            if(e.target === background) {
                this._el.removeChild(background);
                this._el.innerHTML = '';
                app.style.opacity = '100%';
            }
        })
    }

    /** Отрисовка всплывающего окна */
    render() {
        return this._renderTemplate();
    }
}
