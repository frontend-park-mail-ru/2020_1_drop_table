'use strict';

import {ajaxForm} from './ajaxForm.js'

/**
 * Ajax с телом obj
 * @param {string} route - адрес
 * @param {string} method - метод запроса
 * @param {object} data - данные
 * @param {function} callback - функция, которая будет вызвана после запроса
 */
export async function ajax(route, method, data, callback) {
    const formData = new FormData();
    let jsonData = JSON.stringify(data);
    if (method !== 'GET' && method !== 'HEAD') {
        formData.append('jsonData',jsonData );
    }
    await ajaxForm(route, method, formData, callback);
}
