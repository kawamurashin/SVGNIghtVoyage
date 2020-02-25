///<reference path="Ship/ShipManager.ts"/>
///<reference path="Wave/WaveManager.ts"/>
namespace View
{
    import ShipManager = View.Ship.ShipManager;
    import WaveManager = View.Wave.WaveManager;

    export class ViewManager {
        private _shipManager:ShipManager;
        private _waveManager:WaveManager;
        constructor() {
            this._shipManager = new ShipManager();
            this._waveManager = new WaveManager();
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