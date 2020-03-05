///<reference path="Ship/ShipManager.ts"/>
///<reference path="Wave/WaveManager.ts"/>
///<reference path="Smoke/SmokeManager.ts"/>
///<reference path="Moon/MoonManager.ts"/>
///<reference path="Fisherman/FishermanManager.ts"/>
namespace View
{
    import ShipManager = View.Ship.ShipManager;
    import WaveManager = View.Wave.WaveManager;
    import SmokeManager = View.Smoke.SmokeManager;
    import MoonManager = View.Moon.MoonManager;
    import FishermanManager = View.Fisherman.FishermanManager;

    export class ViewManager {
        private _shipManager:ShipManager;
        private _waveManager:WaveManager;
        private _smokeManager:SmokeManager;
        private _moonManager:MoonManager;
        private _fishermanManager:FishermanManager;
        constructor() {
            this._shipManager = new ShipManager();
            this._waveManager = new WaveManager();
            //
            let waveObject = this._waveManager.getShipWave();
            this._shipManager.setWave(waveObject);
            //
            this._smokeManager = new SmokeManager();

            this._shipManager.setSmokeManager(this._smokeManager);

            this._moonManager = new MoonManager();

            this._fishermanManager = new FishermanManager();
            this._fishermanManager.setShipManager(this._shipManager);


            const click = () =>
            {
                console.log("clickfdfdfdfd")
            }
            const svg = document.getElementById("svg");
            svg.addEventListener("click" ,click);
        }

        public enterFrame():void
        {
            this._shipManager.enterFrame();
            this._waveManager.enterFrame();
            this._smokeManager.enterFrame();
            this._moonManager.enterFrame();
            this._fishermanManager.enterFrame();
        }

        public resize():void
        {

        }
    }
}