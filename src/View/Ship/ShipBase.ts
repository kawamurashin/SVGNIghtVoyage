namespace View.Ship
{
    export class ShipBase {
        protected _px:number = 0;
        protected _py:number = 0;
        protected _mass:number = 1;
        public x:number = 0;
        public y:number = 0;
        protected _vx:number = 0;
        protected _vy:number = 0;
        //
        private k:number = 0.01;
        private u:number = 0.01;

        protected _image;
        constructor() {


        }
        protected setPosition()
        {
            let transform:string = this._image.getAttribute("transform");
            let list =transform.split(" ")
            let str:String;
            str = list[0];
            this._px = this.x = Number(str.substr(10));
            str = list[1];
            this._py = this.y = Number(str.substr(0,str.length-1));
        }
        public enterFrame():void
        {
            let fx:number = this.k * (this._px - this.x);
            this._vx += (fx / this._mass) - (this.u * this._vx);
            this.x += this._vx;

            let fy:number = this.k *(this._py - this.y);
            this._vy += (fy / this._mass) - (this.u * this._vy);
            this.y += this._vy;

            let value = "translate("+ this.x +"," + this.y + ")"
            this._image.setAttributeNS(null, "transform", value);

        }

    }
}