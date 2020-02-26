///<reference path="ShipBase.ts"/>
namespace View.Ship
{
    export class ShipChimney extends ShipBase{
        constructor() {
            super();
            this._image = document.getElementById("chimney");
            this._mass = 1;
            this.setPosition();
        }

        public enterFrame():void
        {
            super.enterFrame();

        }
        public start():void
        {
            this._vy = 2;
        }


    }
}