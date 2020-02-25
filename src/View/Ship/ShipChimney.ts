///<reference path="ShipBase.ts"/>
namespace View.Ship
{
    export class ShipChimney extends ShipBase{
        constructor() {
            super();
            const handler = ()=>
            {
                this._vy = 2;
            }

            this._image = document.getElementById("chimney");

            this._mass = 1;
            this.setPosition();

            setInterval(handler , 500)
        }

        public enterFrame():void
        {
            super.enterFrame();

        }


    }
}