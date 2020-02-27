const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	let { url } = req;
	if (/\/$/.test(url)) {
		url = `${url}index.html`;
	}

	let body;
	try {
		body = fs.readFileSync(`./src/main${url}`);
	} catch (e) {
		console.log(e);
		res.statusCode = 404;
		res.write('404')
		res.end();
		return;
	}
	console.log(url);

	res.write(body);

	res.end();
});

server.listen(3010);
