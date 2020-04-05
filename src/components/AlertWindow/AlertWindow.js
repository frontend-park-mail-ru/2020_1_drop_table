import './AlertWindow.css';
import AlertWindow from './AlertWindow.hbs';

export class AlertWindowComponent {
    constructor(text ,cardLink, qrImage) {
        this._el = document.getElementById('alert-field');
        this._text = text;
        this._qrImage = qrImage;
        this._cardLink = cardLink;
    }

    _renderTemplate() {
        this._el.innerHTML += AlertWindow({text: this._text , cardLink: this._cardLink ,qrImage: this._qrImage});
        const background = document.getElementsByClassName('apple-card-published-qr-container').item(0);
        const app = document.getElementById('application');
        app.style.opacity = '50%';
        background.addEventListener('click', (e)=>{
            if(e.target === background) {
                this._el.removeChild(background);
                app.style.opacity = '100%';
            }
        })
    }

    render() {
        return this._renderTemplate();
    }
}
