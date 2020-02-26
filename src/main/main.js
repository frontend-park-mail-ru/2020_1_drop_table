import {renderRegister} from '../components/register/register';
import {renderHeader} from "../components/header/header";
import {renderLogin} from "../components/login/login";
import {CafesContainerComponent} from "../components/CafesContainer/CafesContainer.js";
import ProfileComponent from '../componentsAI/profile/profile';


const app = document.body;


function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');
    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent({
            el: cafesContainerDiv,
        });
        console.log('data', JSON.parse(JSON.stringify(cafes)));

        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        let data = cafesContainerComp.render();
        app.appendChild(data)
    } else {
        console.log('COOKIE   ');
        console.log('COOKIE   ', document.cookie);
        ajaxCreateCafe('http://80.93.177.185:8080/api/v1/cafe',
            {}, (response) => {
                console.log("RESPONSE1", response);
                if (response.errors === null) {
                    if (response.data !== null) {
                        createCafes(response.data)
                    } else {
                        console.log("Dolzhen create")
                    }

                } else {
                    alert(response.errors[0].message)
                }
            });
    }
}


function ajaxCreateCafe(route, body, callback) {

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


function handleImageUpload() {
    let image = document.getElementById('upload').files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        image = document.getElementById('upload').files[0];
        document.getElementById('image').src = e.target.result;
    };
    reader.readAsDataURL(image);

}

function ajaxChangeUserData(route, body, callback) {
    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-type', 'multipart/form-data');
    let formData = new FormData();
    formData.append('jsonData', JSON.stringify(body));
    let req = new Request(route, {
        method: 'PUT',
        mode: 'cors',
        body: formData,
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
        .then((formData) => {
            callback(formData);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}

function changeUserProfile(e) {
    e.preventDefault();
    const form = document.getElementsByClassName('formField').item(0);
    const id = form.elements['userId'].value;
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const password1 = form.elements['password1'].value;
    const password2 = form.elements['password2'].value;
    if (password1 === password2) {
        let route = `http://80.93.177.185:8080/api/v1/owner/${id}`;
        alert(route + '\n' + document.cookie);
        ajaxChangeUserData(route,
            {'name': name.toString(), 'email': email.toString(), 'password': password1.toString()}
            , (response) => {
                console.log('RESPONSE change user', response);
                if (response.errors === null) {
                    alert('Данные изменены');
                } else {
                    alert(response.errors[0].message);
                }
            });
    } else {
        alert('Пароли не совпадают');
    }


}


function createUserProfilePage() {
    app.innerHTML = '';

    ajaxCreateCafe('http://80.93.177.185:8080/api/v1/getCurrentOwner/',
        {}, (response) => {
            console.log('RESPONSE1', response);
            if (response.errors === null) {

                let profile = {
                    imgSrc: 'https://justwoman.club/wp-content/uploads/2017/12/photo.jpg',
                    event: {
                        type: 'change',
                        listener: handleImageUpload
                    },
                    form: {
                        formFields: [
                            {
                                type: 'text',
                                id: 'userId',
                                data: response.data['id'],
                            },
                            {
                                type: 'text',
                                id: 'name',
                                data: response.data['name'],
                            },
                            {
                                type: 'email',
                                id: 'email',
                                data: response.data['email'],
                            },
                            {
                                type: 'password',
                                id: 'password1',
                                data: response.data['password'],
                            },
                            {
                                type: 'password',
                                id: 'password2',
                                data: response.data['password'],
                            },
                        ],
                        submitValue: 'Готово',
                        event: {
                            type: 'submit',
                            listener: changeUserProfile
                        },
                    },
                };
                (new ProfileComponent(app)).render(profile);
            } else {
                alert(response.errors[0].message);
            }
        });


}


let routes = [
    {
        url: '', callback: function () {
            app.innerHTML = "тут типа будет главная страница /reg /login\n" +
                "<a href=\"#login\">login</a>\n" +
                "<a href=\"#reg\">reg</a>";
        }
    }
];


function getUrl() {
    return window.location.hash.substr(1)
}

function Routing() {
    let url = getUrl();
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
        app.innerHTML = "";
        app.appendChild(renderHeader())
        app.appendChild(renderRegister())
    }
});
routes.push({
    url: "login", callback: () => {
        app.innerHTML = "";
        app.appendChild(renderHeader());
        app.appendChild(renderLogin())
    }

});

routes.push({
    url: "myCafe", callback: () => {
        app.innerHTML = "";
        app.appendChild(renderHeader())
        createCafes()
    }

});

routes.push({
    url: "profile", callback: () => {
        app.innerHTML = "";
        createUserProfilePage()
    }

});





