///<reference path="LinePoint.ts"/>
namespace View.Fisherman.Line {
    import RodManager = View.Fisherman.Rod.RodManager;

    export class LineManager {
        private _length: number = 40;
        private _rodManager: RodManager;
        private _rodTop:LinePoint;


        private _layer: SVGElement;
        private _linePointList: LinePoint[];

        constructor() {
        }

        public setRod(rodManager: RodManager): void {
            this._rodManager = rodManager;
            this.init();
        }

        public enterFrame(rodTopX:number = null , rodTopY:number = null): void {

            let k: number = 0.3;
            let u: number = 0.1;
            let g: number = 0.08;
            let n: number = this._linePointList.length;

            this._rodTop = this._linePointList[0];

            this._rodTop.x = this._rodManager.linePointX;
            this._rodTop.y = this._rodManager.linePointY

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
                    linePoint.vx = dx * k - u * linePoint.vx;
                    linePoint.x += linePoint.vx;

                    dy = prev.y - linePoint.y;
                    linePoint.vy = dy * k - u * linePoint.vy;
                    linePoint.y += linePoint.vy;

                    if (i != 1) {
                        prev.vx = -dx * k - u * prev.vx;
                        prev.x += prev.vx;
                        prev.vy = -dy * k - u * prev.vy;
                        prev.y += prev.vy;
                    }
                }
                if (i != this._linePointList.length - 1) {
                    next = this._linePointList[i + 1];
                    dx = next.x - linePoint.x;
                    dy = next.y - linePoint.y;
                    if(i != 0)
                    {
                        linePoint.vx = dx * k - u * linePoint.vx;
                        linePoint.vy = dy * k - u * linePoint.vy;

                        linePoint.x += linePoint.vx;
                        linePoint.y += linePoint.vy;
                    }

                    next.vx = -dx * k - u * next.vx;
                    next.vy = -dy * k - u * next.vy;

                    next.x += next.vx;
                    next.y += next.vy;
                }
            }
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
                let x: number = this._rodManager.linePointX + dx;
                let y: number = this._rodManager.linePointY + dy;
                let mass: number = 1;


                if (i == n - 1) {
                    mass = 30;
                }
                let linePoint = new LinePoint(this._layer, x, y, mass);
                this._linePointList.push(linePoint);
            }


            /**/
            this._rodTop = this._linePointList[0];

        }

    }
}