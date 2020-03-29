import './Header.css'

import headerTemplate from './Header.hbs';

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

    _renderHeader(context){
        // this._avatar = ( context['avatar']['photo'] !== '')
        //     ?  context['avatar']['photo'] : 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg';

        const headerData = {
            hasAvatar: this._hasAvatar,
            hasExit: this._hasExit,
            logoImageSrc: 'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
            menuList: this._menuList,
            avatarImageSrc: this._avatar
        };

        this._head.innerHTML = headerTemplate(headerData);
    }

    _renderAvatar(context){
        if(this._hasAvatar && context['avatar']['photo']){
            context['avatar']['photo'].then((photo) => {
                let avatarElement = this._parent.getElementsByClassName('page-header__avatar_img').item(0);
                avatarElement.src = photo;
            }, (exception) => {
                alert(exception); //TODO сделать обработку ошибки
            });
        }
    }

    render(context){
        this._head = document.createElement('div');
        this._head.className = 'header';

        this._setProperties(context);
        this._renderHeader(context);
        this._parent.appendChild(this._head);

        this._addListeners(context);
        this._renderAvatar(context);
    }
}


