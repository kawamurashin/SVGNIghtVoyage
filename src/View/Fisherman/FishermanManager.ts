///<reference path="Rod/RodManager.ts"/>
///<reference path="Line/LineManager.ts"/>
///<reference path="../Ship/ShipManager.ts"/>
namespace View.Fisherman
{
    import RodManager = View.Fisherman.Rod.RodManager;
    import LineManager = View.Fisherman.Line.LineManager;
    import ShipManager = View.Ship.ShipManager;

    export class FishermanManager {
        get linePointY(): number {
            return this._linePointY;
        }
        get linePointX(): number {
            return this._linePointX;
        }

        get theta(): number {
            return this._theta;
        }



        private _lineManager:LineManager;
        private _rodManager:RodManager;


        private _fishermanLayer:SVGElement;
        private _layer:SVGElement;
        private _linePointX:number;
        private _linePointY:number;
        private _theta:number;
        private _x:number;
        private _y:number;
        private _shipManager:ShipManager;
        //
        private _hand:SVGElement;
        constructor() {
            const svg = document.getElementById("svg");
            this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(this._layer);

            this._fishermanLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            this._layer.appendChild(this._fishermanLayer);

            let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            this._fishermanLayer.appendChild(g);
            g.innerHTML = svg_fisherman;
            g.setAttributeNS(null, "transform", "translate(-18,-80)");

            /*
            const body = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            body.setAttribute("x", "0");
            body.setAttribute("y", "0");
            body.setAttribute("width" , "100");
            body.setAttribute("height" , "100");
            body.setAttribute("fill", "#0F0");
            this._layer.appendChild(body);
            */

            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", "0");
            circle.setAttribute("cy", "0");
            circle.setAttribute("r", "3");
            circle.setAttribute("fill", "#F00");
            this._fishermanLayer.appendChild(circle);



            this._hand = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._hand.setAttribute("cx", "0");
            this._hand.setAttribute("cy", "0");
            this._hand.setAttribute("r", "2");
            this._hand.setAttribute("fill", "yellow");
            svg.appendChild(this._hand);

            this._rodManager = new RodManager();
            this._rodManager.setHand(this._hand);

            this._lineManager = new LineManager();
            this._lineManager.setRod(this._rodManager);

        }
        public setPosition(x:number, y:number ,theta:number):void
        {
            let t = Math.atan2(150,120) + Math.PI * (theta/180);
            let d:number = Math.sqrt(150*150 + 120*120);


            let localTheta:number =  Math.PI * (theta/180) + -0.2*Math.PI;
            let localRadius:number = 120;

            let px = x + d*Math.cos(t) + localRadius *Math.cos(localTheta);
            let py = y + d*Math.sin(t)+ localRadius *Math.sin(localTheta);
            let transform = "translate("+ (px ) +","+ (py) +")";
            let rotate = "rotate(" + theta + "," + 120 + "," + 150 + ")";
            this._layer.setAttributeNS(null, "transform", transform + " " + rotate);

            let fishermanTheta =-1 * theta + (-20 + 40 * Math.cos(this.count));
            rotate = "rotate(" + fishermanTheta + ")";
            this._fishermanLayer.setAttributeNS(null, "transform", rotate);

            let rodTheta:number = -0.4* Math.PI + (Math.PI * (fishermanTheta + theta)/180);
            let rodRadius:number = 80;

            px = x + 120 + localRadius* Math.cos(localTheta) + rodRadius * Math.cos(rodTheta);
            py = y + 150 + localRadius* Math.sin(localTheta) + rodRadius * Math.sin(rodTheta);

            transform = "translate("+ px +","+ py +")";
            this._hand.setAttributeNS(null, "transform", transform );
        }

        private count = 0;
        public enterFrame()
        {
            this.setPosition(this._shipManager.x,this._shipManager.y ,this._shipManager.currentTheta);

            this.count += 0.03;
            if(this.count > 2*Math.PI)
            {
                this.count += 2*Math.PI
            }
            //this._rodManager.setRodRotation(-85 + 100 * Math.cos(this.count));


            this._lineManager.enterFrame();
        }

        setShipManager(shipManager: ShipManager) {
            this._shipManager = shipManager;

        }
    }
}