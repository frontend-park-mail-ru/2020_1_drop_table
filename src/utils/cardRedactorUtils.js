import colorPicker from "./colorPicker";

export function getContextByClass(className) {
    switch (className) {
        case 'card-form__input-header-field':
            return 'HeaderField';
        case  'HeaderFieldsContainer':
            return 'HeaderField';
        case 'card-form__input-primary-field':
            return 'PrimaryField';
        case 'PrimaryFieldsContainer':
            return 'PrimaryField';
        case 'card-form__input-secondary-field':
            return 'SecondaryField';
        case 'SecondaryFieldsContainer':
            return 'SecondaryField';
        case 'card-form__input-auxiliary-field':
            return 'AuxiliaryField';
        case 'AuxiliaryFieldsContainer':
            return 'AuxiliaryField';
        default:
            return '';
    }
}

export const picker = {
    layout: [
        {
            component: colorPicker.ui.Wheel,
            options: {
                width: 130,
                handleRadius: 3,
                wheelLightness: true,
                wheelAngle: 0,
                wheelDirection: "anticlockwise"
            }
        },
        {
            component: colorPicker.ui.Slider,
            options: {
                width: 130,
                sliderType: 'value',
                sliderShape: 'bar'
            }
        }
    ]

};
