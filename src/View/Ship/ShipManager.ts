namespace View.Ship {
    import WaveObject = View.Wave.WaveObject;
    import WavePoint = View.Wave.WavePoint;

    export class ShipManager {
        private _x: number;
        private _y: number;
        private _marginX: number;
        private _marginY: number;
        private _circle: SVGElement;
        private _baseList: ShipBase[];
        private _ship;

        private _vr: number = 0;
        private _currentTheta: number = 0;
        //
        private _waveObject: WaveObject;

        constructor() {
            let svg = document.getElementById("svg");
            svg.innerHTML = svg_ship;
            this._ship = document.getElementById("ship");


            this._baseList = [];
            let chimney = new ShipChimney();
            this._baseList.push(chimney);
            let bridge = new ShipBridge();
            this._baseList.push(bridge);
            let body = new ShipBody();
            this._baseList.push(body);

            bridge.setChimney(chimney);
            body.setBridge(bridge);


            this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._circle.setAttributeNS(null, "fill", "#F00");
            this._circle.setAttributeNS(null, "cx", "0");
            this._circle.setAttributeNS(null, "cy", "0");
            this._circle.setAttributeNS(null, "r", "10");

            svg.appendChild(this._circle)

        }

        public enterFrame(): void {
            let n: number = this._baseList.length;
            for (let i: number = 0; i < n; i++) {
                let base = this._baseList[i];
                base.enterFrame();
            }
            //
            let x: number = 350;
            let wavePoint: WavePoint = this._waveObject.pointList[x];

            this._circle.setAttributeNS(null, "cx", wavePoint.x.toString());
            this._circle.setAttributeNS(null, "cy", wavePoint.y.toString());

            this.setShipPosition(x);
        }

        public setWave(waveObject: View.Wave.WaveObject) {

            this._waveObject = waveObject;
            let x: number = 350;
            this.setShipPosition(x);
        }

        private setShipPosition(x: number): void {
            let wavePoint: WavePoint = this._waveObject.pointList[x];
            let nextPoint: WavePoint = this._waveObject.pointList[x + 1];

            let theta: number = 180 * (Math.atan2(nextPoint.y - wavePoint.y, nextPoint.x - wavePoint.x) / Math.PI);

            let dTheta: number = theta - this._currentTheta;
            this._vr += dTheta * 0.001 - 0.5 * this._vr;
            this._currentTheta += this._vr;


            this._x = wavePoint.x - 120;
            this._y = wavePoint.y - 150;
            let value = "translate(" + this._x + "," + this._y + ")";
            //this._ship.setAttributeNS(null, "transform", value);

            let rotate = "rotate(" + this._currentTheta + "," + 120 + "," + 150 + ")";
            //this._ship.setAttributeNS(null, "transform", rotate);


            this._ship.setAttributeNS(null, "transform", value + " " + rotate);
        }
    }
}