import {ajax} from "../../modules/ajax";
import {constants} from "../../utils/constants";
import {CafePageComponent} from "../CafePageComponent/CafePage";


export function CreateCafePage(app, id) {

    ajax('GET',constants.PATH+`/api/v1/cafe/${id}`,null
        , (response) => {
            if (response.errors === null) {
                const cafeElement = document.createElement('div');
                app.appendChild(cafeElement);
                (new CafePageComponent(cafeElement)).render(response);
            } else {
                alert(response.errors[0].message); //TODO showError
            }
        });



}
