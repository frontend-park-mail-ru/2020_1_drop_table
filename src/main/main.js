import {CafesContainerComponent} from '../components/CafesContainer/CafesContainer.js';

import {renderRegister} from '../components/register/register';
import {renderLogin} from '../components/login/login';


import CafeComponent from '../componentsAI/cafe/cafe';

import HeaderComponent from '../componentsAI/header/header';
import ProfileComponent from '../componentsAI/profile/profile';

const application = document.getElementById('application');
const headerContainer = document.getElementById('headerContainer');

function ajax(route, body, callback) {

	let h = new Headers();
	h.append('Accept', '*/*');
	h.append('Content-Type', 'text/plain; charset=utf-8');
	let req = new Request(route, {
		method: 'GET',
		headers: h,
		mode: 'cors',
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
		.then((response) => {
			callback(response);
			console.log('RESPONSE:', response);
		})
		.catch((err) => {
			console.log('ERROR:', err.message);
		});
}

function ajaxGetOwner(route, body, callback) {

	let h = new Headers();
	h.append('Accept', '*/*');
	let req = new Request(route, {
		method: 'GET',
		headers: h,
		mode: 'cors',
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
		.then((response) => {
			callback(response);
			console.log('RESPONSE:', response);
		})
		.catch((err) => {
			console.log('ERROR:', err.message);
		});
}


let headerData = {
	// userPic:'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
	logo: 'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
	menu: {
		menuList: [
			{
				id: 'myCafe',
				href: '#myCafe',
				text: 'мои кафе',
				event: {
					type: 'click',
					listener: createMyCafesPage
				}
			},
			{
				id: 'staff',
				href: '#staff',
				text: 'работники',
				event: {
					type: 'click',
					listener: listen
				}
			},
			{
				id: 'add',
				href: '#add',
				text: 'добавить',
				event: {
					type: 'click',
					listener: createNewCafePage
				}
			},
			{
				id: 'profile',
				href: '#profile',
				text: 'профиль',
				event: {
					type: 'click',
					listener: createUserProfilePage
				}
			},
			{
				id: 'stat',
				href: '#stat',
				text: 'статистика',
				event: {
					type: 'click',
					listener: listen
				}
			},
		]
	}
};

function createRegister(e) {
	e.preventDefault();
	application.innerHTML = '';
	headerContainer.innerHTML = '';
	const headerElement = document.createElement('div');
	headerElement.className = 'header';
	headerContainer.appendChild(headerElement);
	(new HeaderComponent(headerElement)).render(regHeaderData);
	application.appendChild(renderRegister());

}

function createLogin(e) {
	e.preventDefault();
	application.innerHTML = '';
	headerContainer.innerHTML = '';
	const headerElement = document.createElement('div');
	headerElement.className = 'header';
	headerContainer.appendChild(headerElement);
	(new HeaderComponent(headerElement)).render(loginHeaderData);
	application.appendChild(renderLogin());

}

let loginHeaderData = {
	// userPic:'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
	logo: 'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
	menu: {
		menuList: [
			{
				id: 'myCafe',
				href: '#reg',
				text: 'Зарегистрироваться',
				event: {
					type: 'click',
					listener: createRegister
				}
			},
		]
	}
};


let regHeaderData = {
	// userPic:'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
	logo: 'https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg',
	menu: {
		menuList: [
			{
				id: 'myCafe',
				href: '#reg',
				text: 'У меня есть аккаунт',
				event: {
					type: 'click',
					listener: createLogin
				}
			},
		]
	}
};


function createCafes(cafes) {
	const cafesContainerDiv = document.createElement('div');
	if (cafes) {
		const cafesContainerComp = new CafesContainerComponent({
			el: cafesContainerDiv,
		});
		console.log('data', JSON.parse(JSON.stringify(cafes)));

		cafesContainerComp.data = JSON.parse(JSON.stringify(cafes));
		cafesContainerComp.render();
	} else {
		console.log('COOKIE   ');
		console.log('COOKIE   ', document.cookie);
		ajax('http://80.93.177.185:8080/api/v1/cafe',
			{}, (response) => {
				console.log('RESPONSE1', response);
				if (response.errors === null) {
					if (response.data !== null) {
						createCafes(response.data);
					} else {
						createNewCafePage();
					}

				} else {
					alert(response.errors[0].message);
				}
			});
	}
	application.appendChild(cafesContainerDiv);
}


export function createMyCafesPage() {
	console.log('Cookie in createMyCafesPage' + document.cookie);
	application.innerHTML = '';
	headerContainer.innerHTML = '';
	const headerElement = document.createElement('div');
	headerElement.className = 'header';
	headerContainer.appendChild(headerElement);
	(new HeaderComponent(headerElement)).render(headerData);
	createCafes();
}


function ajaxChangeUserData(route, formData, callback) {
	let h = new Headers();
	h.append('Accept', '*/*');
	h.append('Content-type', 'multipart/form-data');
	h.append('Access-Control-Allow-Origin', '*');
	let req = new Request(route, {
		method: 'PUT',
		mode: 'cors',
		body: formData,
		// headers: h,
		credentials: 'include',
	});
	fetch(req)
		.then((response) => {
			console.log('response ' + response);
			if (response.ok) {
				return null;
			} else {
				throw new Error('BAD HTTP stuff');
			}
		})
		.then((formData) => {
			callback(formData);
		})
		.catch((err) => {
			console.log('no response ');
			console.log('ERROR:', err.message);
		});

}


function changeUserProfile(e) {
	e.preventDefault();
	console.log('Cookie in changeUserProfile' + document.cookie);
	const form = document.getElementsByClassName('formField').item(0);
	const photoInput = document.getElementById('upload');

	const id = form.elements['userId'].value;
	const name = form.elements['name'].value;
	const email = form.elements['email'].value;
	const password1 = form.elements['password1'].value;
	const password2 = form.elements['password2'].value;
	const photo = photoInput.files[0];

	console.log(photo);

	if (password1 === password2) {
		let formData = new FormData();
		formData.append('jsonData', JSON.stringify({
			'name': name.toString(),
			'email': email.toString(),
			'password': password1.toString()
		}));

		if (photo) {
			formData.append('photo', photo);
		}

		ajaxChangeUserData('http://80.93.177.185:8080/api/v1/owner/' + id,
			formData
			, (response) => {
				console.log('RESPONSE change user', response);
				if (response === null) {
					alert('Данные изменены');
				} else {
					alert(response.errors[0].message);
				}
			});
	} else {
		alert('Пароли не совпадают');
	}


}

export function createUserProfilePage() {
	application.innerHTML = '';
	console.log('Cookie in createUPP' + document.cookie);
	ajaxGetOwner('http://80.93.177.185:8080/api/v1/getCurrentOwner/',
		{}, (response) => {
			console.log('RESPONSE1', response);
			if (response.errors === null) {

				let profile = {
					imgSrc: response.data['photo'],
					event: {
						type: 'change',
						listener: handleImageUpload
					},
					form: {
						formFields: [
							{
								type: 'text',
								id: 'userId',
								data: response.data['id'],
							},
							{
								type: 'text',
								id: 'name',
								data: response.data['name'],
							},
							{
								type: 'email',
								id: 'email',
								data: response.data['email'],
							},
							{
								type: 'password',
								id: 'password1',
								data: response.data['password'],
							},
							{
								type: 'password',
								id: 'password2',
								data: response.data['password'],
							},
						],
						submitValue: 'Готово',
						event: {
							type: 'submit',
							listener: changeUserProfile
						},
					},
				};
				(new ProfileComponent(application)).render(profile);
			} else {
				alert(response.errors[0].message);
			}
		});


}


function handleImageUpload() {
	let image = document.getElementById('upload').files[0];
	let reader = new FileReader();

	reader.onload = function (e) {
		image = document.getElementById('upload').files[0];
		document.getElementById('image').src = e.target.result;
	};
	reader.readAsDataURL(image);

}

function listen() {
	alert('В разработке');
}


function ajaxAddCafe(route, formData, callback) {

	let req = new Request(route, {
		method: 'POST',
		mode: 'cors',
		body: formData,
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

function addCafe(e) {
	e.preventDefault();
	const form = document.getElementsByClassName('cafeFormField').item(0);
	const photoInput = document.getElementById('upload');

	const name = form.elements['name'].value;
	const address = form.elements['address'].value;
	const description = form.elements['description'].value;

	const photo = photoInput.files[0];

	let formData = new FormData();
	formData.append('jsonData', JSON.stringify({
		'name': name.toString(),
		'address': address.toString(),
		'description': description.toString()
	}));

	if ( photo ){
		formData.append('photo', photo);
	}

	ajaxAddCafe('http://80.93.177.185:8080/api/v1/cafe',
		formData
		, (response) => {
			console.log('RESPONSE add cafe', response);
			if (response.errors === null) {
				alert('Кафе добавлено');
			} else {
				alert(response.errors[0].message);
			}
		});
}


export function createNewCafePage() {
	application.innerHTML = '';
	headerContainer.innerHTML = '';


	let cafe = {
		cafeName: 'Новое кафе',
		imgSrc: 'https://justwoman.club/wp-content/uploads/2017/12/photo.jpg',
		event: {
			type: 'change',
			listener: handleImageUpload
		},
		form: {
			formFields: [
				{
					type: 'text',
					id: 'name',
					data: 'Название',
				},
				{
					type: 'text',
					id: 'address',
					data: 'Адрес',
				},
				{
					type: 'text',
					id: 'description',
					data: 'Описание',
				},
			],
			submitValue: 'Готово',
			event: {
				type: 'submit',
				listener: addCafe
			},
		},
	};

	const headerElement = document.createElement('div');
	headerElement.className = 'header';
	headerContainer.appendChild(headerElement);
	(new HeaderComponent(headerElement)).render(headerData);

	const cafeElement = document.createElement('div');
	application.appendChild(cafeElement);
	(new CafeComponent(cafeElement)).render(cafe);

}

// let routes = [
// 	{
// 		url: '', callback: function () {
// 			// eslint-disable-next-line no-mixed-spaces-and-tabs
// 			//application.innerHTML = 'Тут будет стартовая страница /reg - регистрация /login - авторизация';
// 		}
// 	}
// ];


// function getUrl(href) {
// 	const url = href.split('/');
// 	return url[url.length - 1];
// }

// function Routing() {
// 	let href = window.location.href;
// 	console.log(href);
// 	let url = getUrl(href);
// 	let route = routes[0];
// 	routes.forEach(item => {
// 		if (url === item.url) {
// 			route = item;
// 		}
// 	});
// 	route.callback();
// }

application.innerHTML = '';
headerContainer.innerHTML = '';
const headerElement = document.createElement('div');
headerElement.className = 'header';
headerContainer.appendChild(headerElement);
(new HeaderComponent(headerElement)).render(loginHeaderData);
application.appendChild(renderLogin());


// window.addEventListener('popstate', Routing);
//
// setTimeout(Routing, 0);
//
//
// routes.push({
//
// 	url: 'reg', callback: () => {
// 		application.innerHTML = '';
// 		headerContainer.innerHTML = '';
// 		const headerElement = document.createElement('div');
// 		headerElement.className = 'header';
// 		headerContainer.appendChild(headerElement);
// 		(new HeaderComponent(headerElement)).render(regHeaderData);
// 		application.appendChild(renderRegister());
// 	}
// });
// routes.push({
// 	url: 'login', callback: () => {
// 		application.innerHTML = '';
// 		headerContainer.innerHTML = '';
// 		const headerElement = document.createElement('div');
// 		headerElement.className = 'header';
// 		headerContainer.appendChild(headerElement);
// 		(new HeaderComponent(headerElement)).render(loginHeaderData);
// 		application.appendChild(renderLogin());
//
// 	}
// });
//
// routes.push({
// 	url: 'myCafes', callback: () => {
// 		console.log('hello');
// 		application.innerHTML = '';
// 		createMyCafesPage();
// 	}
// });
//
// routes.push({
// 	url: 'myProfile', callback: () => {
// 		application.innerHTML = '';
// 		createUserProfilePage();
// 	}
// });
// routes.push({
// 	url: 'newCafe', callback: () => {
// 		application.innerHTML = '';
// 		createNewCafePage();
// 	}
// });
//
