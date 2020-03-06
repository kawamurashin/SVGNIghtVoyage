///<reference path="LinePoint.ts"/>
///<reference path="../../Wave/WaveObject.ts"/>
namespace View.Fisherman.Line {
    import RodManager = View.Fisherman.Rod.RodManager;
    import WaveObject = View.Wave.WaveObject;
    import WavePoint = View.Wave.WavePoint;

    export class LineManager {
        private _length: number = 40;
        //private _rodManager: RodManager;
        private _rodTop:LinePoint;
        private _floatPoint:LinePoint;
        private _rodTopX:number;
        private _rodTopY:number;
        private k:number = 0.1;
        private _layer: SVGElement;
        private _linePointList: LinePoint[] = [];

        private _wave:WaveObject;
        private readonly _path:SVGElement;

        constructor() {
            let svg = document.getElementById("svg");
            let layer:SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(layer);

            this._path = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            this._path.setAttribute("stroke", "#000");
            this._path.setAttribute("fill", "none");
            this._path.setAttribute("stroke-width", "1");
            this._path.setAttribute("stroke-linejoin", "round");



            layer.appendChild(this._path);
        }

        public enterFrame(rodTopX:number = null , rodTopY:number = null): void {
            let u: number = 0.03;
            let g: number = 0.003;
            let n: number = this._linePointList.length;
            if(this._linePointList.length == 0)
            {
                return
            }
            this._rodTop = this._linePointList[0];
            this._rodTop.x = rodTopX;
            this._rodTop.y = rodTopY;
            for (let i: number = 1; i < n; i++) {
                let linePoint: LinePoint = this._linePointList[i];
                linePoint.vy += g * linePoint.mass;
                linePoint.y += linePoint.vy;
            }
            for (let i: number = 0; i < n; i++) {
                let dx: number;
                let dy: number;
                let linePoint: LinePoint = this._linePointList[i];
                let prev: LinePoint;
                let next: LinePoint;
                if (i != 0) {
                    prev = this._linePointList[i - 1];
                    dx = prev.x - linePoint.x;
                    linePoint.vx += dx * this.k - u * linePoint.vx;
                    linePoint.x += linePoint.vx;

                    dy = prev.y - linePoint.y;
                    linePoint.vy += dy * this.k - u * linePoint.vy;
                    linePoint.y += linePoint.vy;

                    if (i != 1) {
                        prev.vx += -dx * this.k - u * prev.vx;
                        prev.x += prev.vx;
                        prev.vy += -dy * this.k - u * prev.vy;
                        prev.y += prev.vy;
                    }
                }
                if (i != this._linePointList.length - 1) {
                    //つぎの計算
                    next = this._linePointList[i + 1];
                    dx = next.x - linePoint.x;
                    dy = next.y - linePoint.y;
                    if(i != 0)
                    {
                        linePoint.vx += dx * this.k - u * linePoint.vx;
                        linePoint.vy += dy * this.k - u * linePoint.vy;

                        linePoint.x += linePoint.vx;
                        linePoint.y += linePoint.vy;
                    }

                    next.vx += -dx * this.k - u * next.vx;
                    next.vy += -dy * this.k - u * next.vy;

                    next.x += next.vx;
                    next.y += next.vy;
                }
            }
            //
            if(this._floatPoint.isSwing == false)
            {
                let fx:number = Math.floor(this._floatPoint.x);
                const pointList:WavePoint[] = this._wave.pointList;
                if(fx > 0 && fx < pointList.length)
                {
                    const point:WavePoint = pointList[fx];
                    if(this._floatPoint.y > point.y)
                    {

                        this._floatPoint.isFloating = true;
                        this._floatPoint.vx = 0;
                        this._floatPoint.vy = -0.5;
                        this._floatPoint.y += this._floatPoint.vy;
                    }
                }
            }
            if(this.k < 0.001)
            {
                let dk:number = 0.001  - this.k;
                this.k += dk * 0.3;
                if(this.k > 0.001)
                {
                    this.k = 0.001;
                }
            }

            this.draw();
        }

        private init(): void {
            const svg = document.getElementById("svg");
            this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(this._layer);
            this._linePointList = [];
            let n: number = 15;
            for (let i: number = 0; i < n; i++) {
                let theta: number = -0.25 * Math.PI + 0.5 * Math.PI;
                let dx: number = (this._length * i) * Math.cos(theta);
                let dy: number = (this._length * i) * Math.sin(theta);
                let x: number = this._rodTopX;
                let y: number = this._rodTopY;
                let mass: number = 1;


                if (i == n - 1) {
                    mass = 100;
                }
                let linePoint = new LinePoint(this._layer, x, y, mass);
                this._linePointList.push(linePoint);
            }
            this._rodTop = this._linePointList[0];
            this._floatPoint = this._linePointList[this._linePointList.length - 1];
            this._floatPoint.float();
        }

        private draw():void
        {
            let string:string = "";
            let n:number = this._linePointList.length;
            for(let i:number= 0 ; i<n;i++)
            {
                let linePoint:LinePoint = this._linePointList[i];
                string += linePoint.x+","+linePoint.y  + " ";
            }

            this._path.setAttribute("points", string);
        }

        setRodTop(x: number, y: number) {

            this._rodTopX = x;
            this._rodTopY = y;

            this.init();
        }

        swingBack()
        {
            this.k = 0.1;

            this._floatPoint.isFloating = false;
            this._floatPoint.isSwing = true;
        }

        releaseLine() {
            this.k = 0.00001;
            this._floatPoint.isSwing = false;

            let v:number = 20;
            let value:number = 20 + 20 * Math.random();
            let theta:number = -0.15*Math.PI;
            let n:number = this._linePointList.length
            for(let i:number = 0;i<n;i++)
            {
                v = value * (i/n)* (i/n);
                let linePoint = this._linePointList[i];
                linePoint.vx = v*Math.cos(theta)
                linePoint.vy = v*Math.sin(theta)
            }
            this._floatPoint.vx = v * Math.cos(theta);
            this._floatPoint.vy = v * Math.sin(theta);
        }

        setWave(wave: WaveObject) {

            this._wave = wave;

        }
    }
}