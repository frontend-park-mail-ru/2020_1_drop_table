// import cssCard from './CafeCard/CafeCard.css'
// import cssCardContainer from './CafesContainer/CafesContainer.css'

import {CafesContainerComponent} from "../components/CafesContainer/CafesContainer.js";
// import {HeaderComponent} from "../components/MyHeader/Header";
import {UserProfileHeaderComponent} from "../components/UserProfileHeader/UserProfileHeader";
import {DecorateLabelComponent} from "../components/DecorateLabel/DecorateLabel";
import {UserProfileFormComponent} from "../components/UserProfileForm/UserProfileForm";

import {renderHeader} from "../components/headerDG/header";
import {renderRegister} from "../components/register/register";
import {renderLogin} from "../components/login/login";


import CafeComponent from "../componentsAI/cafe/cafe";

import HeaderComponent from "../componentsAI/header/header"
import ProfileComponent from "../componentsAI/profile/profile";

const {AjaxModule} = window;
const application = document.getElementById('application');
const headerContainer = document.getElementById('headerContainer');

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

let headerData = {
    userPic:'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
    logo:'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
    menu: {
        menuList: [
            {
                id: "myCafe",
                href: '#myCafe',
                text: 'мои кафе',
                event:{
                    type: 'click',
                    listener: createMyCafesPage
                }
            },
            {
                id: "staff",
                href: '#staff',
                text: 'работники',
                event:{
                    type: 'click',
                    listener: listen
                }
            },
            {
                id: "add",
                href: '#add',
                text: 'добавить',
                event:{
                    type: 'click',
                    listener: createNewCafePage
                }
            },
            {
                id: "profile",
                href: '#profile',
                text: 'профиль',
                event:{
                    type: 'click',
                    listener: createUserProfilePage
                }
            },
            {
                id: "stat",
                href: '#stat',
                text: 'статистика',
                event:{
                    type: 'click',
                    listener: listen
                }
            },
        ]
    }
};



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


export function createMyCafesPage() {
    application.innerHTML = '';
    headerContainer.innerHTML = '';

    const headerElement = document.createElement('div');
    headerElement.className = "header";
    headerContainer.appendChild(headerElement);
    (new HeaderComponent(headerElement)).render(headerData);

    createCafes();
}

export function createUserProfilePage(){
let profile = {
    imgSrc:"https://justwoman.club/wp-content/uploads/2017/12/photo.jpg",
    event:{
        type: 'change',
        listener: handleImageUpload
    },
    form: {
        formFields:[
            {
                type:"text",
                id:"id",
                data:"",
            },
            {
                type:"email",
                id:"id",
                data:"",
            },
            {
                type:"password",
                id:"id",
                data:"",
            },
            {
                type:"password",
                id:"id",
                data:"",
            },
        ],
        submitValue: "Готово",
        event:{
            type: 'click',
            listener: listen
        },
    },
};
    (new ProfileComponent).render(profile);
}

// function createUserProfileHeader(userData){
//     const headerDiv = document.createElement('div');
//
//     const headerComponent = new UserProfileHeaderComponent({
//         el: headerDiv,
//         imageSrc: userData.imageSrc,
//         lastChange: userData.lastChange
//     });
//     headerComponent.render();
//
//     header.appendChild(headerDiv);
// }

function createDecorateLabel(labelText){
    const decorateLabelDiv = document.createElement('div');

    const headerComponent = new DecorateLabelComponent({
        el: decorateLabelDiv,
        labelText: labelText,
    });
    headerComponent.render();

    application.appendChild(decorateLabelDiv);
}

// function createUserProfileForm(userData){
//
//     const UserProfileFormDiv = document.createElement('div');
//     const headerComponent = new UserProfileFormComponent({
//         el: UserProfileFormDiv,
//         email: userData['email'],
//         name: userData['name'],
//
//     });
//     headerComponent.render();
//     application.appendChild(UserProfileFormDiv);
// }


function handleImageUpload() {
    let image = document.getElementById("upload").files[0];
    let reader = new FileReader();

    reader.onload = function(e){
        image = document.getElementById("upload").files[0];
        document.getElementById("image").src = e.target.result;
    };
    reader.readAsDataURL(image);

}

function listen(tts){
    alert('tts')
}

function addCafe(){
    const form = document.getElementsByClassName('cafeFormField').item(0);
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;
    const name = form.elements["full-name"].value;
    alert(email);
}


export function createNewCafePage(){
    application.innerHTML = '';
    headerContainer.innerHTML = '';
    let cafe = {
        cafeName: "Новое кафе",
        imgSrc:"https://justwoman.club/wp-content/uploads/2017/12/photo.jpg",
        event:{
            type: 'change',
            listener: handleImageUpload
        },
        form: {
            formFields:[
                {
                    type:"text",
                    id:"id",
                    data:"Название",
                },
                {
                    type:"text",
                    id:"id",
                    data:"Адрес",
                },
                {
                    type:"text",
                    id:"id",
                    data:"Описание",
                },
            ],
            submitValue: "Готово",
            event:{
                type: 'click',
                listener: listen
            },
        },
    };

    const headerElement = document.createElement('div');
    headerElement.className = "header";
    headerContainer.appendChild(headerElement);
    (new HeaderComponent(headerElement)).render(headerData);

    const cafeElement = document.createElement('div');
    application.appendChild(cafeElement);
    (new CafeComponent(cafeElement)).render(cafe);

}
let routes = [
    {
        url: '', callback: function () {
            // application.innerHTML = "Тут будет стартовая страница /reg - регистрация /login - авторизация";
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
