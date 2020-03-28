import CafeListModel from "../models/CafeListModel";
import CafeListView from "../view/CafeListView";
import UserModel from "../models/UserModel";
import CafeListController from "../controllers/CafeListController";

import {Utils, ArgumentNotFoundError as ArgNotFound, ArgumentTypeError as ArgTypeError, QueryParams
} from "./utils.js";

let app = document.body;

 class Router {
    constructor(options){
        this.routes = [];
        this.path =  this._requestPath();

        //default options
        let defOptions = {
            caseInsensitive: true,
            historyMode: false
        };
        let mergedOptions = {...defOptions, ...options};
        for(let key in mergedOptions){
            this[`_${key}`] = mergedOptions[key];
        }
        this._checkHistoryMode();
        this.query = new QueryParams(null, this._historyMode);
        return this;
    }


    get(uri, callback, thisArg){
        if(!Utils.isSet(uri)) throw new ArgNotFound("uri")
        if(!Utils.isSet(callback)) throw new ArgNotFound("callback");

        if(!Utils.isString(uri)) throw new ArgTypeError("uri", "string", uri);
        if(!Utils.isFunction(callback)) throw new ArgTypeError("callback", "function", callback);

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
        };
        uri = uri.startsWith("/") ? uri : `/${uri}`;
        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`Conflicting routes. The route uri ${route.uri} already exists`);
        });

        route.uri = uri;
        route.callback = callback;
        route.parameters = this._proccessParameters(route.uri);

        this.routes.push(route);
        return this;
    }

    where(name, regExp){

        //validate type
        if(!Utils.isSet(name)) throw new ArgNotFound("name");
        if(!Utils.isSet(regExp)) throw new ArgNotFound("regExp");
        if(!Utils.isString(name)) throw new ArgTypeError("name", "string", name);
        if(!Utils.isString(regExp)) throw new ArgTypeError("regExp", "string", regExp);

        let route = this.routes[this.routes.length - 1]; // the target route

        //if paramaters exists for this route
        if (route.parameters.length === 0) throw new Error(`No Parameters Found: Could not set paramater regExpression for [${route.uri}] because the route has no parameters`);

        regExp = regExp.replace(/\(/g,"\\(");
        regExp = regExp.replace(/\)/g,"\\)");

        regExp = `(${regExp}+)`;

        let parameterFound = false;
        route.parameters.forEach((parameter, index)=>{
            if(parameter[name] !== undefined){
                parameterFound = true;
                parameter[name].regExp = regExp;
            }
        });

        if(!parameterFound) throw new Error(`Invalid Parameter: Could not set paramater regExpression for [${route.uri}] because the parameter [${name}] does not exist`);

        return this;
    }

    setName(name){
        if(!Utils.isSet(name)) throw new ArgNotFound("name");
        if(!Utils.isString(name)) throw new ArgTypeError("name", "string", name);

        let targetRoute = this.routes[this.routes.length - 1];
        this.routes.forEach((route)=>{
            if(route.name === name) throw new Error(`Duplicate naming. A route with name ${name} already exists`);
        })
        targetRoute.name = name;
        return this;
    }

    init(){
        this.routes.forEach((route)=>{
            this._proccessRegExp(route);
        }, this);

        let found = false;
        let routerObj = {
            pathFor: (name, parameter)=>{
                return this._pathFor(name, parameter);
            },

            goTo: (url, data, title)=>{
                return this._goTo(url, data, title);
            },

            historyMode: this._historyMode
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
        },this)

        if(!found){
            if(!this._notFoundFunction) return;
            let request = {};
            request.uri = window.location.pathname;
            return this._notFoundFunction(request, routerObj);
        }
    }


    notFoundHandler(callback){
        if(!Utils.isSet(callback)) throw new ArgNotFound("callback");
        if(!Utils.isFunction(callback)) throw new ArgTypeError("callback", "function", callback);

        this._notFoundFunction = callback;
        return this;
    }

    _goTo(url, data = {}, title =""){
        if(!Utils.isSet(url)) throw new ArgNotFound("url");
        if(!Utils.isString(url)) throw new ArgTypeError("url", "string", url);
        if(Utils.isEmpty(url)) throw new TypeError("url cannot be empty");

        if(!this._historyMode){
            let storage = window.localStorage;
            storage.setItem("pushState", data);
            return window.location.href= url;
        }

        window.history.pushState(data, title, url);
        return this.init();
    }

    _pathFor(name, parameters = {}){
        if(!Utils.isSet(name)) throw new ArgNotFound("name");
        if(!Utils.isString(name)) throw new ArgTypeError("name", "string", string);
        if(Utils.isEmpty(name)) throw new TypeError("name cannot be empty");
        let nameFound = false;
        let uri;
        this.routes.some(route=>{
            if(route.name === name){
                nameFound = true;
                uri = route.uri;
                if(this._containsParameter(uri)){

                    if(!Utils.isSet(paramaters)) throw new ArgNotFound("parameters");
                    if(!Utils.isObject(parameters)) throw new ArgTypeError("parameters", "object", parameters);
                    if(Utils.isEmpty(parameters)) throw new TypeError("parameters cannot be empty");
                    let array  = [];
                    for(let value of route.uri.match(/\{(\w+)\}/g)){
                        value = value.replace("{","");
                        value = value.replace("}","");
                        array.push(value);
                    }
                    if(array.length !== Object.getOwnPropertyNames(parameters).length) throw new Error(`The route with name [${name}] contains ${array.length} parameters. ${Object.getOwnPropertyNames(parameters).length} given`)
                    for(let parameter in parameters){
                        if (!array.includes(parameter)) throw new Error(`Invalid parameter name [${parameter}]`);
                        let r = new RegExp(`{${parameter}}`,"g");
                        uri = uri.replace(r, parameters[parameter]);
                    }
                }
            }
        });
        if (!nameFound) throw new Error(`Invalid route name [${name}]`);
        return uri;
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
                        regExp: "([^\\/]+)", // catch any word except '/' forward slash
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

        // escape special characters
        regExp = regExp.replace(/\//g, "\\/");
        regExp = regExp.replace(/\./g, "\\.");
        regExp = regExp.replace("/", "/?");

        if(this._containsParameter(route.uri)){

            //replace uri parameters with their regular expression
            regExp.replace(/{\w+}/g, (parameter)=>{
                let parameterName = parameter.replace("{","");
                parameterName = parameterName.replace("}","");
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
        if(!this._historyMode) return;

        if(!window.PopStateEvent && !"pushState" in history) return; // check for support of popstate event and pushstate in browser

        window.addEventListener("popstate", (e)=>{
            this.init();
        });

        return this;
    }


}
export default Router;
