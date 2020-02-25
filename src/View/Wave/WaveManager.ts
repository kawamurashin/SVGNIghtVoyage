namespace View.Wave
{
    export class WaveManager {

        private _waveList:WaveObject[];
        private _layer:SVGElement
        constructor() {
            let svg = document.getElementById("svg");
            this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(this._layer);
            this.setWave();
        }
        private setWave():void
        {
            let svg = document.getElementById("svg");
            let width:number = Number(svg.getAttribute("width"));
            let height:number = Number(svg.getAttribute("height"));
            this._waveList = [];
            let wave = new WaveObject(width , height , this._layer);
            this._waveList.push(wave);
        }
        public enterFrame():void
        {
            let n:number = this._waveList.length;
            for(let i:number = 0;i<n;i++)
            {
                let wave = this._waveList[i];
                wave.enterFrame();
            }

        }

    }
}