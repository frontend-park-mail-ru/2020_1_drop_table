import {uuid} from "../utils/uuid";
import InputComponent from '../components/Input/Input'
import {AppleCardModel} from "./AppleCardModel";

export class CardField{

    constructor(cardFieldData){
        this._id = uuid();
        this._fieldType = cardFieldData.fieldType;
        this._key = uuid();
        this._label = cardFieldData.label ? cardFieldData.label: 'label' ;
        this._value = cardFieldData.value ? cardFieldData.value : 'value';
    }


    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }


    getAsJson(){
        return {
            "key" : this._key,
            "label" : this._label,
            "value" : this._value
        }
    }

    set(cardFieldData){
        this._key = cardFieldData.key;
        this._label = cardFieldData.label;
        this._value = cardFieldData.value;
    }


    getAsFormData(i, inputOnly){

        let data = {
            type: 'text',
            id: this._id,
            labelID: uuid(),
            fieldName: 'Header',
            labelData: 'ЛогоТекст',
            labelText: this._label,
            button: null,
            buttonsymbol: null,
        };

        if (!inputOnly){
            data = {
                type: 'text',
                id: this._id,
                labelID: uuid(),
                valueID: uuid(),

                fieldName: this._fieldType,
                labelData: 'Лейбл',
                valueData: 'Валуе',
                labelText: this._label,
                valueText: this._value,
                button: null,
                buttonsymbol: null,
            };
        }

        if( i < 1){
            data.button = 'Добавить';
            data.buttonsymbol = '+';
        } else if (i >= 1){
            data.button = 'Удалить';
            data.buttonsymbol = '-';
        }
        return data;
    }
}
