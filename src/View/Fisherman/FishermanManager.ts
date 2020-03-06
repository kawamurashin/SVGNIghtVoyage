///<reference path="Rod/RodManager.ts"/>
///<reference path="Line/LineManager.ts"/>
///<reference path="../Ship/ShipManager.ts"/>
///<reference path="../Wave/WaveObject.ts"/>
namespace View.Fisherman
{
    import RodManager = View.Fisherman.Rod.RodManager;
    import LineManager = View.Fisherman.Line.LineManager;
    import ShipManager = View.Ship.ShipManager;
    import WaveObject = View.Wave.WaveObject;
    export class FishermanManager {
        private _lineManager:LineManager;
        //private _rodManager:RodManager;
        private _fishermanLayer:SVGElement;
        private _layer:SVGElement;
        private _rodTopX:number;
        private _rodTopY:number;
        private _x:number;
        private _y:number;
        private _shipManager:ShipManager;
        private _fishermanTheta:number;
        //
        private _rodK:number = 0.05;
        private _rodU:number = 0.1;
        private _rodVr:number = 0;
        private _targetRodRotation:number = 0
        private _rodRotation:number = 0;
        private _waveObject:WaveObject;
        //
        //private _hand:SVGElement;
        private _id:number;
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
            /*
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", "0");
            circle.setAttribute("cy", "0");
            circle.setAttribute("r", "3");
            circle.setAttribute("fill", "#F00");
            this._fishermanLayer.appendChild(circle);
             */
            /*
            this._hand = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._hand.setAttribute("cx", "0");
            this._hand.setAttribute("cy", "0");
            this._hand.setAttribute("r", "2");
            this._hand.setAttribute("fill", "yellow");
            svg.appendChild(this._hand);
             */

            //this._rodManager = new RodManager();
            //this._rodManager.setHand(this._hand);

            this._lineManager = new LineManager();
            //this._lineManager.setRod(this._rodManager);
            //this._lineManager.setRodTop()
        }
        public swing():void
        {
            const handler = () =>
            {
              this.swing2();
            };
            clearTimeout(this._id);
            this._lineManager.swingBack();
            this._targetRodRotation = -80;



            this._id = setTimeout(handler , 1000)

        }
        private swing2()
        {
            const handler = () =>
            {
                this.swing3();
            };
            const handler2 = () =>
            {
                this.releaseLine();
            };
            this._targetRodRotation = 80;

            this._id = setTimeout(handler , 200);
            setTimeout(handler2 , 60)
        }
        private releaseLine():void
        {
            this._lineManager.releaseLine()
        }
        private swing3()
        {
            this._targetRodRotation = 0;
        }
        private setPosition(x:number, y:number ,theta:number):void
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


            rotate = "rotate(" + this._fishermanTheta + ")";
            this._fishermanLayer.setAttributeNS(null, "transform", rotate);

            let rodTheta:number = -0.4 * Math.PI + (Math.PI * (this._fishermanTheta + theta)/180);
            let rodRadius:number = 80;

            this._rodTopX = x + 120 + localRadius* Math.cos(localTheta) + rodRadius * Math.cos(rodTheta);
            this._rodTopY = y + 150 + localRadius* Math.sin(localTheta) + rodRadius * Math.sin(rodTheta);

            /*
            transform = "translate("+ this._rodTopX +","+ this._rodTopY +")";
            this._hand.setAttributeNS(null, "transform", transform );
            */
        }

        //private count = 0;
        public enterFrame()
        {
            /*
            this.count += 0.03;
            if(this.count > 2*Math.PI)
            {
                this.count += 2*Math.PI
            }
            */
            let dr = this._targetRodRotation -  this._rodRotation;
            this._rodVr += dr * this._rodK - this._rodU * this._rodVr;
            this._rodRotation += this._rodVr;

            this._fishermanTheta =-1 * this._shipManager.currentTheta + this._rodRotation;
            this.setPosition(this._shipManager.x,this._shipManager.y ,this._shipManager.currentTheta);
            //this._rodManager.setRodRotation(-85 + 100 * Math.cos(this.count));
            this._lineManager.enterFrame(this._rodTopX, this._rodTopY);
        }

        setShipManager(shipManager: ShipManager) {
            this._shipManager = shipManager;
            this._fishermanTheta =-1 * this._shipManager.currentTheta;
            this.setPosition(this._shipManager.x,this._shipManager.y ,this._shipManager.currentTheta);
            this._lineManager.setRodTop(this._rodTopX, this._rodTopY);
        }

        setWave(wave: WaveObject) {


            this._lineManager.setWave(wave);

        }
    }
}