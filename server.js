const express = require('express');
const cookie = require('cookie-parser');
const app = express();

app.use(cookie());
app.use(express.static('dist'));
app.use(express.static(__dirname + '/src/main'));

const port = 3009;

app.all('*', function(req, res) {
	res.sendFile(__dirname + '/src/main/index.html');
});

app.listen(port, function() {
	console.log(`Server listening port ${port}`);
});
