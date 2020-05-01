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
        switch(this._customerData.type){
        case 'coffee_cup':
            return{
                Component: CoffeeCup,
                events:[
                    {
                        object: document.getElementsByClassName('buttonFlex__plus').item(0),
                        listener: this.coffeeCupPointPlus
                    },
                    {
                        object: document.getElementsByClassName('buttonFlex__minus').item(0),
                        listener: this.coffeeCupPointMinus
                    },
                ]
            };
        case 'cashback':
            return{
                Component: Cashback,
                events:[
                    {
                        object: document.getElementsByClassName('buttonFlex__plus').item(0),
                        listener: this.cashbackSetPoints
                    },
                ]
            };
        case 'percents':
            return{
                Component: Discounts,
                events:[
                    {
                        object: document.getElementsByClassName('buttonFlex__plus').item(0),
                        listener: this.discountPurchase
                    },
                ]
            };
        case 'coupon':
            return{
                //component: couponComponent,
            };

        }
    }

    /** Запуск контроллера */
    async control(){
        await this.getCustomerData();
        this._staffMenuView.render(this._customerData);
    }

    async getCustomerData(){
        await authAjax('GET', `${constants.PATH}/api/v1/customers/${this._uuid}/customer/`, null, (response) => {
            console.log('response data', response.data);
            if (response.errors === null) {
                console.log('get customer', response.data);
                this._customerData = response.data;
            } else {
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
