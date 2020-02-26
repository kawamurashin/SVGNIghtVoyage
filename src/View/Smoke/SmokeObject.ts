namespace View.Smoke {
    export class SmokeObject {
        public vx:number = 0;
        public vy:number = 0;
        //
        public x:number;
        public y:number;
        private _smokeData:SmokeData;
        private _g:SVGElement;
        private _layer:SVGElement;
        constructor(layer: SVGElement , x:number, y:number, theta:number) {
            this._layer = layer;
            this._g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            this._layer.appendChild(this._g);
            let list:SmokeData[] = [
                new SmokeData(svg_smoke1, 15,12)
            ];
            this._smokeData = list[0];
            this._g.innerHTML = this._smokeData.string;
            this.setPosition(x,y);

            let rad:number = Math.PI * (theta/180);
            let v:number = 5;
            this.vx = v * Math.cos(rad);
            this.vy = v * Math.sin(rad);
        }
        public remove():void
        {
            this._layer.removeChild(this._g);
        }
        public setPosition(x:number , y:number):void
        {
            this.x = x;
            this.y = y;

            let valueX:number = this.x - this._smokeData.marginX;
            let valueY:number = this.y - this._smokeData.marginY;
            let value = "translate("+ valueX +"," + valueY + ")";
            this._g.setAttributeNS(null, "transform", value);
        }

    }
    class SmokeData {
        get marginY(): number {
            return this._marginY;
        }
        get marginX(): number {
            return this._marginX;
        }
        get string(): string {
            return this._string;
        }
        private readonly _string:string;
        private readonly _marginX:number;
        private readonly _marginY:number;
        constructor(string:string , marginX:number, marginY:number) {
            this._string = string;
            this._marginX = marginX;
            this._marginY = marginY;
        }

    }
}