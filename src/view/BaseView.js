import '../scss/styles.scss';

/** Базовая view */
export default class BaseView{

    /**
     * Инициализация view
     * @param {Element} app элемент в котором находится приложение
     */
    constructor(app = document.getElementById('application')) {
        this._app = app;
        this._context = null;
    }

    /**
     * Возвращает контекст view
     * @return {obj} контекст view
     */
    get context(){
        return this._context;
    }

    /**
     * Устанавливает контекст view
     * @param {obj} context контекст view
     */
    set context(context){
        this._context = context;
    }

    /** Отрисовка view */
    render(){
        throw new Error('Virtual method not initialized');
    }
}
