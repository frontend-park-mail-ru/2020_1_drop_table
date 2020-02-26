import {CafesContainerComponent} from "../CafesContainer/CafesContainer";


const app=document.body

export function ajaxCreateCafe(route, body, callback) {

    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-Type', 'text/plain; charset=utf-8');
    let req = new Request(route, {
        method: 'GET',
        headers: h,
        mode:'cors',
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

export function createCafes(cafes) {
    const cafesContainerDiv = document.createElement('div');
    if (cafes) {
        const cafesContainerComp = new CafesContainerComponent({
            el: cafesContainerDiv,
        });
        console.log('data', JSON.parse(JSON.stringify(cafes)));

        cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
        cafesContainerComp.render();
        app.appendChild(cafesContainerDiv)
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
    return cafesContainerDiv;
}