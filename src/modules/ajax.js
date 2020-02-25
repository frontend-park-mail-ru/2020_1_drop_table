export function ajax(method,route, body, callback) {

    let h = new Headers();
    h.append('Accept', '*/*');
    h.append('Content-type', 'application/json')

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