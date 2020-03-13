import {CafesContainerComponent} from '../CafesContainer/CafesContainer';
import {constants} from "../../utils/constants";
import {Router} from "../../modules/Router";


const app = document.body;

export function ajaxCreateCafe(route, body, callback) {

    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-Type', 'text/plain; charset=utf-8');
    let req = new Request(route, {
        method: 'GET',
        headers: h,
        mode: 'cors',
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
        })
        .catch((err) => {
            console.log(err);
        });
}

export function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');
    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent({
            el: cafesContainerDiv,
        });

        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        cafesContainerComp.render();
        app.appendChild(cafesContainerDiv);

        let buttonAddCafe = document.getElementsByClassName('cafes-page__add-cafe-field__add-button').item(0);
        buttonAddCafe.addEventListener('click',function (e) {
            Router.redirect('/createCafe');
        })

    } else {
        ajaxCreateCafe(constants.PATH + '/api/v1/cafe',
            {}, (response) => {
                if (response.errors === null) {
                    if (response.data !== null) {
                        console.log('create cafes');
                        createCafes(response.data);
                    } else {
                        Router.redirect('/createCafe')
                    }

                } else {
                    if (response.errors[0].message === "no permissions") {
                        Router.redirect('/reg')
                    }
                }
            });
    }
    return cafesContainerDiv;
}
