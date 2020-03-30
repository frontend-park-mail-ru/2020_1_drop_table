'use strict';

import {getContextByClass} from '../utils/cardRedactorUtils'

export default class CardRedactorController {

    constructor(appleCardModel, cardRedactorView){
         this._appleCard = appleCardModel;
         this._cardRedactorView = cardRedactorView;
    }

    async control(){
        console.log('control card redactor');
        this._appleCard.context = await this._makeContext();
        this._cardRedactorView._appleCard = this._appleCard;
        this._cardRedactorView.render();
        this.addListeners();
        this.addImageListeners();
        this.addColorPickerListeners(this);
    }
    async _makeContext(){
        let appleCardContext = {
            appleCard: await this._appleCard.context
        };
        return appleCardContext;
    }

    editTextInputListener(e) {
        const target = e.target;
        this._appleCard.changeField(
            getContextByClass(target.parentNode.getAttribute('class')),
            target.parentNode.getAttribute('id'),
            target.getAttribute('class'),
            target.value);
        this._cardRedactorView.cardAppleComp.render(this._appleCard.getAsFormData());
        this.addSubmitListener()
    }



    addColorPickerListeners(context) {
        context._cardRedactorView.colorWheelBackground.on('color:change', function (color, changes) {
            context._appleCard._backgroundColor = color.rgbString;
            context._cardRedactorView.cardAppleComp._renderBackgroundColor(context._appleCard._backgroundColor);
        });

        context._cardRedactorView.colorWheelForeground.on('color:change', function (color, changes) {
            context._appleCard._foregroundColor = color.rgbString;
            context._cardRedactorView.cardAppleComp._renderForegroundColor(context._appleCard._foregroundColor);
        });

        context._cardRedactorView.colorWheelLabel.on('color:change', function (color, changes) {
            context._appleCard._labelColor = color.rgbString;
            context._cardRedactorView.cardAppleComp._renderLabelColor(context._appleCard._labelColor);
        });
    }



    addListeners() {
        let labelInputs = document.getElementsByClassName('labelField');
        let valueInputs = document.getElementsByClassName('valueField');

        for (let i = 0; i < labelInputs.length; i++) {
            labelInputs.item(i).addEventListener('change', this.editTextInputListener.bind(this));
        }
        for (let i = 0; i < valueInputs.length; i++) {
            valueInputs.item(i).addEventListener('change', this.editTextInputListener.bind(this));
        }


        let fieldButtons = document.getElementsByClassName('field-button');
        for (let i = 0; i < fieldButtons.length; i++) {
            const buttonType = fieldButtons.item(i).getElementsByClassName('button-text').item(0).innerText;
            if (buttonType === 'Добавить') {
                fieldButtons.item(i).addEventListener('click', this.addCardField.bind(this));
            } else {
                fieldButtons.item(i).addEventListener('click', this.removeAppleCardField.bind(this));
            }

        }

    }

    addSubmitListener(){
        const submit = document.getElementsByClassName('card-form__submit').item(0);
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            alert('submit');

            const iconInput = document.getElementById('uploadAvatar');
            let icon = iconInput.files[0];

            const stripInput = document.getElementById('uploadStrip');
            let strip = stripInput.files[0];

            const images ={
                'icon.png': icon,
                'icon@2x.png': icon,
                'logo.png': icon,
                'logo@2x.png': icon,
                'strip.png': strip,
                'strip@2x.png': strip
            };

            this._appleCard.editCard(images);
            console.log('apple card as json from controller', JSON.stringify(this._appleCard.getAsJson()));
        });
    }

    addCardField(e) {
        let parent = e.target.parentNode.parentNode;
        this._appleCard.pushField(getContextByClass(parent.getAttribute('class')));
        this._cardRedactorView.cardFormComp.render(this._appleCard.getAsFormData());
        this._cardRedactorView.cardAppleComp.render(this._appleCard.getAsFormData());
        this.addListeners();
        this.addColorPickerListeners(this);
        this.addSubmitListener()
    }

    removeAppleCardField(e) {
        let parent = e.target.parentNode.parentNode;
        this._appleCard.removeField(getContextByClass(parent.getAttribute('class')), parent.getAttribute('id'));
        this._cardRedactorView.cardFormComp.render(this._appleCard.getAsFormData());
        this._cardRedactorView.cardAppleComp.render(this._appleCard.getAsFormData());
        this.addListeners();
        this.addColorPickerListeners(this);

    }

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
            let tgt = e.target, files = tgt.files;
            if (FileReader && files && files.length) {
                let fr = new FileReader();
                fr.onload = function () {
                    avatarImage.src = fr.result;
                    avatarCardImage.src= fr.result;
                };
                fr.readAsDataURL(files[0]);
            }
        });
    }
}
