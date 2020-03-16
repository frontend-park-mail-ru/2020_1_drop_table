'use strict';

/**
 * Ajax с телом FormData
 * @param {string} route - адресс
 * @param {string} method - метод запроса
 * @param {FormData} formData - данные
 * @param {function} callback - функция, которая будет вызвана после запроса
 */
export function ajaxForm(route,method, formData, callback) {

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