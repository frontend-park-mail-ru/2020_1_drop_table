/**
 * AJAX запрос используемый при логине
 * @param method POST,GET,PUT и т.д
 * @param route По какому роуту отправлять реквест
 * @param body Тело запроса
 * @param callback Функция принимающая результат ответа
 */
import {router} from '../main/main';
import {LoadingComponent} from '../components/Loading/Loading';

export async function authAjax(method, route, body, callback, allowGet) {
    let reqBody;
    console.log('body',JSON.stringify(body));
    if(method !== 'GET'){
        reqBody = {
            method: method,
            mode: 'cors',
            body: JSON.stringify(body),
            credentials: 'include',
        };

    }
    else {
        reqBody ={
            method: method,
            mode: 'cors',
            credentials: 'include',
        };
    }
    const myCsrf = sessionStorage.getItem('Csrf');
    if(myCsrf){
        reqBody.headers = {'X-CSRF-TOKEN': myCsrf};
        //req.headers.append( 'X-CSRF-TOKEN' ,myCsrf);
    }
    // const loading = new LoadingComponent();
    // loading.render();

    const req = new Request(route, reqBody);
    let responseJson = null;
    try {
        const response = await fetch(req);
        if (response.ok) {
            // loading.remove();
            const csrf = response.headers.get('Csrf');
            if(csrf){
                sessionStorage.setItem('Csrf', csrf);
            }
            responseJson = await response.json();
        } else {
            throw new Error('Response not ok');
        }
    } catch (exception) {
        // loading.remove();
        // router._goTo('/login');
        console.log('Ajax Error:', exception.message);
    }

    callback(responseJson);
}
