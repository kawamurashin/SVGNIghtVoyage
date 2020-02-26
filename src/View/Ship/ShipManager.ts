///<reference path="../Smoke/SmokeManager.ts"/>
namespace View.Ship {
    import WaveObject = View.Wave.WaveObject;
    import WavePoint = View.Wave.WavePoint;
    import SmokeManager = View.Smoke.SmokeManager;

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
        private _shipChimney:ShipChimney;
        private _smokeManager: SmokeManager;

        constructor() {
            const handler = () => {
                this.smoke();
            };
            let svg = document.getElementById("svg");
            svg.innerHTML = svg_ship;
            this._ship = document.getElementById("ship");


            this._baseList = [];
            this._shipChimney = new ShipChimney();
            this._baseList.push(this._shipChimney);
            let bridge = new ShipBridge();
            this._baseList.push(bridge);
            let body = new ShipBody();
            this._baseList.push(body);

            bridge.setChimney(this._shipChimney);
            body.setBridge(bridge);


            /*
            this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._circle.setAttributeNS(null, "fill", "#F0F");
            this._circle.setAttributeNS(null, "cx", "0");
            this._circle.setAttributeNS(null, "cy", "0");
            this._circle.setAttributeNS(null, "r", "10");
            svg.appendChild(this._circle);
             */




            setInterval(handler, 500)

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

            //this._circle.setAttributeNS(null, "cx", wavePoint.x.toString());
            //this._circle.setAttributeNS(null, "cy", wavePoint.y.toString());

            this.setShipPosition(x);
        }

        public setWave(waveObject: View.Wave.WaveObject) {

            this._waveObject = waveObject;
            let x: number = 350;
            this.setShipPosition(x);
        }

        private smoke() {
            this._shipChimney.start()

            let theta:number = Math.atan2(100,5) + Math.PI *(this._currentTheta / 180)
            let x:number = this._x + 120 - 110 * Math.cos(theta);
            let y:number = this._y + 150 - 110 * Math.sin(theta);
            this._smokeManager.start(x, y, this._currentTheta);
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
            let rotate = "rotate(" + this._currentTheta + "," + 120 + "," + 150 + ")";

            this._ship.setAttributeNS(null, "transform", value + " " + rotate);
        }

        setSmokeManager(smokeManager: SmokeManager) {
            this._smokeManager = smokeManager;
        }
    }
}