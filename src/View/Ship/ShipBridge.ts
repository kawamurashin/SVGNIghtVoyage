namespace View.Ship
{
    export class ShipBridge extends ShipBase {

        private _chimney:ShipChimney;
        constructor() {
            super();
            this._image = document.getElementById("bridge");
            this._vy = 0;
            this._mass = 25;
            this.setPosition();
        }
        public setChimney(chimney:ShipChimney):void
        {
            this._chimney = chimney;
        }
        enterFrame(): void {
            let fy:number = 0.1 * (this._chimney.y - this.y);
            this._vy += (fy/this._mass)  - (0.3 * this._vy);
            this.y += this._vy;

            super.enterFrame();
        }


    }
}