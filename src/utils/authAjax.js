/**
 * AJAX запрос используемый при логине
 * @param method POST,GET,PUT и т.д
 * @param route По какому роуту отправлять реквест
 * @param body Тело запроса
 * @param callback Функция принимающая результат ответа
 */
export async function authAjax(method, route, body, callback) {
    let reqBody;

    if(method !== 'GET'){
        reqBody = {
            method: method,
            mode: 'cors',
            body: JSON.stringify(body),
            credentials: 'include',
        };

    } else {
        reqBody ={
            method: method,
            mode: 'cors',
            credentials: 'include',
        };
    }
    const myCsrf = sessionStorage.getItem('Csrf');
    console.log('myCSRF auth', myCsrf)
    if(myCsrf){
        reqBody.headers = {'X-CSRF-TOKEN': myCsrf};
        //req.headers.append( 'X-CSRF-TOKEN' ,myCsrf);
    }


    const req = new Request(route, reqBody);
    let responseJson = null;
    try {
        const response = await fetch(req);


        if (response.ok) {
            console.log('resp auth ok');
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
