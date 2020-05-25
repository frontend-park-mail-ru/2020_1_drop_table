export default  class StaffActionSerializer {

    serializeData(data) {
        if (!data.length) {
            let date = new Date();
            let context = {
                dateStart: `${date.getDate()}.${date.getMonth()}`,
                dateEnd: `${date.getDate()}.${date.getMonth()}`,
                dateCells: {}
            };
            context.dateCells[`${date.getDate()}.${date.getMonth()}`] = [
                {
                    action: 'Действий нет',
                    time: ''
                }
            ];
            return context
        }
        else{
            let dateStart = new Date(data[0].time);
            let dateEnd = new Date(data[data.length-1].time);
            let context = {
                dateStart: `${dateStart.getDate()}.${dateStart.getMonth()}`,
                dateEnd: `${dateEnd.getDate()}.${dateEnd.getMonth()}`,
                dateCells: {}
            };
            for(let i = 0; i < data.length;i++){
                let date = new Date(data[i].time);
                let cellDate = `${date.getDate()}.${date.getMonth()}`;
                if(!context.dateCells[cellDate]){
                    context.dateCells[cellDate] = [];
                }
                context.dateCells[cellDate].
                    push(
                        {
                            action: `${this.serializeAction(data[i]['json_data'])} 
                            у ${data[i]['clientUuid'].toString(16).slice(0,4)}`,
                            time:`${date.getHours()}:${date.getMinutes()}`
                        });

            }
            return context
        }
    }
    serializeAction(jsonData){
        let data =  entriesPolyFill(JSON.parse(jsonData));
        switch(data[0][0]){
        case 'coffee_cups':
            return `Обновлены баллы: ${data[0][1]} `;
            break;
        case 'points_count':
            return `Начислен кешбек: ${data[0][1]} `;
            break;
        case 'new_purchases':
            return `Транзакция со скидкой:${data[0][1]} `;
            break;
        default:
            return 'Неизвестная операция '

        }
    }
}

const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
let context = {
    dateStart: '01.05',
    dateEnd: '03.05',
    dateCells: {
        '01.05': [
            {
                action: 'Начислил 10 бонусов',
                time: '13:01'
            },
            {
                action: 'Начислил 11 бонусов',
                time: '14:02'
            },
            {
                action: 'Начислил 12 бонусов',
                time: '15:03'
            }
        ],
        '02.05': [
            {
                action: 'Начислил 13 бонусов',
                time: '13:01'
            },
            {
                action: 'Начислил 14 бонусов',
                time: '14:02'
            },
            {
                action: 'Начислил 15 бонусов',
                time: '15:03'
            }
        ],
        '03.05': [
            {
                action: 'Начислил 13 бонусов',
                time: '13:01'
            },
            {
                action: 'Начислил 14 бонусов',
                time: '14:02'
            },
            {
                action: 'Начислил 15 бонусов',
                time: '15:03'
            }
            ,
            {
                action: 'Снял 15 бонусов',
                time: '16:03'
            }
        ],
    }

}
