'use strict';

import registerTemplate from './registerTopBar.hbs';
import './styles.css';
import registerFormTemplate from './registerForm.hbs';

import {createNewCafePage} from '../../main/main';

function ajax(route, body, callback) {
	let formData = new FormData();
	formData.append('jsonData', JSON.stringify(body));
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


function showError(whereToInsert, inWitchElement, message) {
	const error = document.createElement('div');
	error.className = 'error';
	error.textContent = message;
	whereToInsert.insertBefore(error, inWitchElement.parentNode);

}


function validateForm(form) {
	let errors = form.querySelectorAll('.error');
	for (let err of errors) {
		err.outerHTML = '';                     //Очистка старых ошибок
	}
	const email = form.elements['email'];
	const repeatedPassword = form.elements['re-password'];
	const password = form.elements['password'];
	let isCorrect = true;

	if (!email.validity.valid || email.value === '') {
		showError(form, email, 'Некорректный email');
		isCorrect = false;
	}
	if (password.value !== repeatedPassword.value) {
		showError(form, repeatedPassword, 'Пароли не совпадают');
		isCorrect = false;
	}
	if (password.value === '') {
		showError(form, password, 'Некорректный пароль');
		isCorrect = false;
	}
	return isCorrect;

}


export function renderRegister() {

	let registerContainer = document.createElement('div');
	registerContainer.className = 'registerContainer';
	let topBar = document.createElement('div');
	topBar.className = 'decorateContainer';
	topBar.innerHTML = registerTemplate({name: 'Регистрация'});
	registerContainer.appendChild(topBar);

	let form = document.createElement('div');
	form.className = 'formContainer';
	form.innerHTML = registerFormTemplate({
		name: 'Имя',
		email: 'Почта',
		password: 'Пароль',
		repeatedPassword: 'Повторите пароль',
	});
	registerContainer.appendChild(form);
	form = form.firstElementChild;
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		validateForm(form);
		const email = form.elements['email'].value;
		const password = form.elements['password'].value;
		const name = form.elements['full-name'].value;
		ajax('http://localhost:8080/api/v1/owner',
			{'name': name.toString(), 'email': email.toString(), 'password': password.toString()}
			, (response) => {
				console.log('RESPONSE', response);
				if (response.errors === null) {
					createNewCafePage();
				} else {
					alert(response.errors[0].message);
				}
			});
	});
	return registerContainer;

}






