namespace View.Wave
{
    export class WaveManager {

        private _waveList:WaveObject[];
        constructor() {
            this.setWave();
        }
        private setWave():void
        {
            let svg = document.getElementById("svg");
            let width:number = Number(svg.getAttribute("width"));
            let height:number = Number(svg.getAttribute("height"));


            this._waveList = [];

            let wave = new WaveObject(width , height);
            this._waveList.push(wave);





        }
        public enterFrame():void
        {

        }

    }
}