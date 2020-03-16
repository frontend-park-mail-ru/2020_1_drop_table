import './CardRedactor.css'
import CardCreator from './CardCreator.hbs'

import {CardAppleComponent} from '../CardApple/CardApple'
// import {CardCreatorFormComponent} from '../CardCreatorForm/CardCreatorForm'
import CardFormComponent from '../../componentsAI/CardForm/CardForm'
import InputComponent from "../../componentsAI/Input/Input";
import {uuid} from '../../utils/uuid'
import form from "../../componentsAI/form/form";


export function CreateCardRedactor(app, context) {


    function test(e){
        e.preventDefault();
        alert('hello');
    }
    let formData = {
        stripImageSrc: 'https://sun9-12.userapi.com/c853624/v853624246/1f694a/E7zRrtbvTc0.jpg',

        qrCodeImageSrc: 'https://sun9-66.userapi.com/c853624/v853624565/1f56ee/O8_4ZwO3xXY.jpg',

        headerFields: [{
            logoImageSrc: 'https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg',
            type: 'text',
            id: uuid(),
            labelID: uuid(),
            fieldName: 'Header',
            labelData: 'ХедерТекст',
            labelText: 'ХедерТекстик',
        },
        ],

        primaryFields: [
            {
                type: 'text',
                id: uuid(),
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

        ],
        secondaryFields: [
            {
                type: 'text',
                id: uuid(),
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
        ],
        auxiliaryFields: [
            {
                type: 'text',
                id: uuid(),
                labelID: uuid(),
                valueID: uuid(),
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
        ],

    };

    app.innerHTML = CardCreator();
    let left = document.getElementsByClassName('card-redactor-container__card-form').item(0);
    let right = document.getElementsByClassName('card-redactor-container__card-model').item(0);

    function getClassByContext(contextField){
        switch (contextField) {
            case 'HeaderField':
                return 'card-form__input-header-field';
            case 'PrimaryField':
                return 'card-form__input-primary-field';
            case 'SecondaryField':
                return 'card-form__input-secondary-field';
            case 'AuxiliaryField':
                return 'card-form__input-auxiliary-field';
            default:
                return  'card-form__input-field';
        }
    }

    function getContextByClass(className){
        switch (className) {
            case 'card-form__input-header-field':
                return 'HeaderField';
            case 'card-form__input-primary-field':
                return 'PrimaryField';
            case 'card-form__input-secondary-field':
                    return 'SecondaryField';
            case 'card-form__input-auxiliary-field':
                return 'AuxiliaryField';
            default:
                return  '';
        }
    }

    function pushIntoFormData(fieldType, data){
        switch (fieldType) {
            case 'HeaderField':
                formData.headerFields.push(data);
                cardAppleComp._renderCardHeader(formData.headerFields);
                break;
            case 'PrimaryField':
                formData.primaryFields.push(data);
                cardAppleComp._renderPrimaryFields(formData.primaryFields);
                break;
            case 'SecondaryField':
                formData.secondaryFields.push(data);
                cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);
                break;
            case 'AuxiliaryField':
                formData.auxiliaryFields.push(data);
                cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);
                break;
            default:
                return;
        }
    }

    function removeFromFormData(fieldType,id) {
        switch (fieldType) {
            case 'HeaderField':
                formData.headerFields = formData.headerFields.filter(item => item.labelID !== id);
                cardAppleComp._renderCardHeader(formData.headerFields);
                break;
            case 'PrimaryField':
                formData.primaryFields = formData.primaryFields.filter(item => item.labelID !== id);
                cardAppleComp._renderPrimaryFields(formData.primaryFields);

                break;
            case 'SecondaryField':
                formData.secondaryFields = formData.secondaryFields.filter(item => item.labelID !== id);
                cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);

                break;
            case 'AuxiliaryField':
                formData.auxiliaryFields = formData.auxiliaryFields.filter(item => item.labelID !== id);
                cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);
                break;
            default:
                return;
        }
    }



    function changeFieldInFormData(fieldType, id, type, text) {
        console.log(fieldType+' '+ id + ' '+ type+' '+ text);
        switch (fieldType) {
            case 'HeaderField':
                console.log('change HF');
                let headerF = formData.headerFields;
                for(let i = 0; i < headerF.length;i++){
                    if (headerF[i].id === id){
                        console.log('find by id');
                        if (type === 'labelField'){
                            console.log('change Label');
                            formData.headerFields[i].labelText = text;
                            cardAppleComp._renderCardHeader(formData.headerFields[0]);
                        }
                        else if (type === 'valueField'){
                            console.log('change Value');
                            formData.headerFields[i].valueText = text;
                            cardAppleComp._renderCardHeader(formData.headerFields[0]);

                        }
                    }
                }
                break;
            case 'PrimaryField':
                console.log('change PF');

                let primaryF = formData.primaryFields;
                for(let i = 0; i < primaryF.length;i++){
                    console.log(primaryF[i].id);
                    if (primaryF[i].id === id){
                        console.log('find by id');
                        if (type === 'labelField'){
                            console.log('change Label');
                            formData.primaryFields[i].labelText = text;
                            cardAppleComp._renderPrimaryFields(formData.primaryFields);
                        }
                        else if (type === 'valueField'){
                            console.log('change Value');
                            formData.primaryFields[i].valueText = text;
                            cardAppleComp._renderPrimaryFields(formData.primaryFields);
                        }
                    }
                }

                break;
            case 'SecondaryField':
                console.log('change SF');
                let secondaryF = formData.secondaryFields;
                for(let i = 0; i < secondaryF.length;i++){
                    console.log(secondaryF[i].id);
                    if (secondaryF[i].id === id){
                        console.log('find by id');
                        if (type === 'labelField'){
                            console.log('change Label');
                            formData.secondaryFields[i].labelText = text;
                            cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);
                        }
                        else if (type === 'valueField'){
                            console.log('change Value');
                            formData.secondaryFields[i].valueText = text;
                            cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);
                        }
                    }
                }


                break;
            case 'AuxiliaryField':
                console.log('change AF');
                let auxiliaryF = formData.auxiliaryFields;
                for(let i = 0; i < auxiliaryF.length;i++){
                    console.log(auxiliaryF[i].id);
                    if (auxiliaryF[i].id === id){
                        console.log('find by id');
                        if (type === 'labelField'){
                            console.log('change Label');
                            formData.auxiliaryFields[i].labelText = text;
                            cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);
                        }
                        else if (type === 'valueField'){
                            console.log('change Value');
                            formData.auxiliaryFields[i].valueText = text;
                            cardAppleComp._renderFields(formData.secondaryFields, formData.auxiliaryFields);
                        }
                    }
                }

                break;
            default:
                return;
        }
    }




    function plusButtonOnClick(e, context) {
        const inputElement = document.createElement('div');
        const input = document.getElementById(context.labelID).parentElement;
        inputElement.className = getClassByContext(context.fieldName);
        input.parentNode.insertBefore(inputElement, input.nextSibling);
        const inputComponent = new InputComponent(inputElement);
        let newInputFieldData = {
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
        };
        pushIntoFormData(context.fieldName,newInputFieldData);
        inputComponent.render(newInputFieldData);

    }

    function minusButtonOnClick(e, context) {
        const input = document.getElementById(context.labelID).parentElement;
        removeFromFormData(context.fieldName, context.labelID);
        input.remove();
    }


    const cardFormComp = new CardFormComponent(left);
    cardFormComp.render(formData);
    const cardAppleComp = new CardAppleComponent(right);
    cardAppleComp.render(formData);


    let img = document.getElementsByClassName('card__strip').item(0);
    img.style.backgroundImage = `url(${formData.stripImageSrc})`;

    const submit = document.getElementsByClassName('card-form__submit').item(0);
    submit.addEventListener('click', (e)=>{
        e.preventDefault();
        cardAppleComp.render(formData);
    });




    function editTextInputListener(e){
        console.log(e.target);
        const target = e.target;
        changeFieldInFormData(
            getContextByClass(target.parentNode.getAttribute('class')),
            target.parentNode.getAttribute('id'),
            target.getAttribute('class'),
            target.value)
    }

    function addListeners(){
        let labelInputs = document.getElementsByClassName('labelField');
        let valueInputs = document.getElementsByClassName('valueField');
        for(let i = 0; i < labelInputs.length;i++){
            labelInputs.item(i).addEventListener('change', editTextInputListener);
            valueInputs.item(i).addEventListener('change', editTextInputListener);
        }
    }
    addListeners();


}
