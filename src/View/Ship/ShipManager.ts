namespace View.Ship
{
    export class ShipManager {
        private _x:number;
        private _y:number;
        private _baseList:ShipBase[];
        constructor() {
            let svg = document.getElementById("svg");
            svg.innerHTML = svg_ship;
            let ship = document.getElementById("ship");

            this._x = 100;
            this._y = 0;
            let value = "translate("+ this._x +"," + this._y + ")";
            ship.setAttributeNS(null, "transform", value);

            this._baseList = [];
            let chimney = new ShipChimney();
            this._baseList.push(chimney);
            let bridge = new ShipBridge();
            this._baseList.push(bridge);
            let body = new ShipBody();
            this._baseList.push(body);

            bridge.setChimney(chimney);
            body.setBridge(bridge);

        }
        public enterFrame():void
        {
            let n:number = this._baseList.length;
            for(let i:number = 0;i<n;i++)
            {
                let base = this._baseList[i];
                base.enterFrame();
            }
        }

    }
}