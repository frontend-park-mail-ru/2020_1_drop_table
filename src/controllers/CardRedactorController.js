'use strict';

import {getContextByClass} from '../utils/cardRedactorUtils'

/** Контроллер редактирования карточки */
export default class CardRedactorController {

    /**
     * Инициализация контроллер редактирования карточки
     * @param {AppleCardModel} appleCardModel модель карточки
     * @param {CardRedactorView} cardRedactorView view редактора карточки
     */
    constructor(appleCardModel, cardRedactorView){
        this._appleCard = appleCardModel;
        this._cardRedactorView = cardRedactorView;
    }

    /** Запуск контроллера */
    async control(){
        this._appleCard.context = await this._makeContext();
        this._cardRedactorView._appleCard = this._appleCard;
        this._cardRedactorView.render();
        this.addImageListeners();
        this.addCardFieldsListeners();
        this.addSavePublishListeners();
        this.addColorPickerListeners(this);

    }

    /**
     * Создание контекста для CardRedactorView
     * @return {Promise<{appleCard: any}>}
     * @private
     */
    async _makeContext(){
        let appleCardContext = {
            appleCard: await this._appleCard.context
        };
        return appleCardContext;
    }

    /** Event, выполняющийся при нажатии на кнопку */
    editTextInputListener(e) {
        const target = e.target;
        this._appleCard.changeField(
            getContextByClass(target.parentNode.getAttribute('class')),
            target.parentNode.getAttribute('id'),
            target.getAttribute('class'),
            target.value);
        this._cardRedactorView.cardAppleComp.render(this._appleCard.getAsFormData());

        this.addSavePublishListeners();
        this.addImageListeners()
    }

    /**
     * Добавление лисенеров для color pickers
     * @param {obj} context контекст необходимый для создания color pickers
     */
    addColorPickerListeners(context) {

        function hexToRgb(hex) {

            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }


        let backgroundColorInput
            = document.getElementsByClassName('card-color-pickers-container_color-picker__inputs_background_input').item(0)
        backgroundColorInput.addEventListener('input', function () {
            let res = hexToRgb(this.value);
            context._appleCard._backgroundColor = `rgb(${res.r},${res.g},${res.b}`;
            context._cardRedactorView.cardAppleComp._renderBackgroundColor(context._appleCard._backgroundColor);
        }, false);

        let foregroundColorInput
            = document.getElementsByClassName('card-color-pickers-container_color-picker__inputs_foreground_input').item(0)
        foregroundColorInput.addEventListener('input', function () {
            let res = hexToRgb(this.value);
            context._appleCard._foregroundColor = `rgb(${res.r},${res.g},${res.b}`;
            context._cardRedactorView.cardAppleComp._renderForegroundColor(context._appleCard._foregroundColor);
        });
        let labelColorInput
            = document.getElementsByClassName('card-color-pickers-container_color-picker__inputs__label_input').item(0)
        labelColorInput.addEventListener('input', function () {
            let res = hexToRgb(this.value);
            context._appleCard._labelColor = `rgb(${res.r},${res.g},${res.b}`;
            context._cardRedactorView.cardAppleComp._renderLabelColor(context._appleCard._labelColor);
        })


    }


    /**Добавление листенеров на зполя карточки */
    addCardFieldsListeners() {
        const labelInputs = document.getElementsByClassName('labelField');
        const valueInputs = document.getElementsByClassName('valueField');
        const fieldButtons = document.getElementsByClassName('field-button');
        for (let i = 0; i < labelInputs.length; i++) {
            labelInputs.item(i).addEventListener('change', this.editTextInputListener.bind(this));
        }
        for (let i = 0; i < valueInputs.length; i++) {
            valueInputs.item(i).addEventListener('change', this.editTextInputListener.bind(this));
        }
        for (let i = 0; i < fieldButtons.length; i++) {
            const buttonType = fieldButtons.item(i).getElementsByClassName('button-text').item(0).innerText;
            if (buttonType === 'Добавить') {
                fieldButtons.item(i).addEventListener('click', this.addCardField.bind(this));
            } else {
                fieldButtons.item(i).addEventListener('click', this.removeAppleCardField.bind(this));
            }
        }
    }

    //todo пофиксить, когда будут новые ручки с сервера
    /** Добавление листенеров для публикации */
    addSavePublishListeners(){
        const submitSave = document.getElementsByClassName('card-form__buttons__save').item(0);
        submitSave.addEventListener('click', (e) => {
            e.preventDefault();

            const iconInput = document.getElementById('uploadAvatar');
            let icon = iconInput.files[0];

            const stripInput = document.getElementById('uploadStrip');
            let strip = stripInput.files[0];

            //todo Попросить Диму принимать урлы а не только изображения
            if(!strip){
                strip = this._appleCard._strip;
            }
            if(!icon){
                icon = this._appleCard._icon;
            }
            const images ={'icon.png': icon, 'icon@2x.png': icon,
                'logo.png': icon, 'logo@2x.png': icon,
                'strip.png': strip, 'strip@2x.png': strip
            };

            this._appleCard.editCard(images, false);
            console.log(' save apple card as json from controller', JSON.stringify(this._appleCard.getAsJson()));
        });

        const submitPublish = document.getElementsByClassName('card-form__buttons__publish').item(0);
        submitPublish.addEventListener('click', (e) => {
            e.preventDefault();
            const iconInput = document.getElementById('uploadAvatar');
            let icon = iconInput.files[0];
            const stripInput = document.getElementById('uploadStrip');
            let strip = stripInput.files[0];

            if(strip === null){
                strip = this._appleCard._strip;
                console.log('взял из карты strip ', strip)
            }
            if(icon === null){
                icon = this._appleCard._icon;
                console.log('взял из карты icon', icon)
            }

            const images ={
                'icon.png': icon,
                'icon@2x.png': icon,
                'logo.png': icon,
                'logo@2x.png': icon,
                'strip.png': strip,
                'strip@2x.png': strip
            };
            this._appleCard.editCard(images,true);
            console.log(' publish apple card as json from controller', JSON.stringify(this._appleCard.getAsJson()));
        });
    }

    /** Добавление полей карты */
    addCardField(e) {
        const parent = e.target.parentNode.parentNode;
        this._appleCard.pushField(getContextByClass(parent.getAttribute('class')));
        this._cardRedactorView.cardFormComp.render(this._appleCard.getAsFormData());
        this._cardRedactorView.cardAppleComp.render(this._appleCard.getAsFormData());
        this.addCardFieldsListeners();
        this.addColorPickerListeners(this);
        this.addSavePublishListeners();
    }

    /** Удаление полей карты */
    removeAppleCardField(e) {
        const parent = e.target.parentNode.parentNode;
        this._appleCard.removeField(getContextByClass(parent.getAttribute('class')), parent.getAttribute('id'));
        this._cardRedactorView.cardFormComp.render(this._appleCard.getAsFormData());
        this._cardRedactorView.cardAppleComp.render(this._appleCard.getAsFormData());
        this.addCardFieldsListeners();
        this.addSavePublishListeners();
        this.addColorPickerListeners(this);
    }

    /** Добавление листенеров на изображения */
    addImageListeners(){
        const stripInput = document.getElementById('uploadStrip');
        const stripImage = document.getElementsByClassName('card-redactor-container__card-form__image-picker_img').item(0);
        const stripCardImage = document.getElementsByClassName('card__strip').item(0);
        const avatarInput = document.getElementById('uploadAvatar');
        const avatarImage = document.getElementsByClassName('card-redactor-container__card-form__image-picker_img-avatar').item(0);
        const avatarCardImage = document.getElementsByClassName('card__header_img').item(0);

        stripInput.addEventListener('change',(e)=>{
            let tgt = e.target, files = tgt.files;
            if (FileReader && files && files.length) {
                let fr = new FileReader();
                fr.onload = function () {
                    stripImage.src = fr.result;
                    stripCardImage.style.backgroundImage = `url(${fr.result})`
                };
                fr.readAsDataURL(files[0]);
            }

        });
        avatarInput.addEventListener('change',(e)=>{
            const tgt = e.target, files = tgt.files;
            if (FileReader && files && files.length) {
                let fr = new FileReader();
                fr.onload = function () {
                    avatarImage.src = fr.result;
                    avatarCardImage.style.display = 'flex'; //todo пофиксить, когда будут новые ручки с сервера
                    avatarCardImage.src= fr.result;
                };
                fr.readAsDataURL(files[0]);
            }
        });
    }
}
