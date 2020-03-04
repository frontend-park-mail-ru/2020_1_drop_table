import './CardRedactor.css'
import CardCreator from './CardCreator.hbs'

import {CardAppleComponent} from '../CardApple/CardApple'
import {CardCreatorFormComponent} from '../CardCreatorForm/CardCreatorForm'



export function CreateCardRedactor(app, context) {

    let data = {
        logoImageSrc: 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
        logoText: 'Лого текст',
        stripImageSrc: 'https://sun9-12.userapi.com/c853624/v853624246/1f694a/E7zRrtbvTc0.jpg',
        headerLabel: 'Хедер лейбл',
        mainLabel: 'Мэйн лейбл',
        secondaryField: 'Второстепенное',
        auxiliaryField: 'Вспомогательное',
        qrCodeImageSrc: 'https://sun9-66.userapi.com/c853624/v853624565/1f56ee/O8_4ZwO3xXY.jpg',
    };

    app.innerHTML = CardCreator();
    let left = document.getElementsByClassName('card-redactor-container__card-form').item(0);
    let right = document.getElementsByClassName('card-redactor-container__card-model').item(0);

    (new CardCreatorFormComponent(left).render(data));
    (new CardAppleComponent(right).render(data));
}
