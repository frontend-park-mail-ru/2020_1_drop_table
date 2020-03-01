import {CafesContainerComponent} from '../CafesContainer/CafesContainer';
import {constants} from '../../utils/constants';
import {ajax} from '../../utils/ajax.js';

const app = document.body;

export function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');
    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent({
            el: cafesContainerDiv,
        });

        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        cafesContainerComp.render();
        app.appendChild(cafesContainerDiv);
    } else {
        ajax(constants.PATH + '/api/v1/cafe',
            {}, (response) => {
                if (response.errors === null) {
                    if (response.data !== null) {
                        createCafes(response.data);
                    } else {
                        window.location.hash = '#createCafe';
                    }

                } else {
                    if (response.errors[0].message === "no permissions") {
                        window.location.hash = '#reg'
                    }
                }
            },
            'GET'
        )
    }
    return cafesContainerDiv;
}
