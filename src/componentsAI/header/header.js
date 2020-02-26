'use strict';

import './header.css';
import MenuComponent from '../menu/menu.js';
import HeaderTemplate from '../header/header.hbs';

export default class HeaderComponent {

	constructor(parent = document.body) {
		this._parent = parent;
		this._menu = new MenuComponent;
	}

	renderHeader(context){
		this._parent.innerHTML = HeaderTemplate(context);
		let menuCollection = document.getElementsByClassName('menu');
		this._menu = new MenuComponent(menuCollection.item(0));
	}

	renderMenu(context){
		this._menu.render(context);
	}

	render(context) {
		this.renderHeader(context);
		this.renderMenu(context['menu']);
	}
}
