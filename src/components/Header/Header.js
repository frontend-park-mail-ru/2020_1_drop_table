import './Header.scss'

import headerTemplate from './Header.hbs';

/** Компонента хэдера */
export default class Header{

    /**
     * Инициализация компоненты хэдера
     * @param {Element} parent элемент в котором будет располагаться компонента хэдера
     */
    constructor(parent = document.getElementById('application')) {
        this._parent = parent;

        this._avatar = '/images/userpic.png';
        this._head = null;

        this._logo = null;
        this._hasAvatar = false;
        this._hasExit = false;

        this._menuList = [
            {href: '/myCafes', text: 'Мои заведения'},
            {href: '/createCafe', text: 'Добавить'},
            {href: '/statistics', text: 'Статистика'},
            {href: '/staff', text: 'Работники'},
        ];

    }

    /**
     * Установка свойств хэдера
     * @param {obj} context некоторый контекст с информацией о хэдере
     * @private
     */
    _setProperties(context){
        if (context['type'] === 'auth') {
            this._hasAvatar = false;
            this._hasExit = false;
            this._menuList =[];

        } else if (context['type'] === 'profile') {
            this._hasAvatar = false;
            this._hasExit = true;

        } else {
            this._head = document.createElement('div');
            this._hasAvatar = true;
            this._hasExit = false;
        }
    }



    /**
     * Отрисовка хэдера
     * @param {obj} context некоторый контекст с информацией о хэдере
     * @private
     */
    _renderHeader(){
        const headerData = {
            hasAvatar: this._hasAvatar,
            hasExit: this._hasExit,
            logoImageSrc: '/images/logo.png',
            menuList: this._menuList,
            avatarImageSrc: this._avatar
        };
        this._head.innerHTML = headerTemplate(headerData);

    }

    /**
     * Отрисовка аватарки
     * @param {obj} context некоторый контекст с информацией о хэдере
     * @private
     */
    _renderAvatar(context){
        if(this._hasAvatar && context['avatar']['photo']){
            context['avatar']['photo'].then((photo) => {
                let avatarElement = this._parent.getElementsByClassName('nav-links__link-container_img').item(0);
                if(photo) {
                    avatarElement.src = photo;
                }
            }, (exception) => {
                alert(exception[0].message); //TODO сделать обработку ошибки
            });
        }
    }

    redirect(e){
        console.log('eee',e.test);
        //router._goTo(e.route);
    }

    /**
     * Отрисовка хэдера
     * @param {obj} context некоторый контекст с информацией о хэдере
     */
    render(context){
        this._head = document.createElement('div');
        this._head.className = 'header';

        this._setProperties(context);
        this._renderHeader();

        this._parent.appendChild(this._head);

        this._renderAvatar(context);
    }
}


