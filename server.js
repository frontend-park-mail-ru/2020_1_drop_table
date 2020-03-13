const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let {url} = req;
    if (/\/$/.test(url)) {
        url = `${url}index.html`;
    }
    let body;
    try {
        body = fs.readFileSync(`./dist${url}`);
    } catch (e) {
        let splitedUrl = url.split('/');
        let lastPart = splitedUrl[splitedUrl.length - 1];
        if (lastPart === 'bundle.js') {
            body = fs.readFileSync('./dist/bundle.js')
        } else {
            body = fs.readFileSync(`./dist/index.html`);
        }
    }
    console.log(url);

    res.write(body);

    res.end();
});

server.listen(3000);
console.log('started server localhost:3000')
