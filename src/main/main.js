// import cssCard from './CafeCard/CafeCard.css'
// import cssCardContainer from './CafesContainer/CafesContainer.css'

import {CafesContainerComponent} from "../components/CafesContainer/CafesContainer.js";
import {HeaderComponent} from "../components/Header/Header";
import {UserProfileHeaderComponent} from "../components/UserProfileHeader/UserProfileHeader";
import {DecorateLabelComponent} from "../components/DecorateLabel/DecorateLabel";
import {UserProfileFormComponent} from "../components/UserProfileForm/UserProfileForm";

import {renderHeader} from "../components/headerDG/header";
import {renderRegister} from "../components/register/register";
import {renderLogin} from "../components/login/login";



const {AjaxModule} = window;


const application = document.getElementById('application');
const header = document.getElementById('header');



function ajax(route, body, callback) {

    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-Type', 'text/plain; charset=utf-8');
    let req = new Request(route, {
        method: 'GET',
        headers: h,
        credentials: 'include',
    });

    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('BAD HTTP stuff');
            }

        })
        .then((response) => {
            callback(response);
            console.log('RESPONSE:', response);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}



const userData = {
    imageSrc: "https://sun9-14.userapi.com/c206524/v206524266/45665/yFWB9faNIvU.jpg?ava=1",
    name: "Антон Лапенко",
    email: "alapenko@boldin.ru",
    lastChange: "45 минут"
}




function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');

    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent({
            el: cafesContainerDiv,
        });
        console.log('data', JSON.parse(JSON.stringify(cafes)));


        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        cafesContainerComp.render();
    } else {
        console.log('COOKIE   ');
        console.log('COOKIE   ',document.cookie);
        ajax('http://localhost:8080/api/v1/cafe',
            {}, (response) => {
                console.log("RESPONSE1", response);
                if (response.errors === null) {
                    createCafes(response.data)
                } else {
                    alert(response.errors[0].message)
                }
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




export function createMyCafesPage() {

    application.innerHTML = '';
    createCafes();
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
        email: userData['email'],
        name: userData['name'],

    });
    headerComponent.render();
    application.appendChild(UserProfileFormDiv);
}


export function createUserProfilePage(userData){
    application.innerHTML = '';
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




let routes = [
    {
        url: '', callback: function () {
            application.innerHTML = "Тут будет стартовая страница /reg - регистрация /login - авторизация";
        }
    }
];


function getUrl(href) {
    const url = href.split('/');
    return url[url.length - 1]
}

function Routing() {
    let href = window.location.href;
    console.log(href);
    let url = getUrl(href);
    let route = routes[0];
    routes.forEach(item => {
        if (url === item.url) {
            route = item
        }
    });
    route.callback();
}


window.addEventListener('popstate', Routing);

setTimeout(Routing, 0);


routes.push({

    url: "reg", callback: () => {
        application.innerHTML = "";
        application.appendChild(renderHeader());
        application.appendChild(renderRegister());
    }
});
routes.push({
    url: "login", callback: () => {
        application.innerHTML = "";
        application.appendChild(renderHeader());
        application.appendChild(renderLogin());

    }
});

routes.push({
    url: "myCafes", callback: () => {
        console.log("hello");
        application.innerHTML = "";
        createMyCafesPage()
    }
});

routes.push({
    url: "userProfile", callback: () => {
        application.innerHTML = "";
        createUserProfilePage(userData)
    }
});
