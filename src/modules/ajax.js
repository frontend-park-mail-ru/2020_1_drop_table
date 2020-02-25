export function ajax(route, body, callback) {
    fetch(
        route, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'include',
        }
    )
        .then(response => callback(response.json()))
        .catch(error => console.log(error))
}