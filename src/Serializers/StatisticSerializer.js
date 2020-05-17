
export default  class StatisticSerializer{

    // options = {
    // cafesList:[cafe1,cafe2],
    // staffList:[staff1,staff2]
    // onePlot:bool
    // }
    serializeLinePlotData(data, options){
        console.log('serialize line plot data')
        let plotData;
        if(options.onePlot){
            console.log('serialize line plot data 1')
            plotData = this._filterDataOnePlot(data, options);
        } else{
            console.log('serialize line plot data 2')
            plotData = this._filterDataAllPlots(data, options);
        }

        return this._makeContext(plotData, options)
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
            if(options.cafesList.includes(cafeName)){ //Проверка по списку
                let staff_actions = entriesPolyFill(cafes_staff[i][1]);
                for(let j = 0; j < staff_actions.length;j++){ //Итерация по работникам кафе
                    if(options.staffList.includes(staff_actions[j][0])){ //Проверка по списку
                        let actions = staff_actions[j][1];
                        for(let k = 0; k < actions.length; k++){ // Итерация по действиям работника
                            let action = entriesPolyFill(actions[k])[0];
                            if(plotData[action[0]]){
                                plotData[action[0]] += action[1];
                            }else {
                                plotData[action[0]] = action[1];
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
        console.log('test line plot data', data)
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
                                let action = entriesPolyFill(actions[k])[0];
                                if (plotData[cafeName]) {
                                    if (plotData[cafeName][action[0]]) {
                                        plotData[cafeName][action[0]] += action[1];
                                    } else {
                                        plotData[cafeName][action[0]] = action[1];
                                    }
                                } else {
                                    plotData[cafeName] = {};
                                    plotData[cafeName][action[0]] = action[1];
                                }
                            }
                        }
                    }
                }
            }
        } else{
            plotData = null
        }
        console.log('return line plot data', plotData)
        return plotData;
    }

    _makeContext(data, options){
        console.log('test make context')

        if(options.onePlot){
            return this._makeOnePlotContext(data);
        } else{
            return this._makeManyPlotContext(data);
        }
    }

    _makeOnePlotContext(data){
        console.log('test make one context', data)
        let plotData = {
            textX: 'Время',
            textY: 'Количество',
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
        console.log('test make many context', data)
        let plotData = {
            textX: 'Время',
            textY: 'Количество',
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
            textY: 'Количество',
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


