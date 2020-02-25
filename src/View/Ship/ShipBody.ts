///<reference path="ShipBase.ts"/>
namespace View.Ship
{
    export class ShipBody extends ShipBase{
        private _bridge:ShipBridge;
        constructor() {
            super();
            this._image = document.getElementById("body");
            this._vy = 0;
            this._mass = 50;
            this.setPosition();
        }
        public setBridge(bridge:ShipBridge):void
        {
            this._bridge = bridge;
        }
        enterFrame(): void {

            let fy:number = 0.1 * (this._bridge.y - this.y);
            this._vy += (fy/this._mass)  - (0.3 * this._vy);
            this.y += this._vy;

            super.enterFrame();
        }

    }
}