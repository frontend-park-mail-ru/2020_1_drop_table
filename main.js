// import cssCard from './CafeCard/CafeCard.css'
// import cssCardContainer from './CafesContainer/CafesContainer.css'

import {CafesContainerComponent} from "./components/CafesContainer/CafesContainer.js";
import {HeaderComponent} from "./components/Header/Header";
import {UserProfileHeaderComponent} from "./components/UserProfileHeader/UserProfileHeader";
import {DecorateLabelComponent} from "./components/DecorateLabel/DecorateLabel";
import {UserProfileFormComponent} from "./components/UserProfileForm/UserProfileForm";



const {AjaxModule} = window;


const application = document.getElementById('application');
const header = document.getElementById('header');


const cafes = {
    'cafe1': {
        imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
        cafeName: 'Приветики'
    },
    'cafe2': {
        imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
        cafeName: 'Кафешка'
    },
    'cafe3': {
        imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
        cafeName: 'Димочка'
    },
    'cafe4': {
        imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
        cafeName: 'Сашечка'
    },
    'cafe5': {
        imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
        cafeName: 'Димочка'
    },
    'cafe6': {
        imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
        cafeName: 'Сережечка'
    },
};

const cafesList = Object.values(cafes)
    .map(cafe => {
        return {
            imageSrc: cafe.imageSrc,
            cafeName: cafe.cafeName
        }
    });


function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');

    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent({
            el: cafesContainerDiv,
        });
        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        cafesContainerComp.render();
    } else {
        AjaxModule.Get({
            callback(xhr) {
                const cafes = JSON.parse(xhr.responseText);
                application.innerHTML = '';
                createCafes(cafes);
            },
            path: '/cafes',
        });
    }
    application.appendChild(cafesContainerDiv);
}

function createHeader() {
    const headerDiv = document.createElement('div');

    const headerComponent = new HeaderComponent({
        el: headerDiv,
    });
    headerComponent.render();

    header.appendChild(headerDiv);
}




function createMyCafesPage(cafesList) {
    createCafes(cafesList);
    createHeader();
}

function createUserProfileHeader(userData){
    const headerDiv = document.createElement('div');

    const headerComponent = new UserProfileHeaderComponent({
        el: headerDiv,
        imageSrc: userData.imageSrc,
        lastChange: userData.lastChange
    });
    headerComponent.render();

    header.appendChild(headerDiv);
}

function createDecorateLabel(labelText){
    const decorateLabelDiv = document.createElement('div');

    const headerComponent = new DecorateLabelComponent({
        el: decorateLabelDiv,
        labelText: labelText,
    });
    headerComponent.render();

    application.appendChild(decorateLabelDiv);
}

function createUserProfileForm(userData){
    const UserProfileFormDiv = document.createElement('div');
    const headerComponent = new UserProfileFormComponent({
        el: UserProfileFormDiv,

    });
    headerComponent.render();
    application.appendChild(UserProfileFormDiv);
}

const userData = {
    imageSrc: "https://sun9-14.userapi.com/c206524/v206524266/45665/yFWB9faNIvU.jpg?ava=1",
    username: "Антон Лапенко",
    email: "alapenko@boldin.ru",
    lastChange: "45 минут"
}

function createUserProfilePage(userData){
    if(userData){
        createUserProfileHeader(userData);
        createDecorateLabel("Мой профиль");
        createUserProfileForm(userData);
    } else {
        AjaxModule.Get({
            callback(xhr) {
                const cafes = JSON.parse(xhr.responseText);
                application.innerHTML = '';
                createUserProfilePage(userData);
            },
            path: '/me',
        });
    }

}


//createUserProfilePage(userData);



createMyCafesPage(cafesList);
