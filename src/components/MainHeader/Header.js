import './Header.css'

import headerTemplate from './Header.hbs';
import {ajax} from '../../utils/ajax';
import {constants} from "../../utils/constants";
import {Router} from "../../modules/Router";

export default class Header{

    constructor(parent = document.body) {
        this._parent = parent;
        this._avatar = 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg';
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

            ajax(constants.PATH+'/api/v1/getCurrentOwner/',
                'GET',
                {},
                this._ajaxCallback
            );
        }
    }

    _ajaxCallback(response){
        if (response.errors === null) {
            this._avatar = response.data['photo'];
            console.log('avatar ', this._avatar);
            let ava = this._head.getElementsByClassName('page-header__avatar_img').item(0);
            ava.setAttribute('src', this._avatar); //TODO поменять на promise
        } else {
            alert(response.errors[0].message); //TODO showError
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


