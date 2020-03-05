namespace View.Fisherman.Rod
{
    export class RodManager {
        get linePointY(): number {
            return this._linePointY;
        }
        get linePointX(): number {
            return this._linePointX;
        }

        get theta(): number {
            return this._theta;
        }
        private _hand:SVGElement;
        private _theta:number;
        private _length:number = 120;
        private _g: SVGElement;
        private _linePointX:number;
        private _linePointY:number;
        constructor() {
        }
        public setHand(hand:SVGElement):void
        {
            this._hand = hand;
            this.init();
        }
        private init()
        {
            const svg = document.getElementById("svg");

            this._g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(this._g);
            const body = document.createElementNS("http://www.w3.org/2000/svg", "rect");

            let handX:string = (this._hand.getAttribute("cx")).toString();
            let handY:string = (this._hand.getAttribute("cy")).toString();

            body.setAttribute("x", handX);
            body.setAttribute("y", handY);
            body.setAttribute("width", this._length.toString());
            body.setAttribute("height", "3");
            body.setAttribute("fill", "#000");

            //transform="translate(30) rotate(45 50 50)"
            body.id=("rod");

            //const translate:string = "translate(" + 0 +" " + 0 + ")";
            //const rotate:string = "rotate(" + this._theta +" " + handX + " " + handY +")";
            //this._g.setAttribute("transform", rotate);
            this._g.appendChild(body);
            this.setRodRotation(-45);
        }

        enterFrame()
        {

        }
        public setRodRotation(value:number):void
        {
            this._theta = value;

            let handX:number = Number(this._hand.getAttribute("cx"));
            let handY:number = Number(this._hand.getAttribute("cy"));

            const rotate:string = "rotate(" + this._theta +" " + handX.toString() + " " + handY.toString() +")";
            this._g.setAttribute("transform", rotate);

            let radian:number = Math.PI * (this.theta / 180);
            this._linePointX = handX + this._length * Math.cos(radian);
            this._linePointY = handY + this._length * Math.sin(radian);

        }

    }
}