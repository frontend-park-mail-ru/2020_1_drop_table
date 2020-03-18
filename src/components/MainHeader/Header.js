import './Header.css'

import headerTemplate from './Header.hbs';
import {Router} from "../../modules/Router";
import UserModel from "../../models/UserModel";

export default class Header{

    constructor(parent = document.body) {
        this._parent = parent;
        this._userModel = new UserModel();

        this._avatar = ( this._userModel.photo !== '')
            ?  this._userModel.photo : 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg';
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

    _setProperties(page){
        if (page === 'auth') {
            this._hasAvatar = false;
            this._hasExit = false;
            this._menuList =[];

        } else if (page === 'profile') {
            this._hasAvatar = false;
            this._hasExit = true;

        } else {
            this._head = document.createElement('div');
            this._hasAvatar = true;
            this._hasExit = false;
        }
    }

    _renderHeader(){
        const headerData = {
            hasAvatar: this._hasAvatar,
            hasExit: this._hasExit,
            logoImageSrc: 'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
            menuList: this._menuList,
            avatarImageSrc: this._avatar
        };

        this._head.innerHTML = headerTemplate(headerData);

        if (this._hasAvatar) {
            let avatar = this._head.getElementsByClassName('page-header__avatar').item(0);
            avatar.addEventListener('click', function () {
                Router.redirect('/Profile');
            });
        }

        if (this._hasExit) {
            let avatar = this._head.getElementsByClassName('page-header__h4').item(0);
            avatar.addEventListener('click', function () {
                alert('exit');
            });
        }
    }

    render(page){
        this._head = document.createElement('div');
        this._head.className = 'header';
        this._setProperties(page);
        this._renderHeader();
        this._parent.appendChild(this._head);
    }
}


