const http = require('http');
const fs = require('fs');



// const server = http.createServer((req, res) => {
//
//     let {url} = req;
//     if (/\/$/.test(url)) {
//         url = `${url}index.html`;
//     }
//     let body;
//     try {
//         body = fs.readFileSync(`./dist${url}`);
//     } catch (e) {
//         let splitedUrl = url.split('/');
//         let lastPart = splitedUrl[splitedUrl.length - 1];
//         if (lastPart === 'bundle.js') {
//             console.log('bundle');
//                body = fs.readFileSync('./dist/bundle.js')
//         } else {
//             console.log('index');
//             body = fs.readFileSync(`./dist/index.html`);
//
//         }
//     }
//     console.log('url: ',url);
//
//     res.write(body);
//
//     res.end();
// });
//
// server.listen(3000);
// console.log('started server localhost:3000');


const express = require('express');
const cookie = require('cookie-parser');
const app = express();

app.use(cookie());
app.use(express.static('dist'));

const port = 3000;

// app.get("/sw.ts", (req, res) => {
//     res.sendFile(__dirname + "/src/sw.ts");
// });

app.all('*', function(req, res, next) {
    console.log('tut')
    res.sendFile(__dirname + '/dist/index.html');

});

app.listen(port, function() {
    console.log(`Server listening port ${port}`);
});
