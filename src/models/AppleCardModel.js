'use strict';

import {uuid} from "../utils/uuid";
import {CardField} from "./CardField.js";

export class AppleCardModel {

    constructor() {
        this._organizationName = 'org';
        this._description = 'descr';
        this._labelColor = 'rgb(0, 0, 0)';
        this._logoText = 'test';
        this._foregroundColor = 'rgb(0, 0, 0)';
        this._backgroundColor = 'rgb(252, 255, 254)';
        this._backFields = [];
        this._storeCard = {
            'headerFields': [],
            'primaryFields': [],
            'secondaryFields': [],
            'auxiliaryFields': [],
        };

        this._storeCard.headerFields.push(new CardField({
            'fieldType': 'HeaderField',
            'key': uuid(),
            'label': 'labelH',
            'value': 'valueH'
        }));
        this._storeCard.headerFields.push(new CardField({
            'fieldType': 'HeaderField',
            'key': uuid(),
            'label': 'labelH',
            'value': 'valueH'
        }));

        this._storeCard.primaryFields.push(new CardField({
            'fieldType': 'PrimaryField',
            'key': uuid(),
            'label': 'label1',
            'value': 'value1'
        }));
        this._storeCard.secondaryFields.push(new CardField({
            'fieldType': 'SecondaryField',
            'key': uuid(),
            'label': 'label1',
            'value': 'value1'
        }));
        this._storeCard.secondaryFields.push(new CardField({
            'fieldType': 'SecondaryField',
            'key': uuid(),
            'label': 'label2',
            'value': 'value2'
        }));
        // this._storeCard.auxiliaryFields.push(new CardField({
        //     'fieldType': 'AuxiliaryField',
        //     'key': uuid(),
        //     'label': 'label1',
        //     'value': 'value1'
        // }));
    };

    // constructor(appleCardData){
    //     this._organizationName =  appleCardData['organizationName'];
    //     this._description =  appleCardData['description'];
    //     this._labelColor = appleCardData['labelColor'];
    //     this._logoText = appleCardData['logoText'];
    //     this._foregroundColor = appleCardData['foregroundColor'];
    //     this._backgroundColor = appleCardData['backgroundColor'];
    //     this._headerFields = appleCardData['headerFields'];
    //     this._backFields = appleCardData['backFields'];
    //     this._storeCard = appleCardData['storeCard'];
    // }

    get organizationName() {
        return this._organizationName;
    }

    set organizationName(value) {
        this._organizationName = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get labelColor() {
        return this._labelColor;
    }

    set labelColor(value) {
        this._labelColor = value;
    }

    get logoText() {
        return this._logoText;
    }

    set logoText(value) {
        this._logoText = value;
    }

    get foregroundColor() {
        return this._foregroundColor;
    }

    set foregroundColor(value) {
        this._foregroundColor = value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    set backgroundColor(value) {
        this._backgroundColor = value;
    }

    get headerFields() {
        return this._headerFields;
    }

    set headerFields(value) {
        this._headerFields = value;
    }

    removeFieldByTypeAndId(type, id) {
        this._storeCard[type] = this._storeCard[type].filter(field => field._id !== id);
    }

    getAsJson() {
        let json = {
            "organizationName": this._organizationName,
            "description": this._description,
            "labelColor": this._labelColor,
            "logoText": this._storeCard['headerFields'][0]._label,
            "foregroundColor": this._foregroundColor,
            "backgroundColor": this._backgroundColor,
            "backFields": [],
            "storeCard": {
                "headerFields": [],
                "primaryFields": [],
                "secondaryFields": [],
                "auxiliaryFields": [],
            }
        };


        this._storeCard['headerFields'].slice(1, this._storeCard['headerFields'].length).forEach(field => {
           json.storeCard.headerFields.push(field.getAsJson())
        });

        this._storeCard['primaryFields'].forEach(field => {
            json.storeCard.primaryFields.push(field.getAsJson())
        });
        this._storeCard['secondaryFields'].forEach(field => {
            json.storeCard.secondaryFields.push(field.getAsJson())
        });
        this._storeCard['auxiliaryFields'].forEach(field => {
            json.storeCard.auxiliaryFields.push(field.getAsJson())
        });

        return json;
    }

    getAsFormData() {
        let fd = {
            stripImageSrc: 'https://sun9-12.userapi.com/c853624/v853624246/1f694a/E7zRrtbvTc0.jpg',
            logoImageSrc: 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
            qrCodeImageSrc: 'https://sun9-66.userapi.com/c853624/v853624565/1f56ee/O8_4ZwO3xXY.jpg',
            logoText: this._logoText,

            backgroundColor: this._backgroundColor,
            foregroundColor: this._foregroundColor,
            labelColor: this._labelColor,
            headerFields: [],
            primaryFields: [],
            secondaryFields: [],
            auxiliaryFields: [],
        };


        // let field = this._headerFields[0].getAsFormData(undefined, true);
        // fd.headerFields.push(field);


        for (let i = 0; i < this._storeCard['headerFields'].length; i++) {
            let field;
            if(i === 0){
                field = this._storeCard['headerFields'][i].getAsFormData(undefined, true);
            }
            else{
                field = this._storeCard['headerFields'][i].getAsFormData(i-1, false);
            }

            fd.headerFields.push(field);

            // let field = this._storeCard['primaryFields'][i].getAsFormData(i, false);
            // fd.primaryFields.push(field);

        }

        for (let i = 0; i < this._storeCard['primaryFields'].length; i++) {
            let field = this._storeCard['primaryFields'][i].getAsFormData(i, false);
            fd.primaryFields.push(field);

        }
        for (let i = 0; i < this._storeCard['secondaryFields'].length; i++) {
            let field = this._storeCard['secondaryFields'][i].getAsFormData(i,false);
            fd.secondaryFields.push(field);
        }
        // for (let i = 0; i < this._storeCard['auxiliaryFields'].length; i++) {
        //     let field = this._storeCard['auxiliaryFields'][i].getAsFormData(i, false);
        //     fd.auxiliaryFields.push(field);
        // }
        return fd;
    }

    pushField(fieldType){
        switch (fieldType) {
            case 'HeaderField':
                this._storeCard.headerFields.push(new CardField({'fieldType': 'HeaderField'}));
                break;

            case 'PrimaryField':
                this._storeCard.primaryFields.push(new CardField({'fieldType': 'PrimaryField'}));
                break;

            case 'SecondaryField':
                this._storeCard.secondaryFields.push(new CardField({'fieldType': 'SecondaryField'}));
                break;

            case 'AuxiliaryField':
                this._storeCard.auxiliaryFields.push(new CardField({'fieldType': 'AuxiliaryField'}));
                break;

        }
    }
    removeField(fieldType, id){
        switch (fieldType) {
            case 'HeaderField':
                this.removeFieldByTypeAndId('headerFields', id);
                break;
            case 'PrimaryField':
                this.removeFieldByTypeAndId('primaryFields', id);
                break;
            case 'SecondaryField':
                this.removeFieldByTypeAndId('secondaryFields', id);
                break;
            case 'AuxiliaryField':
                this.removeFieldByTypeAndId('auxiliaryFields', id);
                break;
        }
    }
    changeField(fieldType, id, type, text) {
        switch (fieldType) {
            case 'HeaderField':
                for (let i = 0; i < this._storeCard.headerFields.length; i++) {
                    if (this._storeCard.headerFields[i]._id === id) {
                        if (type === 'labelField') {
                            this._storeCard.headerFields[i].label = text;
                        } else if (type === 'valueField') {
                            this._storeCard.headerFields[i].value = text;
                        }
                    }
                }
                break;
            case 'PrimaryField':
                for (let i = 0; i < this._storeCard.primaryFields.length; i++) {
                    if (this._storeCard.primaryFields[i]._id === id) {
                        if (type === 'labelField') {
                            this._storeCard.primaryFields[i].label = text;
                        } else if (type === 'valueField') {
                            this._storeCard.primaryFields[i].value = text;
                        }
                    }
                }
                break;

            case 'SecondaryField':
                for (let i = 0; i < this._storeCard.secondaryFields.length; i++) {
                    if (this._storeCard.secondaryFields[i]._id === id) {
                        if (type === 'labelField') {
                            this._storeCard.secondaryFields[i].label = text;
                        } else if (type === 'valueField') {
                            this._storeCard.secondaryFields[i].value = text ;
                        }
                    }
                }
                break;

            case 'AuxiliaryField':
                for (let i = 0; i < this._storeCard.auxiliaryFields.length; i++) {
                    if (this._storeCard.auxiliaryFields[i]._id === id) {
                        if (type === 'labelField') {
                            this._storeCard.auxiliaryFields[i].label = text;
                        } else if (type === 'valueField') {
                            this._storeCard.auxiliaryFields[i].value = text;
                        }
                    }
                }
                break;
        }

    }

}

