/**
 * AJAX запрос используемый при логине
 * @param method POST,GET,PUT и т.д
 * @param route По какому роуту отправлять реквест
 * @param body Тело запроса
 * @param callback Функция принимающая результат ответа
 */
export function ajaxForLogin(method, route, body, callback) {

    let req = new Request(route, {
        method: method,
        mode: 'cors',
        body: JSON.stringify(body),
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
        .then((formData) => {
            callback(formData);
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}
