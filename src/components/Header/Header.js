import './Header.scss'
import './Header.color.scss'
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
        this._hasLogin = false;

        this._menuList = [
            {href: '/myCafes', text: 'Мои заведения'},
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
        if(!context['isOwner']){
            this._menuList = []
        }
        if (context['type'] === 'auth') {
            this._hasAvatar = false;
            this._hasExit = false;
            this._hasLogin = false;
            this._menuList = [];

        } else if (context['type'] === 'landing'){
            this._hasAvatar = false;
            this._hasExit = false;
            this._hasLogin = true;
            this._menuList = [];

        } else if (context['type'] === 'profile') {
            this._hasAvatar = false;
            this._hasExit = true;
            this._hasLogin = false;

        } else {
            this._head = document.createElement('div');
            this._hasAvatar = true;
            this._hasLogin = false;
            this._hasExit = false;
        }
    }



    /**
     * Отрисовка хэдера
     * @param {obj} context некоторый контекст с информацией о хэдере
     * @private
     */
    _renderHeader(context){
        const headerData = {
            hasAvatar: this._hasAvatar,
            hasExit: this._hasExit,
            hasLogin: this._hasLogin,
            logoImageSrc: '/images/logo-light.png',
            menuList: this._menuList,
            avatarImageSrc: this._avatar
        };
        this._head.innerHTML = headerTemplate(headerData);

        const img = this._head.getElementsByClassName('nav-header_img').item(0);
        const theme = localStorage.getItem('theme');
        if(theme === 'theme-dark'){
            img.src = '/images/logo-dark.png';
        } else{
            img.src = '/images/logo-light.png';
        }

        this._parent.appendChild(this._head);

        if(this._hasExit) {
            let out = document.getElementById('exit-btn');
            out.addEventListener(context['exit']['event']['type'],
                context['exit']['event']['listener']);
        }

    }


    /**
     * Отрисовка хэдера
     * @param {obj} context некоторый контекст с информацией о хэдере
     */
    render(context){
        this._head = document.createElement('div');
        this._head.className = 'header';
        this._setProperties(context);
        this._renderHeader(context);
    }
}


