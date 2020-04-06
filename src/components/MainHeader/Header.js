import './Header.scss'

import headerTemplate from './Header.hbs';
import {Router} from "../../modules/Router";
import {router} from "../../main/main";

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
            {href: '/myCafes', text: 'Мои кафе'},
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
     * Добавление листенеров на элементы
     * @param {obj} context некоторый контекст с информацией о хэдере
     * @private
     */
    _addListeners(context){
        if (this._hasAvatar) {
            let avatar = this._head.getElementsByClassName('page-header__avatar').item(0);
            avatar.addEventListener(context['avatar']['event']['type'],
                context['avatar']['event']['listener']);
        }

        if (this._hasExit) {
            let exit = this._head.getElementsByClassName('page-header__h4').item(0);
            exit.addEventListener(context['exit']['event']['type'],
                context['exit']['event']['listener']);
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
            logoImageSrc: 'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
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
                let avatarElement = this._parent.getElementsByClassName('page-header__avatar_img').item(0);
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
        this._renderHeader(context);
        this._parent.appendChild(this._head);

        const hrefs = document.getElementsByClassName('page-header__nav__menu_list_a');
        console.log('hrefs', hrefs);
        console.log('menu', this._menuList);

        for(let i = 0 ; i < this._menuList.length;i++){
            hrefs.item(i).test = this._menuList[i].href;
            hrefs.item(i).addEventListener('click', this.redirect, false);
        }

        this._addListeners(context);

        this._renderAvatar(context);
    }
}


