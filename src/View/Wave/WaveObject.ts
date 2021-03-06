namespace View.Wave {
    export class WaveObject {
        get pointList(): View.Wave.WavePoint[] {
            return this._pointList;
        }

        private _pointList: WavePoint[];
        private startPoint: WavePoint;
        private endPoint: WavePoint;
        private _polyline;
        private _count0: number = 0;
        private _count1:number = 0;
        private _count2: number = 0;
        private _height: number;

        constructor(layer: SVGElement, waveCount: number) {
            let svg = document.getElementById("svg");
            let width: number = Number(svg.getAttribute("width"));
            let height: number = Number(svg.getAttribute("height"));

            this._polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            this._polyline.setAttributeNS(null, "fill", "#003");
            this._polyline.setAttributeNS(null, "opacity", "0.1");

            this._height = height * 0.5 - 50 * waveCount;

            this._count0 = 0.5 * waveCount;
            this._count1 = 1.0 * waveCount;
            this._count2 = 2 * Math.PI * Math.random();

            //this._count0 = 2 * Math.PI * Math.random();
            //this._count2 = 2 * Math.PI * Math.random();

            this._pointList = [];
            let n: number = width;
            for (let i: number = 0; i < n; i++) {
                let point = new WavePoint();
                this._pointList.push(point);
            }
            this.startPoint = new WavePoint(0, height);
            this.endPoint = new WavePoint(width, height);

            layer.appendChild(this._polyline);

            this.setWavePoint();
            this.draw();
        }

        public enterFrame(): void {
            this._count0 += 0.001;
            if (this._count0 > 2 * Math.PI) {
                this._count0 -= 2 * Math.PI;
            }
            this._count1 += 0.005;
            if (this._count1 > 2 * Math.PI) {
                this._count1 -= 2 * Math.PI;
            }
            this._count2 += 0.05;
            if (this._count2 > 2 * Math.PI) {
                this._count2 -= 2 * Math.PI;
            }
            this.setWavePoint();
            this.draw();
        }
        private setWavePoint()
        {
            let n: number = this._pointList.length;
            this._pointList = [];
            for (let i: number = 0; i < n; i++) {
                let x: number = i;
                //let y: number = this._height + (100 * Math.cos(x * 0.01 + this._count0)) + (5 * Math.cos(x * 0.1 + this._count2));
                let y: number = this._height + (100 * Math.cos(x * 0.001 + this._count0)) +
                    (50 * Math.cos(x * 0.01 + this._count0)) +
                    (5 * Math.cos(x * 0.05 + this._count2));
                let point: WavePoint = new WavePoint(x, y);
                this._pointList.push(point);
            }
        }

        private draw(): void {
            let value: string = this.startPoint.x + "," + this.startPoint.y + " ";
            let n: number = this._pointList.length;
            for (let i: number = 0; i < n; i++) {
                let point: WavePoint = this._pointList[i];

                value += point.x + "," + point.y + " ";
            }

            value += this.endPoint.x + "," + this.endPoint.y + " ";
            value += this.startPoint.x + "," + this.startPoint.y;

            this._polyline.setAttributeNS(null, "points", value);
        }

    }
}