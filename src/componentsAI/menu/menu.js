'use strict';

import './menu.css';
import MenuTemplate from './menu.hbs';

export default class MenuComponent {

	constructor(parent = document.body) {
		this._parent = parent;
	}

	_addListeners(context){
		for (const elementContext of context['menuList']) {
			const element = document.getElementById(elementContext['id']);
			element.addEventListener(
				elementContext['event']['type'],
				elementContext['event']['listener']
			);
		}
	}

	render(context) {
		this._parent.innerHTML = MenuTemplate(context);
		this._addListeners(context);
	}
}
