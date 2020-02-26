// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const express = require('express');
const app = express(),
	// eslint-disable-next-line no-undef
	DIST_DIR = __dirname,
	HTML_FILE = path.join(DIST_DIR, '../main/index.html');
// eslint-disable-next-line no-undef
WP_DIR = path.join(DIST_DIR, '../../dist/bundle.js');
app.use(express.static(HTML_FILE));

app.use(express.static(DIST_DIR));
// app.use(express.static(path.join(DIST_DIR, '../../dist/bundle.js')));

console.log(path.join(DIST_DIR, '../../dist'));

app.get('*', (req, res) => {
	res.sendFile(HTML_FILE);
});
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
	console.log('Press Ctrl+C to quit.');
});


