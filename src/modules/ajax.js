(function () {
    const noop = () => null;

    class AjaxModule {
        _ajax({
                  callback = noop,
                  method = 'GET',
                  path = '/',
                  body = {},
              } = {}) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, path, true);
            xhr.withCredentials = true;

            if (body) {
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }

                callback(xhr);
            };

            if (body) {
                xhr.send(JSON.stringify(body));
            } else {
                xhr.send();
            }
        }

        Get({
                  callback = noop,
                  path = '/',
                  body = {},
              } = {}) {
            this._ajax({
                callback,
                path,
                body,
                method: 'GET',
            });
        }

        Post({
                   callback = noop,
                   path = '/',
                   body = {},
               } = {}) {
            this._ajax({
                callback,
                path,
                body,
                method: 'POST',
            });
        }

         ajaxReg(route, body, callback) {
            let formData = new FormData();
            formData.append("jsonData", JSON.stringify(body));
            let req = new Request(route, {
                method: 'POST',
                mode: 'cors',
                body: formData
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

        ajaxLogin(route, body, callback) {
            let req = new Request(route, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(body)
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
    }

    window.AjaxModule = new AjaxModule();
})();

