'use strict';

import './login.css';
import LoginTemplate from './login.hbs';

import DecoratorComponent from '../decorator/decorator.js';
import Form from '../form/form.js';

export default class LoginComponent {

	constructor(parent = document.body) {
		this._parent = parent;
		this._form = new Form;
		this._decorator = new DecoratorComponent;
	}

	renderLogin(context){
		this._parent.innerHTML = LoginTemplate(context);

		let formCollection = document.getElementsByClassName('formField');
		this._form = new Form(formCollection.item(0));

		let decoratorCollection = document.getElementsByClassName('decorateContainer');
		this._decorator = new DecoratorComponent(decoratorCollection.item(0));
	}

	renderForm(context){
		this._form.render(context);
	}

	renderDecorator(context){
		this._decorator.render(context);
	}

	render(context) {
		this.renderLogin(context['login']);
		this.renderForm(context['form']);
		this.renderDecorator(context['decorator']);
	}
}
