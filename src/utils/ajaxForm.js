'use strict';

/**
 * Ajax с телом FormData
 * @param {string} route - адресс
 * @param {string} method - метод запроса
 * @param {FormData} formData - данные
 * @param {function} callback - функция, которая будет вызвана после запроса
 */
export async function ajaxForm(route, method, formData, callback) {

    const reqBody = {
        method: method,
        mode: 'cors',
        credentials: 'include',
    };

    const myCsrf = sessionStorage.getItem('Csrf');
    if(myCsrf){
        reqBody.headers = {'X-CSRF-TOKEN': myCsrf};
    }

    if(method !== 'GET' && method !== 'HEAD'){
        reqBody['body'] = formData;
    }

    const req = new Request(route, reqBody);
    let responseJson = null;

    try {
        const response = await fetch(req);
        if (response.ok) {
            const csrf = response.headers.get('Csrf');
            if(csrf){
                sessionStorage.setItem('Csrf', csrf);
            }
            responseJson = await response.json();
        } else {
            throw new Error('Response not ok');
        }
    } catch (exception) {
        console.log('Ajax Error:', exception.message);
    }

    callback(responseJson);
}
