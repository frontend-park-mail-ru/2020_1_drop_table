
export default  class StatisticSerializer{

    serializeLinePlotData(data, options){
        let plotData;
        if(options.onePlot){
            plotData = this._filterDataOnePlot(data, options);
        } else{
            plotData = this._filterDataAllPlots(data, options);
        }
        const res = this._makeContext(plotData, options);
        return res;
    }

    /**
     * Фильтрация данных с сервера в зависимости от фильтров у пользователя (Один график)
     * @param {Object} data Данные с сервера{cafe1:{ staff1:[{date,count}...], staff2...},cafe2...}
     * @param {Array} options Данные фильтрации {cafesList:[...], staffList:[..]}
     * @private
     */
    _filterDataOnePlot(data, options){
        let plotData = {};
        let cafes_staff = entriesPolyFill(data);
        for(let i = 0; i < cafes_staff.length;i++){ //Итерация по кафе владельца
            let cafeName = cafes_staff[i][0];
            if(options.cafesList.includes(Number(cafeName))){ //Проверка по списку
                let staff_actions = entriesPolyFill(cafes_staff[i][1]);
                for(let j = 0; j < staff_actions.length;j++){ //Итерация по работникам кафе
                    if(options.staffList.includes(Number(staff_actions[j][0]))){ //Проверка по списку
                        let actions = staff_actions[j][1];
                        for(let k = 0; k < actions.length; k++){ // Итерация по действиям работника
                            let action = actions[k];
                            let date = Date.parse(action['Date']) ? action['Date'].split('T')[0] : action['Date'];
                            if(plotData[date]){
                                plotData[date] += action['NumOfUsage'];
                            }else {
                                plotData[date] = action['NumOfUsage'];
                            }
                        }
                    }
                }
            }
        }
        return plotData;
    }

    /**
     * Фильтрация данных с сервера в зависимости от фильтров у пользователя (Все графики)
     * @param {Object} data Данные с сервера{cafe1:{ staff1:[{date,count}...], staff2...},cafe2...}
     * @param {Array} options Данные фильтрации {cafesList:[...], staffList:[..]}
     * @private
     */
    _filterDataAllPlots(data, options){
        let plotData = {};
        if(data) {
            let cafes_staff = entriesPolyFill(data);
            for (let i = 0; i < cafes_staff.length; i++) { //Итерация по кафе владельца
                let cafeName = cafes_staff[i][0];
                if (options.cafesList.includes(cafeName)) { //Проверка по списку
                    let staff_actions = entriesPolyFill(cafes_staff[i][1]);
                    for (let j = 0; j < staff_actions.length; j++) { //Итерация по работникам кафе
                        if (options.staffList.includes(staff_actions[j][0])) { //Проверка по списку
                            let actions = staff_actions[j][1];
                            for (let k = 0; k < actions.length; k++) { // Итерация по действиям работника
                                let action = actions[k];

                                let date = Date.parse(action['Date']) ? action['Date'].split('T')[0] : action['Date'];

                                if (plotData[cafeName]) {
                                    if (plotData[cafeName][date]) {
                                        plotData[cafeName][date] += action['NumOfUsage'];
                                    } else {
                                        plotData[cafeName][date] = action['NumOfUsage'];
                                    }
                                } else {
                                    plotData[cafeName] = {};
                                    plotData[cafeName][date] = action['NumOfUsage'];
                                }
                            }
                        }
                    }
                }
            }
        } else{
            plotData = null
        }
        return plotData;
    }

    _makeContext(data, options){
        if(options.onePlot){
            return this._makeOnePlotContext(data);
        } else{
            return this._makeManyPlotContext(data);
        }
    }

    _makeOnePlotContext(data){
        let plotData = {
            textX: 'Время',
            textY: 'Количество операций',
            array:[],
        };
        let points = [];
        if(data) {
            let simpleData = entriesPolyFill(data);
            for (let i = 0; i < simpleData.length; i++) {
                points.push({x: simpleData[i][0], y: simpleData[i][1]});
            }
        }
        plotData.array.push({
            color: colors[0],
            name:'Кафе',
            array: points,
        });

        return plotData
    }

    _makeManyPlotContext(data){
        let plotData = {
            textX: 'Время',
            textY: 'Количество операций',
            array:[],
        };
        let points = [];
        if(data) {
            let simpleData = entriesPolyFill(data);
            for (let i = 0; i < simpleData.length; i++) {

                let arr = entriesPolyFill(simpleData[i][1]);
                for (let j = 0; j < arr.length; j++) {
                    points.push({x: arr[j][0], y: arr[j][1]});
                }
                plotData.array.push({
                    color: colors[i],
                    name: simpleData[i][0],
                    array: points,
                });
            }
        }
        return plotData
    }

    serializeStaffPlot(data, staffName){
        let plotData = [];
        let cafes_staff = entriesPolyFill(data);
        for(let i = 0; i < cafes_staff.length; i++){
            let staff_actions = entriesPolyFill(cafes_staff[i]);
            for(let j = 0; j < staff_actions.length; i++){
                if(staff_actions[i][0] === staffName){
                    let array = staff_actions[i][1];
                    for(let k = 0; k < array.length; k++){
                        plotData.push({x:array[i][0],y:array[i][1]})
                    }
                }
            }
        }
        return this.makeStaffPlotContext(plotData);
    }
    makeStaffPlotContext(data){
        let plotData = {
            textX: 'Время',
            textY: 'Количество операций',
            array:[
                {
                    color:'#814ad0',
                    array: data
                }],
        };
        return plotData
    }

}
const entriesPolyFill = (context) => Object.keys(context).map(key => [key, context[key]]);
const colors =[
    '#f39c12',
    '#814ad0',
    '#1e7e98',
    '#FF745E',
    '#991FA6',
    '#2D6372',
    '#B68538',
    '#B766BF',
    '#BF7165',
    '#F488FF',
    '#51B1CC',
    '#F9B64C',
    '#F7A8FF',
    '#A6311E',
    '#72B8CC',
    '#9E6306',
    '#F9C87A',
    '#FF9686',
];


