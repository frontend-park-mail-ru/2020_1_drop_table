import './Header.css'
import headerTemplate from './Header.hbs';
import {createUserProfilePage} from "../UserProfilePage/Creation";
import {ajax} from '../../utils/ajax'
import {constants} from "../../utils/constants";
import {handleImageUpload} from "../../modules/imageUpload";
import ProfileComponent from "../profile/profile";
import {Router} from "../../modules/Router";

export function renderHeader(page) {
    let head = document.createElement('div');
    head.className = 'header';
    let _hasAvatar;
    let _hasExit;
    let _menuList = [
        {href: '/myCafes', text: 'Мои кафе'},
        {href: '/createCafe', text: 'Добавить'},
        {href: '/statistics', text: 'Статистика'},
        {href: '/staff', text: 'Работники'},
    ];

    let _logo;
    let _avatar = 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg';

    if( page == 'auth'){
        _hasAvatar = false;
        _hasExit = false;
        _menuList =[];

    } else if(page == 'profile'){
        _hasAvatar = false;
        _hasExit = true;
    } else{
        _hasAvatar = true;
        _hasExit = false;

        ajax(constants.PATH+'/api/v1/getCurrentOwner/','GET',{},(response) => {
            if (response.errors === null) {
                _avatar = response.data['photo'];
                console.log('avatar ',_avatar);
                let ava = head.getElementsByClassName('page-header__avatar_img').item(0);
                ava.setAttribute('src',_avatar); //TODO поменять на promise
            } else {
                alert(response.errors[0].message); //TODO showError
            }
        });
    }

    let headerData = {
        hasAvatar: _hasAvatar,
        hasExit: _hasExit,
        logoImageSrc:'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
        menuList: _menuList,
        avatarImageSrc:_avatar
    };
    head.innerHTML = headerTemplate(headerData);

    if( _hasAvatar ) {
        let avatar = head.getElementsByClassName('page-header__avatar').item(0);
        avatar.addEventListener('click', function () {
            Router.redirect('/profile');
        });
    }

    if ( _hasExit){
        let avatar = head.getElementsByClassName('page-header__h4').item(0);
        avatar.addEventListener('click', function () {
            alert('exit');
        });
    }

    return head;
}



