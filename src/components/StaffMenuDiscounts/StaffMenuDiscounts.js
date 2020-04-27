import './StaffMenuDiscounts.scss';
import StaffMenu from './StaffMenuDiscounts.hbs';
import {constants} from '../../utils/constants';
import {authAjax} from '../../utils/authAjax';
import NotificationComponent from '../Notification/Notification';


export class StaffMenuDiscountsComponent {

    constructor(el = document.getElementById('application'), uuid) {
        this._el = el;
        this.token = uuid;
    }

    changePoints() {
        let purchaseInput = this._el.getElementsByClassName('main__input-field_input').item(0)
        authAjax('PUT',`${constants.PATH}/api/v1/customers/${this.token}/`,  {'points_count':Number(purchaseInput.value)}, (response) => {
            if (response.errors === null) {
                (new NotificationComponent('Успешно')).render();
            } else {
                console.log(response.errors);
                (new NotificationComponent('Ошибка')).render();
                throw response.errors;
            }
        });
    }


    _renderTemplate(){
        this._el.innerHTML = StaffMenu();
    }

    render()
    {
        this._renderTemplate();
        const newPurchases = this._el.getElementsByClassName('buttonFlex__plus').item(0);
        newPurchases.addEventListener('click', this.changePoints.bind(this));
    }
}








