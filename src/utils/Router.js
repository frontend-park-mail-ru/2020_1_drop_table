'use strict';

import {Utils, ArgumentNotFoundError as ArgNotFound, ArgumentTypeError as ArgTypeError, QueryParams} from './Utils.js';

class Router {
    constructor(){
        this.routes = [];
        this.path =  this._requestPath();

        let defOptions = {
            caseInsensitive: false,
            historyMode: true
        };
        let mergedOptions = {...defOptions};
        for(let key in mergedOptions){
            this[`_${key}`] = mergedOptions[key];
        }
        this._checkHistoryMode();
        this.query = new QueryParams(null, true);
        return this;
    }


    get(uri, callback, thisArg){
        thisArg = thisArg instanceof Router ? undefined : thisArg;
        let route = {
            uri: null,
            callback: null,
            thisArg: thisArg,
            parameters: null,
            regExp: null,
            name: null,
            current: false
        }
        if(this._caseInsensitive) {
            uri = uri.toLowerCase()
        }
        uri = uri.startsWith('/') ? uri : `/${uri}`;
        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`Conflicting routes. The route uri ${route.uri} already exists`);
        });

        route.uri = uri;
        route.callback = callback;
        route.parameters = this._proccessParameters(route.uri);

        this.routes.push(route);
        return this;
    }

    init(){
        this.routes.forEach((route)=>{
            this._proccessRegExp(route);
        }, this);

        let found = false;
        let routerObj = {
            goTo: (url, data, title)=>{
                return this._goTo(url, data, title);
            },
            historyMode: true
        };



        this.routes.some((route)=>{

            if(this._requestPath().match(route.regExp)) {


                route.current = true;
                found = true;
                let request = {};
                request.param = this._processRequestParameters(route);
                request.query = this.query;
                request.uri = window.location.pathname;

                return route.callback.call(route.thisArg, request, routerObj);
            }
        },this);

        if(!found){
            if(!this._notFoundFunction) return;
            let request = {};
            request.uri = window.location.pathname;
            return this._notFoundFunction(request, routerObj);
        }

    }


    notFoundHandler(callback){
        if(!Utils.isSet(callback)) throw new ArgNotFound('callback');
        if(!Utils.isFunction(callback)) throw new ArgTypeError('callback', 'function', callback);

        this._notFoundFunction = callback;
        return this;
    }

    _goTo(url, data = {}, title =''){
        window.history.pushState(data, title, url);
        return this.init();
    }

    _proccessParameters(uri){
        let parameters = [];
        let sn = 0;

        if(this._containsParameter(uri)){
            uri.replace(/\{\w+\}/g,(parameter)=>{
                sn++;
                parameter.replace(/\w+/, (parameterName)=>{
                    let obj = {};
                    obj[parameterName] = {
                        sn: sn,
                        regExp: '([^\\/]+)',
                        value: null
                    }
                    parameters.push(obj);
                });
            });
        }

        return parameters;
    }

    _proccessRegExp(route){
        let regExp = route.uri;
        regExp = regExp.replace(/\//g, '\\/');
        regExp = regExp.replace(/\./g, '\\.');
        regExp = regExp.replace('/', '/?');

        if(this._containsParameter(route.uri)){
            regExp.replace(/{\w+}/g, (parameter)=>{
                let parameterName = parameter.replace('{','');
                parameterName = parameterName.replace('}','');
                route.parameters.some((i)=>{
                    if(i[parameterName] !== undefined) {
                        regExp = regExp.replace(parameter, i[parameterName].regExp)
                        return regExp;
                    }
                });
                return parameter;
            });
        }
        regExp = `^${regExp}$`;
        route.regExp = new RegExp(regExp);
        return route;
    }

    _containsParameter(uri){
        return uri.search(/{\w+}/g) >= 0;
    }

    _processRequestParameters(route){
        let routeMatched = this._requestPath().match(route.regExp);
        if (!routeMatched) return;
        let param = {};
        routeMatched.forEach((value, index)=>{
            if(index !== 0){
                let key = Object.getOwnPropertyNames(route.parameters[index - 1]);
                param[key] = value;
            }
        });
        return param;
    }

    _requestPath(){
        return window.location.pathname;
    }

    _checkHistoryMode(){
        if(!window.PopStateEvent && !('pushState' in history)) return;
        window.addEventListener('click', (e)=> {
            if (!(e.target instanceof HTMLAnchorElement || e.target instanceof HTMLImageElement)) {
                return;
            } else if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault();
                this._goTo(e.target.pathname);
            }
        });

        window.addEventListener('popstate', ()=>{
            this.init();
        });
        return this;
    }


}
export default Router;
