
export default class BaseView{

    constructor(app = document.getElementById('application')) {
        this._app = app;
        this._context = null;
    }

    get context(){
        return this._context;
    }

    set context(context){
        this._context = context;
    }

    render(){
        throw new Error('Virtual method not initialized');
    }
}
