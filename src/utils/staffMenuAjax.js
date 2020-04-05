export async function staffMenuAjax(method, route, body, callback) {
    console.log('route', route)
    let req;

        req = new Request(route, {
            method: method,
            mode: 'cors',
            credentials: 'include',
        });
        if(method === 'PUT'){
            req = new Request(route, {
                method: method,
                mode: 'cors',
                body: null, //хз
                credentials: 'include',
            });
        }

    let responseJson = null;
    try {
        const response = await fetch(req);
        if (response.ok) {
            console.log('test123',response);
            responseJson = await response.json();
        } else {
            throw new Error('Response not ok');
        }
    } catch (exception) {
        console.log('Ajax Error:', exception.message);
    }

    callback(responseJson);
}
