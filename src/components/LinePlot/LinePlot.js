'use strict';
import LinePlotTemplate from './LinePlot.hbs';

export default class FormComponent {

    constructor(parent = document.body) {
        this._parent = parent;
        this._context = null;
        this._canvas = null;
        this._plt = null
    }

    _flipAxis(point){
        return {
            x:point.x,
            y:this._canvas.height - point.y
        };
    }

    _trimNumber(number){
        if(Math.trunc(number / 10e6)){
            return Math.trunc(number / 10e6) + 'M';
        } else if(Math.trunc(number / 10e3)){
            return Math.trunc(number / 10e3) + 'K';
        } else if(Math.trunc(number / 10)){
            return Math.trunc(number);
        }
        return number.toFixed(1);
    }

    _drawText(point, text, size='30px', align='center', font='Montserrat', color='#000000', angle=0){
        point = this._flipAxis(point);
        this._plt.save()
        this._plt.translate(point.x, point.y);
        this._plt.rotate(angle);
        this._plt.font = size + ' ' + font;
        this._plt.fillStyle = color;
        this._plt.textAlign = align;
        this._plt.fillText(text, 0, 0);
        this._plt.restore()
    }

    _drawLine(arr, width=1, color='#000000', lineCap='round', lineJoin='round'){
        this._plt.beginPath();
        let from = this._flipAxis(arr[0]);
        this._plt.moveTo(from.x, from.y);

        for(let point of arr.slice(1)){
            point = this._flipAxis(point);
            this._plt.lineJoin = lineJoin;
            this._plt.lineTo(point.x, point.y);
            this._plt.lineWidth = width;
            this._plt.strokeStyle = color;
            this._plt.lineCap = lineCap;
        }
        this._plt.stroke();
        this._plt.closePath();
    }

    _drawPoints(arr, width=1, color='#000000', lineCap='round', lineJoin='round'){
        for(let point of arr){
            point = this._flipAxis(point);
            this._plt.beginPath();
            this._plt.moveTo(point.x, point.y);
            this._plt.lineJoin = lineJoin;
            this._plt.lineTo(point.x, point.y);
            this._plt.lineWidth = width;
            this._plt.strokeStyle = color;
            this._plt.lineCap = lineCap;
            this._plt.stroke();
            this._plt.closePath();
        }
    }

    _drawAxis(){
        const minSide = Math.min(this._canvas.height, this._canvas.width);
        const axisBias = 0.1 * minSide;
        const axisPreBias = 0.05 * minSide;
        const xAxisEndPoint = 0.9 * this._canvas.width;
        const yAxisEndPoint = 0.9 * this._canvas.height;
        const linesWidth = minSide / 300;

        this._drawLine([{x:axisPreBias, y:axisBias}, {x:xAxisEndPoint, y:axisBias}], linesWidth, '#000000');
        this._drawLine([{x:axisBias, y:axisPreBias}, {x:axisBias, y:yAxisEndPoint}], linesWidth, '#000000');
    }

    _drawGrid(array){
        const minSide = Math.min(this._canvas.height, this._canvas.width);
        const axisBias = 0.1 * minSide;
        const xAxisOuterBias = 0.9 * this._canvas.width;
        const yAxisOuterBias = 0.85 * this._canvas.height;
        const step = (xAxisOuterBias - axisBias) / array.length;
        const linesWidth = minSide / 300;
        const fontSize = minSide / 60 + 'px';

        (array.slice(1)).forEach((point, c)=>{
            this._drawText({x:axisBias + (c+1) * step, y:axisBias - 0.05*minSide}, point.x, fontSize);
            this._drawLine([{x:axisBias + (c+1) * step, y:axisBias},
                {x:axisBias + (c+1) * step, y:yAxisOuterBias}], linesWidth, '#BFBFBF');
        })
    }

    _drawBackground(){
        this._plt.fillStyle = '#F1F0F0';
        this._plt.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    _drawGraph(array) {
        const minSide = Math.min(this._canvas.height, this._canvas.width);
        const axisBias = 0.1 * minSide;
        const xAxisOuterBias = 0.9 * this._canvas.width;
        const yAxisOuterBias = 0.84 * this._canvas.height;
        const step = (xAxisOuterBias - axisBias) / array.length;
        const linesWidth = minSide / 100;
        const fontSize = minSide / 60 + 'px';
        let minValue = array[0].y;
        let maxValue = array[0].y;

        for (let point of array) {
            if(minValue > point.y){
                minValue = point.y;
            }
            else if(maxValue < point.y){
                maxValue = point.y;
            }
        }

        this._drawText({x:axisBias - 0.01 * minSide, y:axisBias + 0.025 * minSide},
            this._trimNumber((maxValue - minValue)*0.04), fontSize, 'right');
        this._drawText({x:axisBias - 0.01 * minSide, y:(yAxisOuterBias + axisBias + 0.025 * minSide) / 2},
            this._trimNumber((maxValue + minValue) / 2), fontSize, 'right');
        this._drawText({x:axisBias - 0.01 * minSide, y:yAxisOuterBias},
            this._trimNumber(maxValue), fontSize, 'right');

        const normArray = array.map((point, c)=>{
            return {x: axisBias + (c) * step,
                y:axisBias + (yAxisOuterBias - axisBias)/(maxValue - minValue)*(point.y - minValue)};
        });
        this._drawLine(normArray, linesWidth, '#FA9917');
        this._drawPoints(normArray, linesWidth, '#000000');
    }

    _drawPlot(context){
        this._canvas = document.getElementsByClassName('linePlot').item(0);
        this._plt = this._canvas.getContext('2d');
        this._drawBackground();
        this._drawGrid(context);
        this._drawAxis();
        this._drawGraph(context);
    }

    render(context) {
        this._context = context;
        this._parent.innerHTML = LinePlotTemplate();
        this._drawPlot(context);
    }
}
