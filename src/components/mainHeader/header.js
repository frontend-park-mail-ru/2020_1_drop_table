import './header.css'
import headerTemplate from '../mainHeader/header.hbs';
import {createUserProfilePage} from "../userProphilePage/creation";
import {ajaxCreateCafe} from "../myCafePage/creation";
import {constants} from "../../utils/constants";
import {handleImageUpload} from "../../modules/imageUpload";
import ProfileComponent from "../../componentsAI/profile/profile";

export function renderHeader(page) {
    let head = document.createElement('div');
    head.className = 'header';
    let _hasAvatar;
    let _hasExit;
    let _menuList;
    let _logo
    if( page == 'auth'){
        _hasAvatar = false;
        _hasExit = false;
        _menuList = [
            {href: '#login', text: 'Войти'},
            {href: '#reg', text: 'Зарегистрироваться'}
            ]
    } else if(page == 'profile'){
        _hasAvatar = false;
        _hasExit = true;
        _menuList = [
            {href: '#myCafes', text: 'Мои кафе'},
            {href: '#createCafe', text: 'Добавить'},
            {href: '#statistics', text: 'Статистика'},
            {href: '#staff', text: 'Работники'},
        ]
    } else{
        _hasAvatar = true;
        _hasExit = false;
        _menuList = [
            {href: '#myCafes', text: 'Мои кафе'},
            {href: '#createCafe', text: 'Добавить'},
            {href: '#statistics', text: 'Статистика'},
            {href: '#staff', text: 'Работники'},
        ];
        ajaxCreateCafe(constants.PATH+'/api/v1/getCurrentOwner/',
            {}, (response) => {
                if (response.errors === null) {

                } else {
                    alert(response.errors[0].message); //TODO showError
                }
            })


    }
    let headerData = {
        hasAvatar: _hasAvatar,
        hasExit: _hasExit,
        logoImageSrc:'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
        menuList: _menuList,
        avatarImageSrc:'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg'
    };
    head.innerHTML = headerTemplate(headerData);

    if( _hasAvatar ) {
        let avatar = head.getElementsByClassName('avatarContainer').item(0);
        avatar.addEventListener('click', function () {
            window.location.hash = '#profile';
        });
    }

    if ( _hasExit){
        let avatar = head.getElementsByClassName('exitProfile').item(0);
        avatar.addEventListener('click', function () {
            alert('exit');
        });
    }

    return head;
}



