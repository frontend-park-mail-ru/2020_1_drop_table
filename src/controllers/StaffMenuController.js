'use strict';


import {authAjax} from '../utils/authAjax';
import {constants} from '../utils/constants';

import {CoffeeCup} from '../components/StaffMenuComponents/CoffeeCup/CoffeeCup';
import {Cashback} from '../components/StaffMenuComponents/Cashback/Cashback';
import {Discounts} from '../components/StaffMenuComponents/Discounts/Discounts';

import NotificationComponent from '../components/Notification/Notification';

/** контроллер меню работников */
export default class StaffMenuController{

    /**
     * Инициализация StaffMenuController
     * @param {StaffMenuView} staffMenuView view меню работников
     */
    constructor(staffMenuView, uuid) {
        this._staffMenuView = staffMenuView;
        this._uuid = uuid;
        this._customerData = null;
    }
    _makeViewContext(){
        console.log('make view context');
        switch(this._customerData.type){
        case 'coffee_cup':
            this._customerData.Component = CoffeeCup;
            this._customerData.events = [
                {
                    object: 'buttonFlex__plus',
                    listener: this.coffeeCupPointPlus
                },
                {
                    object: 'buttonFlex__minus',
                    listener: this.coffeeCupPointMinus
                },
            ]
            break;

        case 'cashback':
            this._customerData.Component = Cashback;
            this._customerData.events = [
                {
                    object: 'buttonFlex__plus',
                    listener: this.cashbackSetPoints
                },
            ]
            break;
        case 'percents':
            this._customerData.Component = Discounts;
            this._customerData.events = [
                {
                    object: 'buttonFlex__plus',
                    listener: this.discountPurchase
                },
            ];
            break;

        case 'coupon':
            break;

        }
    }

    /** Запуск контроллера */
    async control(){
        console.log('do staff menu control');
        await this.getCustomerData();
        this._makeViewContext();
        console.log('do staff menu control', this._customerData)
        this._staffMenuView.render(this._customerData);
    }

    async getCustomerData(){
        await authAjax('GET', `${constants.PATH}/api/v1/customers/${this._uuid}/customer/`, {}, (response) => {
            console.log('response data', response.data);
            if (response.errors === null) {
                console.log('get customer', response.data);
                this._customerData = response.data;
            } else {
                console.log('error', response)
                throw response.errors;
            }
        });
    }



    coffeeCupPointPlus() {
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,
            {'coffee_cups':Number(this.points + 1)}, (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Успешно')).render();
                    this.loadCoffeeCups()
                } else {
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }
    coffeeCupPointMinus() {
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,
            {'coffee_cups':Number(this.points - 1)}, (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Успешно')).render();
                    this.loadCoffeeCups()
                } else {
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }
    coffeeCupPointMinusStack() {
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,
            {'coffee_cups':Number(this.points - this.stack)}, (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Успешно')).render();
                    this.loadCoffeeCups()
                } else {
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }


    loadCoffeeCups() {
        authAjax('GET', `${constants.PATH}/api/v1/customers/${this.token}/points/`,
            null, (response) => {
                if (response.errors === null) {
                    this.points = Number(JSON.parse(response.data).coffee_cups);
                    document.getElementById('label').innerHTML = '☕️'.repeat(
                        this.points  % this.stack);
                    let e = document.getElementById('stacks');
                    let child = e.lastElementChild;
                    while (child) {
                        e.removeChild(child);
                        child = e.lastElementChild;
                    }
                    for (let i = 0; i < Math.floor(this.points / this.stack); i++) {
                        let btn = document.createElement('button');
                        let t = document.createTextNode('☕️');
                        btn.addEventListener('click', this.coffeeCupPointMinusStack);
                        btn.appendChild(t);
                        btn.className = 'stackCoffeeButton';
                        document.getElementById('stacks').appendChild(btn);
                    }
                } else {
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }


    discountPurchase() {
        let purchaseInput = this._el.getElementsByClassName('main__input-field_input').item(0)
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,
            {'new_purchases':Number(purchaseInput.value)}, (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Успешно')).render();
                } else {
                    console.log(response.errors);
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }


    cashbackSetPoints() {
        let purchaseInput = this._el.getElementsByClassName('main__input-field_input').item(0)
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,
            {'points_count':Number(purchaseInput.value)}, (response) => {
                if (response.errors === null) {
                    (new NotificationComponent('Успешно')).render();
                } else {
                    console.log(response.errors);
                    (new NotificationComponent('Ошибка')).render();
                    throw response.errors;
                }
            });
    }



}
