'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();


app.use(morgan('dev'));
app.use(express.static('./src/main/server'));
app.use(body.json());
app.use(cookie());



const cafes = {
	'cafe1': {
		imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
		cafeName: 'Приветики'
	},
	'cafe2': {
imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
		cafeName: 'Кафешка'
	},
	'cafe3': {
		imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
		cafeName: 'Димочка'
	},
	'cafe4': {
		imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
		cafeName: 'Сашечка'
	},
	'cafe5': {
		imageSrc: 'https://kaliningrad.kurort-pro.ru/images/cms/thumbs/b519f8343a09f6bafd2a195ede722a6309b555ea/veterok-e1457018920107_425_260_jpg_5_95.jpg',
		cafeName: 'Димочка'
	},
	'cafe6': {
		imageSrc: 'https://q-house.com.ua/image/cache/catalog/portfolio/rotang/qhouse_rotang_obekti%20(3)-425x260.jpg',
		cafeName: 'Сережечка'
	},
};


const users = {
    alapenko: {
	imageSrc: "https://sun9-14.userapi.com/c206524/v206524266/45665/yFWB9faNIvU.jpg?ava=1",
	username: "Антон Лапенко",
	email: "alapenko@boldin.ru",
	lastChange: "45 минут"
	},

	dboldin: {
		imageSrc: "https://justwoman.club/wp-content/uploads/2017/12/photo.jpg",
		username: "Дмитрий Болдин",
		email: "db@boldin.ru",
		lastChange: "35 минут"
	},

	aaverkiev: {
		imageSrc: "https://justwoman.club/wp-content/uploads/2017/12/photo.jpg",
		username: "Александр Аверкиев",
		email: "averkiller@boldin.ru",
		lastChange: "13 минут"
	},
	dgulachenkov: {
		imageSrc: "https://justwoman.club/wp-content/uploads/2017/12/photo.jpg",
		username: "Дмитрий Гуляченков",
		email: "lublulebedey@boldin.ru",
		lastChange: "30 минут"
	},
	spetrenko: {
		imageSrc: "https://justwoman.club/wp-content/uploads/2017/12/photo.jpg",
		username: "Сергей Петренко",
		email: "seregagaga@boldin.ru",
		lastChange: "40 минут"
	},

}



const ids = {};

app.get('/cafes', function (req, res) {
	const cafesList = Object.values(cafes)
		.map(cafe => {
			return {
				imageSrc: cafe.imageSrc,
				cafeName: cafe.cafeName
			}
		});

	res.json(cafesList);
});

app.get('/me', function (req, res) {
	const cafesList = Object.values(cafes)
		.map(cafe => {
			return {
				imageSrc: cafe.imageSrc,
				cafeName: cafe.cafeName
			}
		});

	res.json(cafesList);
});


app.post('/api/v1/owner', function (req, res) {
	// res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With');

	console.log(req.body.toString());
	console.log("hello");
	res.status(200).json({test: 'test1', body: req.body});
});

app.get('/', function(request, response){
	response.sendFile('../src/main/index.html');
});

const port = process.env.PORT || 3000;


app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});




