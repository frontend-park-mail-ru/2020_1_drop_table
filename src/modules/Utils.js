/** Утилиты для router */
class Utils {

    /**
     * Проверка на строку
     * @param variable значение
     * @return {boolean} результат проверки на строку
     */
    isString(variable){
        return Object.prototype.toString.call(variable) === '[object String]';
    }


    /**
     * Проверка на число
     * @param variable значение
     * @return {boolean} результат проверки на число
     */
    isNumber(variable){
        return Object.prototype.toString.call(variable) === '[object Number]';
    }

    /**
     * Проверка на регулярное выражение
     * @param variable значение
     * @return {boolean} результат проверки на регулярное выражение
     */
    isRegExp(variable){
        return Object.prototype.toString.call(variable) === '[object RegExp]';
    }

    /**
     * Проверка на массив
     * @param variable значение
     * @return {boolean} результат проверки на массив
     */

    isArray(variable){
        return Object.prototype.toString.call(variable) === '[object Array]';
    }

    /**
     * Проверка на объект
     * @param variable значение
     * @return {boolean} результат проверки на объект
     */
    isObject(variable){
        return Object.prototype.toString.call(variable) === '[object Object]';
    }

    /**
     * Проверка на функцию
     * @param variable значение
     * @return {boolean} результат проверки на функцию
     */
    isFunction(variable){
        return Object.prototype.toString.call(variable) === '[object Function]';
    }

    /**
     * Проверка на логическое значение
     * @param variable значение
     * @return {boolean} результат проверки на логическое значение
     */
    isBoolean(variable){
        return Object.prototype.toString.call(variable) === '[object Boolean]';
    }

    /**
     * Проверка на null
     * @param variable значение
     * @return {boolean} результат проверки на null
     */
    isNull(variable){
        return Object.prototype.toString.call(variable) === '[object Null]';
    }

    /**
     * Проверка на undefined
     * @param variable значение
     * @return {boolean} результат проверки на undefined
     */
    isUndefined(variable){
        return Object.prototype.toString.call(variable) === '[object Undefined]';
    }

    /**
     * Проверка на пустоту
     * @param variable значение
     * @return {boolean} результат проверки на пустоту
     */
    isEmpty (variable){
        return this.isUndefined(variable) || this.isNull(variable) || variable === 0 || variable === false || ((this.isString(variable) || this.isArray(variable)) && variable.length === 0) || (this.isObject(variable) && Object.getOwnPropertyNames(variable).length === 0);
    }

    /**
     * Проверка на установленность значения
     * @param variable значение
     * @return {boolean} результат проверки на установленность значения
     */
    isSet(variable){
        return !this.isUndefined(variable) && !this.isNull(variable);
    }
}
Utils = new Utils();

/**
 * Проверка отсутствие аргументов
 * @param {string} argName имя аргумента
 * @return {Error} instance результат проверки на строку
 */
export function ArgumentNotFoundError(argName){
    let name = 'ArgumentNotFoundError';
    let message = Utils.isSet(argName) ? `${argName} argument is required. None found` : 'Required argument was not found';
    let instance = new Error(message);
    instance.name = name;
    instance.message = message;
    instance.toString = function(){
        return instance.message;
    };
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace){
        Error.captureStackTrace(instance, ArgumentNotFoundError);
    }
    return instance;
}

/**
 * Проверка аргумента на требуемый тип
 * @param {string} argName argName имя аргумента
 * @param {string} argType тип аргумента
 * @param argValue значение аргумента
 * @return {Error} instance результат проверки
 */
export function ArgumentTypeError(argName, argType, argValue){
    argType = Utils.isSet(argType) ? argType.toString() : typeof argType;
    let name = 'ArgumentTypeError';
    let message = Utils.isSet(argName) ? `typeof ${argName.toString()} argument must be equal to ${argType}. ${typeof argValue} found.` : 'Invalid argument type found';
    let instance = new Error(message);
    instance.name = name;
    instance.message = message;
    instance.toString = function(){
        return this.message;
    };
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace){
        Error.captureStackTrace(instance, ArgumentTypeError);
    }
    return instance;
}

/** Ошибка аргумент не найден */
ArgumentNotFoundError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

/** Ошибка неверный ти аргумента */
ArgumentTypeError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

if (Object.setPrototypeOf){
    Object.setPrototypeOf(ArgumentNotFoundError, Error);
    Object.setPrototypeOf(ArgumentTypeError, Error);
} else {
    ArgumentNotFoundError.__proto__ = Error;
    ArgumentTypeError.__proto__ = Error;
}

var KEYS = [];
var QUERIES = [];
var QUERY_STRING = '';
var HISTORY_MODE;

const DECODE = value=>{
    return decodeURIComponent(value);
}
const DECODE_KEY = key=>{
    return decodeURIComponent(key.split(' ').join(''));
}
const GET_PARAM = (key, index = null) =>{
    let param = null;
    if(index){
        param = QUERIES[index][key];
    } else {
        QUERIES.some(query=>{
            if(query.hasOwnProperty(key)) return param = query[key];
        });
    }
    return param;
}



class QueryParams {

    constructor(url = null, historyMode = false){
        QUERY_STRING = url ? url : window.location.search;
        HISTORY_MODE = window.PopStateEvent && 'pushState' in window.history ? historyMode : false;
        if(HISTORY_MODE){
            window.addEventListener('popstate', (e)=>{
                let event = e.currentTarget;
                QUERY_STRING = event.location.search;
                KEYS = [];
                QUERIES = [];
                return this.init(); // re run this class again
            });
        }
        this.init();
    }

    init(){
        if (QUERY_STRING) {
            let queryArray = QUERY_STRING.slice(1).split('&');
            queryArray.forEach(query=>{
                query = query.split('=');
                KEYS.push(DECODE_KEY(query[0]));
                let obj = {};
                obj[DECODE_KEY(query[0])] = query.length > 1 ? DECODE(query[1]) : true; // return true if search query has no value
                QUERIES.push(obj);
            }, this);
        }
    }


    has(key){
        key = DECODE_KEY(key);
        return KEYS.length > 0 && GET_PARAM(key) ? true : false;
    }

    get(key){
        key = DECODE_KEY(key);
        return this.has(key) ? GET_PARAM(key) : null;
    }


    toString (){
        let string = '';
        if(QUERY_STRING){
            string = '?';
            KEYS.forEach((key, index)=>{
                let value = GET_PARAM(key, index) === true ? '' : `=${GET_PARAM(key, index)}`;
                let newString = index === 0 ? key + value : `&${key + value}`;
                string += newString;
            });
        }
        return string;
    }


    set(key, value){
        if(!Utils.isSet(key)) throw new ArgNotFound('key');
        key = DECODE_KEY(key);
        value = Utils.isSet(value) ? DECODE(value) : true;
        QUERY_STRING = QUERY_STRING ? QUERY_STRING : true;
        let index = KEYS.indexOf(key);
        if(index !== -1) {
            KEYS[index] = key; // replace the key if it exists else append new key
            QUERIES[index] = {
                [key]: value
            }
        } else {
            index = KEYS.push(key) - 1;
            QUERIES[index] = {
                [key]: value
            }
        }

        QUERY_STRING = QUERY_STRING ? this.toString() : true;
        if(HISTORY_MODE){
            window.history.pushState('', '', this.toString());
        }
        return GET_PARAM(key, index);
    }



}

export {Utils, QueryParams};
