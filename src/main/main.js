import {renderRegister} from '../components/register/register';
// import {renderBlankHeader, renderHeader} from '../components/header/header';

import {renderBlankHeader, renderHeader} from '../components/mainHeader/header';

import {renderLogin} from '../components/login/login';
import {createCafes} from '../components/myCafePage/creation';
import {createUserProfilePage} from '../components/userProphilePage/creation';
import {createNewCafePage} from '../components/AddCafePage/creation';

import {CreateCafePage} from '../components/CafePage/CafePage'


const app = document.body;


let routes = [
    {
        url: '', callback: function () {
            app.innerHTML = '';
            app.appendChild(renderHeader());
            createCafes();
        }
    }
];

/**
 * Получает то, на что оканчивается url
 * @returns {string}
 */
function getUrl() {
    return window.location.hash.substr(1);
}

/**
 * При изменении url вызывается эта функция, она проходит по списку маршрутов и если подходящий роут найден,
 * вызывает его callback( какие функции нужно вызвать для рендеритнга страничкит)
 * @constructor
 */
function Routing() {
    let url = getUrl();
    let route = routes[0];
    routes.forEach(item => {
        if (url === item.url) {
            route = item;
        }
    });
    route.callback();
}


window.addEventListener('popstate', Routing);


setTimeout(Routing, 0);


routes.push({

    url: 'reg', callback: () => {
        app.innerHTML = '';
        app.appendChild(renderHeader('auth'));
        app.appendChild(renderRegister());

    }
});
routes.push({
    url: 'login', callback: () => {
        app.innerHTML = '';
        app.appendChild(renderHeader('auth'));
        app.appendChild(renderLogin());
    }

});

routes.push({
    url: 'myCafe', callback: () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createCafes();
    }

});

routes.push({
    url: 'profile', callback: () => {
        app.innerHTML = '';
        let up = document.createElement('div');
        createUserProfilePage(up);
        app.appendChild(renderHeader('profile'));
        app.appendChild(up);
    }

});

routes.push({
    url: 'createCafe', callback: () => {
        app.innerHTML = '';
        app.appendChild(renderHeader());
        createNewCafePage(app);
    }

});

routes.push({
    url: 'cafe', callback: () => {
        app.innerHTML = '';
        let up = document.createElement('div');
        app.appendChild(renderHeader());
        CreateCafePage(app, 5);
    }

});
