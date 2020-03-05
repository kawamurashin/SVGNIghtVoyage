namespace View.Moon
{
    export class MoonManager {
        private cx:number = 1600;
        private cy:number = 120;

        private _count:number;

        private _layer:SVGElement;
        private _polyline:SVGElement;
        private _pointList:MoonPoint[];
        constructor() {

            this._count = 2 * Math.PI * Math.random();
            let svg = document.getElementById("svg");
            let layer:SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
            let rotate:string = "rotate(70,1600,120)";
            layer.setAttributeNS(null, "transform",  rotate);
            svg.appendChild(layer);

            this._polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            this._polyline.setAttributeNS(null, "fill", "#ff0");
            this._polyline.setAttributeNS(null, "opacity", "0.3");
            layer.appendChild(this._polyline);
            this._pointList = [];
            let n:number = 180;
            for(let i:number = 0;i<n;i++)
            {

                let moonPoint = new MoonPoint();

                this._pointList.push(moonPoint);
            }
            this.setPoint();
            this.draw();

        }
        private draw(): void {
            let value: string = "";
            let n: number = this._pointList.length;
            for (let i: number = 0; i < n; i++) {
                let point: MoonPoint = this._pointList[i];
                value += point.x + "," + point.y + " ";
            }

            this._polyline.setAttributeNS(null, "points", value);
        }
        private setPoint():void
        {
            let n:number = this._pointList.length;
            for(let i:number = 0;i<n;i++)
            {
                let moonPoint:MoonPoint = this._pointList[i];
                let theta:number = 2* Math.PI * (i/n) - Math.PI;
                let x:number = this.cx + 50 * Math.cos(theta);
                let y:number ;
                if(i > Math.floor(n*0.5))
                {
                    y = this.cy + 50 * Math.cos(this._count) * Math.sin(theta);
                }
                else
                {
                    y = this.cy + 50 * Math.sin(theta);
                }

                moonPoint.x = x;
                moonPoint.y = y;
            }

        }
        public enterFrame():void
        {
            this._count += 0.0002;
            if(this._count > 2* Math.PI)
            {
                this._count -= 2* Math.PI;
            }
            this.setPoint()
            this.draw();
        }
    }
}