import {router} from '../main/main';
import NotificationComponent from '../components/Notification/Notification';
import ServerExceptionHandler from '../utils/ServerExceptionHandler';
/** контроллер кафе */
export default class CafePreviewController {

    /**
     * Инициализация CafePageController
     * @param {CafeListModel} cafeListModel модель списка кафе
     * @param {UserModel} userModel модель пользователя
     * @param {CafePageView} cafePageView view кафе
     */
    constructor(userModel,cafePreView, cafePreviewModel){

        this._userModel = userModel;
        this._cafePreView = cafePreView;
        this._cafePreviewModel = cafePreviewModel;
        this._id = null;
    }

    async update(){
        try {
            await this._userModel.update();
        } catch (exception) {
            (new ServerExceptionHandler(document.body, this._makeExceptionContext())).handle(exception);
        }
    }

    /**
     * Создание контекста для CafePreview
     * @param {int} id идентификатор кафе
     * @return {obj} созданный контекст
     */
    async _makeViewContext(id){
        this._id = id;
        await this._cafePreviewModel.getCafePreview(id);
        let cafeContext = {
            'cafe': this._cafePreviewModel.context
        };

        cafeContext['header'] = {
            type: 'preview',
            isOwner: false,
        };

        return cafeContext;
    }

    _makeExceptionContext(){
        return {
            'offline': () => {
                (new NotificationComponent('Похоже, что вы оффлайн.')).render();
                return [null, null]
            },
            'no permission': () => {
                router._goTo('/login');
                throw new Error('no permission');
            },
        }
    }

    /** Запуск контроллера
     * @param {int} id идентификатор кафе
     */
    async control(id){
        console.log('control cafe preview')
        try {
            //await this.update();
            this._cafePreView.context =  await this._makeViewContext(id);
            this._cafePreView.render();
        } catch (error) {
            console.log(error.message);
        }
    }
}

