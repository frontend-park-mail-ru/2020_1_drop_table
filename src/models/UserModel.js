import {ajax} from "../modules/ajax";
import {constants} from "../utils/constants";
import {Router} from "../modules/Router";
import {showError} from "../modules/formValidator";

export default class User {

    static getUser() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    static _saveUser(name, password, email) {
        let obj = {
            "name": name,
            "password": password,
            "email": email
        };
        sessionStorage.setItem("user", JSON.stringify(obj));
    }

    static register(name, password, email) {
        return new Promise((resolve) => {
                ajax("POST",
                    constants.PATH + "/api/v1/owner",
                    {"name": name.toString(), "email": email.toString(), "password": password.toString()},
                    (response) => {
                        if (response.errors === null) {
                            this._saveUser(name, password, email);
                            Router.redirect("/myCafe");
                        } else {
                            resolve(response.errors[0].message);
                        }
                    }
                );
            }
        );
    }

    static login(email, password) {
        return new Promise((resolve) => {
            ajax("POST",
                constants.PATH + "/api/v1/owner/login",
                {"email": email.toString(), "password": password.toString()},
                (response) => {
                    if (response.errors === null) {
                        Router.redirect("/myCafe");
                    } else {
                        resolve(response.errors[0].message); // TODO проверить работу вызова ошибки при некорректном пользователе
                    }
                });
        });
    }
}