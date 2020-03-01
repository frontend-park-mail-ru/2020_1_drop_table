'use strict';

import {ajaxForm} from './ajaxForm.js'

export function ajax(route, data, callback, method) {
    const formData = new FormData();
    if (method !== 'GET' && method !== 'HEAD') {
        formData.append('jsonData', JSON.stringify(data));
    }
    ajaxForm(route, formData, callback, method);
}