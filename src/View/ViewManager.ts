///<reference path="Ship/ShipManager.ts"/>
///<reference path="Wave/WaveManager.ts"/>
///<reference path="Smoke/SmokeManager.ts"/>
namespace View
{
    import ShipManager = View.Ship.ShipManager;
    import WaveManager = View.Wave.WaveManager;
    import SmokeManager = View.Smoke.SmokeManager;

    export class ViewManager {
        private _shipManager:ShipManager;
        private _waveManager:WaveManager;
        private _smokeManager:SmokeManager;
        constructor() {
            this._shipManager = new ShipManager();
            this._waveManager = new WaveManager();
            //
            let waveObject = this._waveManager.getShipWave();
            this._shipManager.setWave(waveObject);
            //
            this._smokeManager = new SmokeManager();

            this._shipManager.setSmokeManager(this._smokeManager)
        }

        public enterFrame():void
        {
            this._shipManager.enterFrame();
            this._waveManager.enterFrame();
            this._smokeManager.enterFrame();
        }

        public resize():void
        {

        }
    }
}