import './Customer.scss';
import CustomerInfo from './Customer.hbs';

export class Customer {

    constructor(el = document.getElementById('application'), uuid, context) {
        console.log('context customer ', context)
        this._el = el;
        this.points = 0;
        this.token = uuid;
        this._context = context;
        this.stack = JSON.parse(context.points).cups_count;

    }



    _renderTemplate(){
        console.log('aa', this._context);
        let context = this.makeTmlContext(this._context);
        console.log('finalContext', context)
        this._el.innerHTML = CustomerInfo(context);
    }

    makeTmlContext(data){
        let context = {};
        let tmp;
        switch(data.type){
        case 'percents':
            context.type = 'Скидочная карта';
            tmp= JSON.parse(data.points);
            context.data = `Скидка: ${tmp['discount']}  Сумма: ${tmp['purchases_sum']}`;
            break;
        case 'coffee_cup':
            context.type = 'Карточка с печатями';
            tmp = JSON.parse(data.points);
            context.data = `У вас: ${tmp['coffee_cups']}  Нужно: ${tmp['cups_count']}`;
            break;
        case 'cashback':
            context.type = 'Кешбек карта';
            tmp = JSON.parse(data.points);
            context.data = `Кешбек: ${tmp['points_count']}`;
            break;
        }
        const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
        let surveyData =JSON.parse(data['survey_result'])
        console.log('survey data');
        if(!surveyData.length){
            context.surveyResult = [];
        } else{
            context.surveyResult = [];

            for(let i = 0; i < surveyData.length; i++){
                console.log( surveyData[i]);
                let answer = '';
                if(!surveyData[i].listType){
                    answer = surveyData[i].text;
                }else{
                    console.log('test123',surveyData[i].answerOptions);
                    for(let j = 0; j < surveyData[i].answerOptions.length; j++){
                        if(surveyData[i].answerOptions[j].checked){
                            answer+=`${surveyData[i].answerOptions[j].text}\n`;
                        }
                    }
                }
                context.surveyResult.push({question: surveyData[i].question, answer:answer})
            }
        }
        return context
    }
    render()
    {
        this._renderTemplate();

    }
}








