const http = require('http');
const fs = require('fs');

const express = require('express');
const cookie = require('cookie-parser');
const app = express();

app.use(cookie());
app.use(express.static('dist'));

const port = 80;



app.all('*', function(req, res, next) {

    res.sendFile(__dirname + '/dist/index.html');

});

app.listen(port, function() {
    console.log(`Server listening port ${port}`);
});
