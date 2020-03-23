import {CafesContainerComponent} from '../CafesContainer/CafesContainer';
import {constants} from '../../utils/constants';
import {ajax} from '../../utils/ajax.js';
import {Router} from "../../modules/Router";

const app = document.body;


export function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');
    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent(cafesContainerDiv);

        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        cafesContainerComp.render();
        app.appendChild(cafesContainerDiv);

        let buttonAddCafe = document.getElementsByClassName('cafes-page__add-cafe-field__add-button').item(0);
        buttonAddCafe.addEventListener('click',function (e) {
            Router.redirect('/createCafe');
        })

    } else {
        ajax(constants.PATH + '/api/v1/cafe',
            'GET',
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
            }
        )
    }
    return cafesContainerDiv;
}
