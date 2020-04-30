import './Notification.scss';

import Notification from './Notification.hbs';

/** Компонент уведомления */
export default class NotificationComponent {

    constructor(text, description) {
        this._el = document.getElementById('alert-field');
        this._text = text;
        this._description = description
    }

    _addListeners(){
        let notification= document.getElementsByClassName('notification').item(0);
        let notificationField = document.getElementById('alert-field');
        notification.addEventListener('click', function(event) {

            let isClickInside = notification.contains(event.target);
            if (isClickInside) {
                notification.style.right = '-100%';
                notificationField.innerHTML = ' ';

            }
        });
    }

    /**
     * Отрисовка шаблона всплывающего окна
     * @private
     */
    _renderTemplate() {
        this._el.innerHTML = Notification({text: this._text, description: this._description});
    }

    remove(){
        let notification= document.getElementsByClassName('notification').item(0);
        notification.style.right = '-100%';

        setTimeout(()=> {
            let notificationField = document.getElementById('alert-field');
            notificationField.innerHTML = ' ';
        }, 1000);
    }

    /** Отрисовка всплывающего окна */
    render() {
        this._renderTemplate();
        this._addListeners();
    }
}
