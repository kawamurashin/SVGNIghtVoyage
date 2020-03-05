namespace View.Fisherman.Line
{
    export class LinePoint {
        get mass(): number {
            return this._mass;
        }

        get y(): number {
            return this._y;
        }

        set y(value: number) {
            this._y = value;
            this._circle.setAttribute("cy", this._y.toString());
        }
        get x(): number {
            return this._x;
        }

        set x(value: number) {
            this._x = value;
            this._circle.setAttribute("cx", this._x.toString());
        }
        public vx:number = 0;
        public vy:number = 0;
        private _x:number;
        private _y:number;
        private _mass:number;



        private readonly _circle:SVGElement;

        constructor(layer:SVGElement,x:number ,y:number, mass:number = 1) {
            console.log("start")
            this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._circle.setAttribute("r", "3");
            this._circle.setAttribute("fill", "#F0F");
            layer.appendChild(this._circle);

            this.x = x;
            this.y = y;
            this._mass = mass;
        }
    }
}