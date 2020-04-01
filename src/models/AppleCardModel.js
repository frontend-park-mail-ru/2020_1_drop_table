'use strict';

import {uuid} from "../utils/uuid";
import {CardField} from "./CardField.js";
import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import {ajaxForm} from "../utils/ajaxForm";
import {AppleCardQrWindowComponent} from "../components/AppleCardQrWindow/AppleCardQrWindow";

export class AppleCardModel {


    constructor(cafeId) {
        this._cafeId = cafeId;
        this._icon = null;
        this._strip = null;
        this._organizationName = null;
        this._description = null;
        this._labelColor = null;
        this._logoText = null;
        this._foregroundColor = null;
        this._backgroundColor = null;
        this._backFields = [];
        this._storeCard = {
            'headerFields': [],
            'primaryFields': [],
            'secondaryFields': [],
            'auxiliaryFields': [],
        };

        this._minDesign = `{
        "barcode": {"format": "PKBarcodeFormatQR",
     "message": "db64999a-d280-4b5f-895c-038cf92c1ab2",
      "messageEncoding": "iso-8859-1"},
       "logoText": "Это",
        "locations": [{"latitude": 37.6189722, "longitude": -122.3748889}, {"latitude": 37.33182, "longitude": -122.03118}],
         "storeCard": {
         "headerFields": [{"key": "_676325044", "label": "твоя", "value": "классная"}],
          "primaryFields": [{"key": "_768436380", "label": "Попробуй", "value": "карточка"}],
          "secondaryFields": [{"key": "_768436380", "label": "отредактировать", "value": "её"}]
          },
           "backFields": [], "labelColor": "rgb(0, 0, 0)", "description": "descr", "serialNumber": "ART",
            "formatVersion": 1, "webServiceURL": "https://example.com/passes/", "teamIdentifier": "WSULUSUQ63",
             "backgroundColor": "rgb(30, 118, 143)", "foregroundColor": "rgb(0, 0, 0)",
              "organizationName": "org", "passTypeIdentifier": "pass.com.ssoboy",
               "authenticationToken": "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc"}`;

    };



    get context() {
        return new Promise(async (resolve) => {
            await this.getCard();
            const cafeCard = sessionStorage.getItem(`card ${this._cafeId}`);
            if (cafeCard) {
                resolve(JSON.parse(cafeCard));
            }
            resolve(null);
        });
    }

    set context(context) {

    }

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
        console.log('json test', this._storeCard['headerFields']);
        let json = {

            "formatVersion": 1,
            "passTypeIdentifier": "pass.com.ssoboy",
            "serialNumber": "ART",
            "teamIdentifier": "WSULUSUQ63",
            "webServiceURL": "https://example.com/passes/",
            "authenticationToken": "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc",
            "barcode": {
                "message": "db64999a-d280-4b5f-895c-038cf92c1ab2",
                "format": "PKBarcodeFormatQR",
                "messageEncoding": "iso-8859-1"
            },
            "locations": [
                {
                    "longitude": -122.3748889,
                    "latitude": 37.6189722
                },
                {
                    "longitude": -122.03118,
                    "latitude": 37.33182
                }
            ],


            "organizationName": this._organizationName,
            "description": this._description,
            "labelColor": this._labelColor,
            "logoText": (this._storeCard['headerFields'][0] !== undefined)?this._storeCard['headerFields'][0]._label:'',
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
            stripImageSrc: this._strip,
            logoImageSrc: this._icon,
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

        for (let i = 0; i < this._storeCard['headerFields'].length; i++) {
            let field;
            if (i === 0) {
                field = this._storeCard['headerFields'][i].getAsFormData(undefined, true);
            } else {
                field = this._storeCard['headerFields'][i].getAsFormData(i - 1, false);
            }
            fd.headerFields.push(field);
        }

        for (let i = 0; i < this._storeCard['primaryFields'].length; i++) {
            let field = this._storeCard['primaryFields'][i].getAsFormData(i, false);
            fd.primaryFields.push(field);
        }
        for (let i = 0; i < this._storeCard['secondaryFields'].length; i++) {
            let field = this._storeCard['secondaryFields'][i].getAsFormData(i, false);
            fd.secondaryFields.push(field);
        }
        return fd;
    }

    pushField(fieldType) {
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

    removeField(fieldType, id) {
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
                            this._storeCard.secondaryFields[i].value = text;
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

    _fillStoreCardByDesign(design){

        // логотекст считаем за 0 хедер поле
        this._storeCard.headerFields.push(new CardField({
            'fieldType': 'HeaderField',
            'key': uuid(),
            'label': design.logoText,
            'value': 'valueH'
        }));

        //заполняем хедер филды
        if( !design.storeCard.headerFields ){
            this._storeCard.headerFields.push(new CardField({
                'fieldType': 'HeaderField',
                'key': uuid(),
                'label': '',
                'value': ''
            }));
        } else {
            console.log('Has HeaderFields');
            design.storeCard.headerFields.forEach((headerField)=>{
                this._storeCard.headerFields.push(new CardField({
                    'fieldType': 'HeaderField',
                    'key': uuid(),
                    'label': headerField.label,
                    'value': headerField.value,
                }));
            })
        }
        if( !design.storeCard.primaryFields ){
            this._storeCard.primaryFields.push(new CardField({
                'fieldType': 'PrimaryField',
                'key': uuid(),
                'label': '',
                'value': ''
            }));
        } else {
            design.storeCard.primaryFields.forEach((primaryField)=>{
                this._storeCard.primaryFields.push(new CardField({
                'fieldType': 'PrimaryField',
                'key': uuid(),
                'label': primaryField.label,
                'value': primaryField.value
            }));
            })
        }

        if( !design.storeCard.secondaryFields ){
            this._storeCard.secondaryFields.push(new CardField({
                'fieldType': 'SecondaryField',
                'key': uuid(),
                'label': '',
                'value': ''
            }));
        } else {
            design.storeCard.secondaryFields.forEach((secondaryField)=>{
                this._storeCard.secondaryFields.push(new CardField({
                    'fieldType': 'SecondaryField',
                    'key': uuid(),
                    'label': secondaryField.label,
                    'value': secondaryField.value
                }));
            })
        }




    }
    _fillCardData(context){

        const jsonDesign =  (context.design !=='' )?context.design: this._minDesign;
        const design =  JSON.parse(jsonDesign);

        this._icon = context.icon;
        this._strip = context.strip;

        console.log('icon ',context.icon);

        this._organizationName = design.organizationName;
        this._description = design.description;;
        this._labelColor = design.labelColor;
        this._logoText = design.logoText;
        this._foregroundColor = design.foregroundColor;
        this._backgroundColor = design.backgroundColor;
        this._backFields = [];
        this._storeCard = {
            'headerFields': [],
            'primaryFields': [],
            'secondaryFields': [],
            'auxiliaryFields': [],
        };
        this._fillStoreCardByDesign(design);
    }

    async getCard() {
        await ajax(constants.PATH + `/api/v1/cafe/${this._cafeId}/apple_pass?published=true&design_only=true`,
            'GET',
            {},
            (response) => {
                if (response.data == null) {
                    console.log('null data: ', response.data);
                    this._fillCardData({design: this._minDesign});
                    //router._goTo('/createCafe');
                } else {
                    if (response.errors === null) {
                       this._fillCardData(response.data);
                    } else {
                        throw response.errors;
                    }
                }
            }
        )
    }

    async _makeFormData(images) {
        let formData = new FormData();
        const data = this.getAsJson();
        formData.append('jsonData', JSON.stringify(data));
        if (images) {
            formData.append('icon.png',(images['icon.png'])?images['icon.png']:this._icon) ;
            formData.append('icon@2x.png',(images['icon@2x.png'])?images['icon@2x.png']:this._icon);
            formData.append('logo.png',(images['logo.png'])?images['logo.png']:this._icon );
            formData.append('logo@2x.png',(images['logo@2x.png'])?images['logo@2x.png']:this._icon);
            formData.append('strip.png',(images['strip.png'])?images['strip.png']:this._strip  );
            formData.append('strip@2x.png',(images['strip@2x.png'])?images['strip@2x.png']:this._strip);
        }

        return formData;
    }


    async editCard(images, publish) {
        const formData = await this._makeFormData(images);

        await ajaxForm(constants.PATH + `/api/v1/cafe/${this._cafeId}/apple_pass?publish=${publish.toString()}`, //todo make await
            'PUT',
            formData,
            (response) => {
                if (response.errors === null) {
                    console.log('editCard success', response);
                    if(response.data['QR'] && response.data['URL'] && publish){
                        console.log('window component');
                        (new AppleCardQrWindowComponent( response.data['URL'], response.data['QR'])).render();
                    }
                    // this._filUserData(response.data);
                    // this._saveUser();
                } else {
                    console.log('error ', response.errors);
                    throw response.errors;
                }
            }
        );

    }
}

