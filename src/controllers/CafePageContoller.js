import {router} from '../main/main';
import {InputAlertWindowComponent} from '../components/InputAlertWindow/InputAlertWindow';
import NotificationComponent from "../components/Notification/Notification";
import ServerExceptionHandler from "../utils/ServerExceptionHandler";
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
        try {
            await this._userModel.update();
            await this._cafeListModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    /** Event добавление работника */
    addStaffButtonClick(){
        try {
            router._goTo('/error?code=404')
            // (new InputAlertWindowComponent(this._userModel.addStaffQR, this._id)).render();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
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

    _makeExceptionContext(){
        return {
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            }
        }
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

