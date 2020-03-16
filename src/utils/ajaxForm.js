'use strict';

/**
 * Ajax с телом FormData
 * @param {string} route - адресс
 * @param {string} method - метод запроса
 * @param {FormData} formData - данные
 * @param {function} callback - функция, которая будет вызвана после запроса
 */
export function ajaxForm(route,method, formData, callback) {

    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-Type', 'text/plain; charset=utf-8');

    const reqBody = {
        method: method,
        headers: h,
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