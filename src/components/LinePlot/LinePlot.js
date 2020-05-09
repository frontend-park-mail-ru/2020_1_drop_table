'use strict';
import LinePlotTemplate from './LinePlot.hbs';

export default class LinePlotComponent {

    constructor(parent = document.body) {
        this._parent = parent;
        this._context = null;
        this._plt = null
    }

    _flipAxis(point){
        return {
            x:point.x,
            y:this._plt.canvas.height - point.y
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

    _getMaxMinFromContext(context) {
        this._yMinValue = context.array[0].array[0].y;
        this._yMaxValue = context.array[0].array[0].y;

        for (let subContext of context.array) {
            for (let point of subContext.array) {
                if (this._yMinValue > point.y) {
                    this._yMinValue = point.y;
                } else if (this._yMaxValue < point.y) {
                    this._yMaxValue = point.y;
                }
            }
        }
    }

    _drawText(point, text, size='30px', align='center', angle=0, font='Montserrat', color='#000000'){
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
        const maxSide = Math.max(this._plt.canvas.height, this._plt.canvas.width);
        const axisBias = 0.1 * maxSide;
        const axisPreBias = 0.075 * maxSide;
        const xAxisEndPoint = 0.9 * this._plt.canvas.width;
        const yAxisEndPoint = 0.9 * this._plt.canvas.height;
        const linesWidth = maxSide / 300;

        this._drawLine([{x:axisPreBias, y:axisBias}, {x:xAxisEndPoint, y:axisBias}], linesWidth, '#000000');
        this._drawLine([{x:axisBias, y:axisPreBias}, {x:axisBias, y:yAxisEndPoint}], linesWidth, '#000000');
    }

    _drawGrid(array){
        const maxSide = Math.max(this._plt.canvas.height, this._plt.canvas.width);
        const axisBias = 0.1 * maxSide;
        const xAxisOuterBias = 0.9 * this._plt.canvas.width;
        const yAxisOuterBias = 0.85 * this._plt.canvas.height;
        const step = (xAxisOuterBias - axisBias) / array.length;
        const linesWidth = maxSide / 300;
        const fontSize = step / 7 + 'px';
        const bigFontSize = step / 5 + 'px';

        (array.slice(1)).forEach((point, c)=>{
            this._drawText({x:axisBias + (c+1) * step, y:axisBias - 0.025 * maxSide}, point.x, fontSize);
            this._drawLine([{x:axisBias + (c+1) * step, y:axisBias},
                {x:axisBias + (c+1) * step, y:yAxisOuterBias}], linesWidth, '#BFBFBF');
        })

        this._drawText({x:axisBias - 0.01 * maxSide, y:axisBias + 0.025 * maxSide},
            this._trimNumber((this._yMaxValue - this._yMinValue)*0.04), fontSize, 'right');
        this._drawText({x:axisBias - 0.01 * maxSide, y:(yAxisOuterBias + axisBias + 0.025 * maxSide) / 2},
            this._trimNumber((this._yMaxValue + this._yMinValue) / 2), fontSize, 'right');
        this._drawText({x:axisBias - 0.01 * maxSide, y:yAxisOuterBias},
            this._trimNumber(this._yMaxValue), fontSize, 'right');

        this._drawText({x:axisBias, y:0.025 * maxSide}, this._context.textX, bigFontSize, 'left');
        this._drawText({x:0.025 * maxSide, y:axisBias}, this._context.textY, bigFontSize, 'left', -1.57);
    }

    _drawBackground(){
        this._plt.fillStyle = '#F1F0F0';
        this._plt.fillRect(0, 0, this._plt.canvas.width, this._plt.canvas.height);
    }

    _drawGraph(array, color='#FA9917') {
        const maxSide = Math.max(this._plt.canvas.height, this._plt.canvas.width);
        const axisBias = 0.1 * maxSide;
        const xAxisOuterBias = 0.9 * this._plt.canvas.width;
        const yAxisOuterBias = 0.84 * this._plt.canvas.height;
        const step = (xAxisOuterBias - axisBias) / array.length;
        const linesWidth = maxSide / 100;

        const normArray = array.map((point, c)=>{
            return {x: axisBias + (c) * step,
                y:axisBias + (yAxisOuterBias - axisBias)/
                    (this._yMaxValue - this._yMinValue)*(point.y - this._yMinValue)};
        });
        this._drawLine(normArray, linesWidth, color);
        this._drawPoints(normArray, linesWidth, '#000000');
    }

    _drawPlot(context){
        this._drawBackground();
        this._drawGrid(context.array[0].array);
        this._drawAxis();
        for(let subContext of context.array){
            this._drawGraph(subContext.array, subContext.color);
        }
    }

    _resize(){
        if (this._plt.canvas !== this._parent.clientWidth ||
            this._plt.canvas.height !== this._parent.clientHeight) {
            this._plt.canvas.width = this._parent.clientWidth;
            this._plt.canvas.height = this._parent.clientHeight;
            this._drawPlot(this._context);
        }
    }

    render(context) {
        window.addEventListener('resize', this._resize.bind(this));
        this._context = context;
        this._getMaxMinFromContext(context);
        this._parent.innerHTML = LinePlotTemplate();
        const canvas = document.getElementsByClassName('linePlot').item(0);
        this._plt = canvas.getContext('2d');
        this._resize();
    }
}
