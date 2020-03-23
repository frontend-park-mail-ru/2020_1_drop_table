'use strict';

import {ajaxForm} from './ajaxForm.js'

/**
 * Ajax с телом obj
 * @param {string} route - адресс
 * @param {string} method - метод запроса
 * @param {object} data - данные
 * @param {function} callback - функция, которая будет вызвана после запроса
 */
export function ajax(route, method, data, callback) {
    const formData = new FormData();
    if (method !== 'GET' && method !== 'HEAD') {
        formData.append('jsonData', JSON.stringify(data));
    }
    ajaxForm(route, method, formData, callback);
}