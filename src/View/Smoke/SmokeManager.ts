namespace View.Smoke {
    export class SmokeManager {
        private readonly _layer: SVGElement;
        private _smokeList: SmokeObject[];

        constructor() {
            let svg = document.getElementById("svg");
            this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(this._layer);

            this._smokeList = [];
        }

        public start(x: number, y: number, theta: number) {
            let smoke: SmokeObject = new SmokeObject(this._layer, x, y, theta - 90);
            this._smokeList.push(smoke);
        }

        public enterFrame(): void {
            let n: number = this._smokeList.length;
            for (let i: number = 0; i < n; i++) {
                let smoke: SmokeObject = this._smokeList[i];
                let dx: number = 0;
                smoke.vx += dx - 0.05 * smoke.vx;
                smoke.x += smoke.vx - 0.3 + (0.3 * Math.random());
                let dy: number = 0;
                smoke.vy += dy - 0.05 * smoke.vy;
                smoke.y += smoke.vy + -0.4;

                smoke.setPosition(smoke.x, smoke.y);
            }
            this.checkSmokePosition()
        }

        private checkSmokePosition(): void {
            let n: number = this._smokeList.length;
            for (let i: number = 0; i < n; i++) {
                let smoke: SmokeObject = this._smokeList[i];

                smoke.x += smoke.vx - 0.3 + (0.3 * Math.random());
                if (smoke.x < 100 || smoke.y < 100) {
                    smoke.remove();
                    this._smokeList.splice(i, 1);
                    this.checkSmokePosition();
                    break;
                }
            }
        }
    }
}