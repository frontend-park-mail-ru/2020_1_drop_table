'use strict';
import CirclePlotTemplate from './CirclePlot.hbs';

export default class CirclePlotComponent {

    constructor(parent = document.body) {
        this._parent = parent;
        this._plt = null;
        this._context = null;
    }

    _flipAxis(point){
        return {
            x:point.x,
            y:this._plt.canvas.height - point.y
        };
    }

    _drawLine(from, to, width=1, color='#000000'){
        from = this._flipAxis(from);
        to = this._flipAxis(to);

        this._plt.beginPath();
        this._plt.moveTo(from.x, from.y);
        this._plt.lineTo(to.x, to.y);
        this._plt.lineWidth = width;
        this._plt.strokeStyle = color;
        this._plt.stroke();
        this._plt.closePath();
    }

    _drawArc(center, radius, width, startAngle, endAngle, color = '#000000'){
        this._plt.beginPath();
        this._plt.lineWidth = width;
        this._plt.arc(center.x,center.y,radius,startAngle,endAngle);
        this._plt.strokeStyle = color;
        this._plt.stroke();
        this._plt.closePath();
    }

    _drawCentralCircle(){
        const minSide = Math.min(this._plt.canvas.height, this._plt.canvas.width);
        const center = {x:this._plt.canvas.width/2, y:this._plt.canvas.height/2};
        this._drawArc(center, 0.15 * (minSide/2), minSide / 20, 0, 2 * Math.PI);
    }

    _drawInterestArcs(array){
        const minSide = Math.min(this._plt.canvas.height, this._plt.canvas.width);
        const center = {x:this._plt.canvas.width/2, y:this._plt.canvas.height/2};
        let angle = 0;
        for(let arc of array){
            this._drawArc(center, 0.75 * (minSide/2), minSide / 4.5, angle,
                angle + 2 * Math.PI * arc.percent, arc.color);
            this._drawLine({
                x:center.x + Math.cos(angle)*0.53 * (minSide/2),
                y: center.y - Math.sin(angle)*0.53 * (minSide/2)
            },
            {
                x: center.x + Math.cos(angle) * 0.97 * (minSide / 2),
                y: center.y - Math.sin(angle) * 0.97 * (minSide / 2)
            }, minSide / 300);
            angle += 2 * Math.PI * arc.percent;
        }
    }

    _drawBezel(){
        const minSide = Math.min(this._plt.canvas.height, this._plt.canvas.width);
        const center = {x:this._plt.canvas.width/2, y:this._plt.canvas.height/2};

        this._drawArc(center, 0.53 * (minSide/2), minSide / 300, 0,
            2 * Math.PI);
        this._drawArc(center, 0.97 * (minSide/2), minSide / 300, 0,
            2 * Math.PI);
    }

    _drawPlot(context){
        this._drawCentralCircle();
        this._drawInterestArcs(context);
        this._drawBezel();
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
        this._parent.innerHTML = CirclePlotTemplate();
        const canvas = document.getElementsByClassName('circlePlot').item(0);
        this._plt = canvas.getContext('2d');
        this._context = context;
        this._resize();
        window.addEventListener('resize', this._resize.bind(this));
    }
}
