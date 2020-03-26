/**
 * AJAX запрос используемый при логине
 * @param method POST,GET,PUT и т.д
 * @param route По какому роуту отправлять реквест
 * @param body Тело запроса
 * @param callback Функция принимающая результат ответа
 */
export async function authAjax(method, route, body, callback) {
    let req;

    if(method !== 'GET'){
        req = new Request(route, {
            method: method,
            mode: 'cors',
            body: JSON.stringify(body),
            credentials: 'include',
        });

    } else {
        req = new Request(route, {
            method: method,
            mode: 'cors',
            credentials: 'include',
        });
    }

    let responseJson = null;

    try {
        const response = await fetch(req);
        if (response.ok) {
            responseJson = await response.json();
        } else {
            throw new Error('Response not ok');
        }
    } catch (exception) {
        console.log('Ajax Error:', exception.message);
    }

    callback(responseJson);
}
