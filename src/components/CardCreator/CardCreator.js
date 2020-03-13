import './CardRedactor.css'
import CardCreator from './CardCreator.hbs'

import {CardAppleComponent} from '../CardApple/CardApple'
// import {CardCreatorFormComponent} from '../CardCreatorForm/CardCreatorForm'
import CardFormComponent from '../../componentsAI/CardForm/CardForm'
import InputComponent from "../../componentsAI/Input/Input";
import {uuid} from '../../utils/uuid'


export function CreateCardRedactor(app, context) {

    let data = {

        headerFields: {
            logoImageSrc: 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
            logoText: 'Лого текст',
        },

        stripImageSrc: 'https://sun9-12.userapi.com/c853624/v853624246/1f694a/E7zRrtbvTc0.jpg',

        qrCodeImageSrc: 'https://sun9-66.userapi.com/c853624/v853624565/1f56ee/O8_4ZwO3xXY.jpg',

        storeCard: {
            primaryFields: [
                {
                    value: 'PrV1',
                    label: 'PrL1',
                },
            ],
            secondaryFields: [
                {
                    value: 'SV1',
                    label: 'SL1',
                },
                {
                    value: 'SV2',
                    label: 'SL2',
                }
            ]
            ,
            auxiliaryFields: [
                {
                    value: 'AV1',
                    label: 'AL1',
                },
                {
                    value: 'AV2',
                    label: 'AL2',
                }
            ],

        }
    };

    app.innerHTML = CardCreator();
    let left = document.getElementsByClassName('card-redactor-container__card-form').item(0);
    let right = document.getElementsByClassName('card-redactor-container__card-model').item(0);

    // (new CardCreatorFormComponent(left).render(data)); CardFormComponent



    function plusButtonOnClick(e, context) {
        // console.log('context->');
        // console.log(context);
        const inputElement = document.createElement('div');
        // const input = e.target.parentElement;
        const input = document.getElementById(context.labelID).parentElement;
        // console.log('input->');
        // console.log(input);
        inputElement.className = 'card-form__input-field';
        input.parentNode.insertBefore(inputElement, input.nextSibling);
        const inputComponent = new InputComponent(inputElement);
        //const origLabel = input.getElementsByTagName('label').item(0);

        const origLabelInput = input.getElementsByClassName('labelField').item(0);
        const origValueInput = input.getElementsByClassName('labelField').item(0);

        inputComponent.render({
            type: context.type,
            id: uuid(),
            labelID: uuid(),
            valueID: uuid(),
            fieldName: context.fieldName,
            labelData: context.labelData,
            valueData: context.valueData,
            labelText: context.labelText,
            valueText: context.valueText,
            value: context.value,

            button: 'Удалить',
            event: {
                type: 'click',
                listener: minusButtonOnClick
            }
        });
    }

    function minusButtonOnClick(e, context) {
        const input = document.getElementById(context.labelID).parentElement;
        input.remove();
    }


    let formData = {
        cardFormFields: [
            {
                type: 'text',
                id:uuid(),

                labelID: uuid(),
                // data: 'text',
                fieldName: 'Header',

                labelData: 'ХедерТекст',
                labelText: 'ХедерТекстик',
            },
            {
                type: 'text',
                id:uuid(),

                labelID: uuid(),
                valueID: uuid(),
                fieldName: 'Primary',

                labelData: 'Лейбл',
                valueData: 'Валуе',

                labelText: 'ЛейблТекст',
                valueText: 'ВалуеТекст',
            },

            {
                type: 'text',
                id:uuid(),
                labelID: uuid(),
                valueID: uuid(),

                fieldName: 'PrimaryField',
                labelData: 'Лейбл',
                valueData: 'Валуе',
                labelText: 'ЛейблТекст',
                valueText: 'ВалуеТекст',

                button: 'Добавить',
                event: {
                    type: 'click',
                    listener: plusButtonOnClick
                }
            },
            {
                type: 'text',
                id:uuid(),
                labelID: uuid(),
                valueID: uuid(),
                fieldName: 'SecondaryField',
                labelData: 'Лейбл',
                valueData: 'Валуе',
                labelText: 'ЛейблТекст',
                valueText: 'ВалуеТекст',

                button: 'Добавить',
                event: {
                    type: 'click',
                    listener: plusButtonOnClick
                }
            },
            {
                type: 'text',
                id:uuid(),

                labelID: uuid(),
                valueID: uuid(),
                // data: 'text',
                fieldName: 'AuxiliaryField',

                labelData: 'Лейбл',
                valueData: 'Валуе',

                labelText: 'ЛейблТекст',
                valueText: 'ВалуеТекст',

                button: 'Добавить',
                event: {
                    type: 'click',
                    listener: plusButtonOnClick
                }
            },


        ]
    };

    (new CardFormComponent(left).render(formData));

    (new CardAppleComponent(right).render(data));

    let img = document.getElementsByClassName('card__strip').item(0);
    img.style.backgroundImage = `url(${data.stripImageSrc})`



}
