'use strict';

import './profile.css'
import ProfileTemplate from "./profile.hbs";
import Form from '../form/form.js';

export default class ProfileComponent {

    constructor(parent = document.body) {
        this._parent = parent;
        this._form = new Form;
    }

    _addListener(context){
        const element = document.getElementById('upload');
        element.addEventListener(

            context['event']['type'],
            context['event']['listener']
        );
    }

    renderProfile(context){
        this._parent.innerHTML = ProfileTemplate(context);

        let formCollection = document.getElementsByClassName('formField');
        this._form = new Form(formCollection.item(0));
    }

    renderForm(context){
        this._form.render(context)
    }

    render(context) {
        this.renderProfile(context);
        this._addListener(context);
        this.renderForm(context["form"]);
    }
}
