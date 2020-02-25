///<reference path="Ship/ShipManager.ts"/>
namespace View
{
    import ShipManager = View.Ship.ShipManager;

    export class ViewManager {
        private _shipManager:ShipManager;
        constructor() {
            this._shipManager = new ShipManager();
        }

        public enterFrame():void
        {
            this._shipManager.enterFrame();

        }

        public resize():void
        {

        }
    }
}