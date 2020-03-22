'use strict';

import {Router} from "../modules/Router";

export default class LoginController{

    constructor(userModel, loginView) {
        this._userModel = userModel;
        this._loginView = loginView;
    }

    _submitListener(e){
        e.preventDefault();
        const form = document.getElementsByClassName('formContainer').item(0).firstElementChild;
        this._userModel.email = form.elements['email'].value;
        this._userModel.password = form.elements['password'].value;
        this._userModel.login().then(()=>{}, (errorMessage) => alert(errorMessage)); //TODO
    }

    _registerListener(){
        Router.redirect('/reg')
    }

    _makeContext(){
        return {
            form:{
                event:{
                    type: 'submit',
                    listener: this._submitListener.bind(this)
                }
            },
            register:{
                event:{
                    type: 'click',
                    listener: this._registerListener
                }
            }
        }
    }

    control(){
        sessionStorage.clear();
        this._loginView.context = this._makeContext();
        this._loginView.render();
    }
}