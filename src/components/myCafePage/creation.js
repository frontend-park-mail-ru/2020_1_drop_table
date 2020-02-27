import {CafesContainerComponent} from '../CafesContainer/CafesContainer';


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
    } else {
        ajaxCreateCafe('http://80.93.177.185:8080/api/v1/cafe',
            {}, (response) => {
                if (response.errors === null) {
                    if (response.data !== null) {
                        createCafes(response.data);
                    } else {
                        window.location.hash = '#createCafe';
                    }

                } else {
                    alert(response.errors[0].message); //TODO showError
                }
            });
    }
    return cafesContainerDiv;
}