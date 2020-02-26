namespace View.Smoke {
    export class SmokeObject {
        public vx:number = 0;
        public vy:number = 0;
        public vScale:number = 0;
        //
        public x:number;
        public y:number;
        public scale:number;
        private _smokeData:SmokeData;
        private readonly _g:SVGElement;
        private _layer:SVGElement;
        constructor(layer: SVGElement , x:number, y:number, theta:number) {
            /*
            let circle:SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttributeNS(null, "fill", "#FF0");
            circle.setAttributeNS(null, "cx", x.toString());
            circle.setAttributeNS(null, "cy", y.toString());
            circle.setAttributeNS(null, "r", "1");
            layer.appendChild(circle);
             */

            this._layer = layer;
            this._g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            this._layer.appendChild(this._g);
            let list:SmokeData[] = [
                new SmokeData(svg_smoke1, -194 - 15,-263 - 12 ),
                new SmokeData(svg_smoke2, -151 - 15,-220 - 12 ),
                new SmokeData(svg_smoke3, -97 - 15,-211 - 12 ),
                new SmokeData(svg_smoke4, -49 - 15,-180 - 12 )
            ];
            this._smokeData = list[Math.floor(Math.random() *list.length)];
            this._g.innerHTML = this._smokeData.string;

            let path = this._g.getElementsByTagName("path")[0];
            let translate = "translate(" + this._smokeData.marginX + " "+ this._smokeData.marginY +")"

            path.setAttributeNS(null, "transform", translate);

            this.setPosition(x,y , 0);

            let radian:number = Math.PI * (theta/180);
            let v:number = 5;
            this.vx = v * Math.cos(radian);
            this.vy = v * Math.sin(radian);
            this.vy = v * Math.sin(radian);


        }
        public remove():void
        {
            this._layer.removeChild(this._g);
        }
        public setPosition(x:number , y:number , scale:number):void
        {
            this.x = x;
            this.y = y;

            let valueX:number = this.x;
            let valueY:number = this.y;
            let value = "translate("+ valueX +"," + valueY + ")";

            this.scale = scale;
            let scaleValue:string = "scale(" + this.scale +")";

            //this._g.setAttributeNS(null, "transform", value);
            this._g.setAttributeNS(null, "transform", value+ " "+scaleValue);
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