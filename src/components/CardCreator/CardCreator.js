import './CardRedactor.css'
import CardCreator from './CardCreator.hbs'

import {CardAppleComponent} from '../CardApple/CardApple'
import {CardCreatorFormComponent} from '../CardCreatorForm/CardCreatorForm'



export function CreateCardRedactor(app, context) {

    app.innerHTML = CardCreator();
    let left = document.getElementsByClassName('card-redactor-container__card-form').item(0);
    let right = document.getElementsByClassName('card-redactor-container__card-model').item(0);
    (new CardAppleComponent(right).render(context));
    (new CardCreatorFormComponent(left).render(context));

}
