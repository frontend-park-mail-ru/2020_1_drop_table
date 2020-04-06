import {uuid} from "../utils/uuid";
import InputComponent from '../components/Input/Input'
import {AppleCardModel} from "./AppleCardModel";

/** Модель карточки */
export class CardField{

    /**
     * Инициализация модели карточки
     * @param {obj} cardFieldData контекст карточки
     */
    constructor(cardFieldData){
        this._id = uuid();
        this._fieldType = cardFieldData.fieldType;
        this._key = uuid();
        this._label = cardFieldData.label ? cardFieldData.label: 'label' ;
        this._value = cardFieldData.value ? cardFieldData.value : 'value';
    }

    /**
     * Получить uuid
     * @return {string} uuid
     */
    get key() {
        return this._key;
    }

    /**
     * Установить uuid
     * @param {string} value uuid
     */
    set key(value) {
        this._key = value;
    }

    /**
     * Получить label карточки
     * @return {obj.label|string}
     */
    get label() {
        return this._label;
    }

    /**
     * Установить label карточки
     * @param value
     */
    set label(value) {
        this._label = value;
    }

    /**
     * Получить значение карточки
     * @return {obj.value|string|}
     */
    get value() {
        return this._value;
    }

    /**
     * Установить значение карточки
     * @param {obj.value|string|} value значение карточки
     */
    set value(value) {
        this._value = value;
    }

    /**
     * получить карточку ка json
     * @return {obj}
     */
    getAsJson(){
        return {
            "key" : this._key,
            "label" : this._label,
            "value" : this._value
        }
    }

    /**
     * Установить значение полей карточки
     * @param {obj} cardFieldData контекст карточки
     */
    set(cardFieldData){
        this._key = cardFieldData.key;
        this._label = cardFieldData.label;
        this._value = cardFieldData.value;
    }

    /**
     * Возвращает карточку как FromData
     * @param i
     * @param inputOnly
     * @return {FormData}
     */
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
