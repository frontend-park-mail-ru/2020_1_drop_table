'use strict';

export function ajaxForm(route, formData, callback, method) {

    const reqBody = {
        method: method,
        mode: 'cors',
        credentials: 'include',
    };

    if(method !== 'GET' && method !== 'HEAD'){
        reqBody['body'] = formData;
    }
    const req = new Request(route, reqBody);

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