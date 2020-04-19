import {router} from '../main/main';

/** контроллер кафе */
export default class CafePageController {

    /**
     * Инициализация CafePageController
     * @param {CafeListModel} cafeListModel модель списка кафе
     * @param {UserModel} userModel модель пользователя
     * @param {CafePageView} cafePageView view кафе
     */
    constructor(cafeListModel, userModel, cafePageView){
        this._cafeListModel = cafeListModel;
        this._userModel = userModel;
        this._cafePageView = cafePageView;

        this._id = null;
    }

    async update(){
        await this._userModel.update();
        await this._cafeListModel.update();
    }

    /** Event добавление работника */
    addStaffButtonClick(){
        this._userModel.addStaffQR(this._id);
    }

    /** Event редактирование кафе */
    editCafeButtonClick(){
        router._goTo(`/editCafe/${this._id}`);
    }

    /**
     * Создание контекста для CafePageView
     * @param {int} id идентификатор кафе
     * @return {obj} созданный контекст
     */
    _makeViewContext(id){
        this._id = id;
        const cafe = this._cafeListModel.getCafeById(id);
        let cafeContext = {
            'cafe': cafe.context
        };

        cafeContext['header'] = {
            type: null,
            avatar: {
                photo: this._userModel.photo,
                event: {
                    type: 'click',
                    listener: () => {router._goTo('/profile')}
                }
            }
        };
        cafeContext['add-staff-button'] = this.addStaffButtonClick.bind(this);

        cafeContext['cafe-page__cafe-info__edit-button'] = this.editCafeButtonClick.bind(this);

        return cafeContext;
    }

    /** Запуск контроллера
     * @param {int} id идентификатор кафе
     */
    async control(id){
        await this.update();
        this._cafePageView.context = this._makeViewContext(id);
        this._cafePageView.render();
    }
}

