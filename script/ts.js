var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View;
(function (View) {
    var Ship;
    (function (Ship) {
        var ShipManager = (function () {
            function ShipManager() {
                var svg = document.getElementById("svg");
                svg.innerHTML = svg_ship;
                var ship = document.getElementById("ship");
                this._x = 100;
                this._y = 0;
                var value = "translate(" + this._x + "," + this._y + ")";
                ship.setAttributeNS(null, "transform", value);
                this._baseList = [];
                var chimney = new Ship.ShipChimney();
                this._baseList.push(chimney);
                var bridge = new Ship.ShipBridge();
                this._baseList.push(bridge);
                var body = new Ship.ShipBody();
                this._baseList.push(body);
                bridge.setChimney(chimney);
                body.setBridge(bridge);
            }
            ShipManager.prototype.enterFrame = function () {
                var n = this._baseList.length;
                for (var i = 0; i < n; i++) {
                    var base = this._baseList[i];
                    base.enterFrame();
                }
            };
            return ShipManager;
        }());
        Ship.ShipManager = ShipManager;
    })(Ship = View.Ship || (View.Ship = {}));
})(View || (View = {}));
var View;
(function (View) {
    var ShipManager = View.Ship.ShipManager;
    var ViewManager = (function () {
        function ViewManager() {
            this._shipManager = new ShipManager();
        }
        ViewManager.prototype.enterFrame = function () {
            this._shipManager.enterFrame();
        };
        ViewManager.prototype.resize = function () {
        };
        return ViewManager;
    }());
    View.ViewManager = ViewManager;
})(View || (View = {}));
var ViewManager = View.ViewManager;
var main;
var svg_ship = "<g id=\"ship\"><path id=\"chimney\" d=\"M233.5,347c0-2-6-43-6-43l15-5-5,48Z\" transform=\"translate(-124.06 -299)\" style=\"fill:#200\"/><path id=\"bridge\" d=\"M247.11,327.23l-65.3,12.4s3.88,73.78,11.32,82.87l42.15-12.4C249.34,380.34,247.11,327.23,247.11,327.23Zm-56.85,22.45L201,348l.82,11.58-9.92,1.65Zm4.13,23.14-1.65-8.26,9.09-1.66.83,8.27Zm18.19-25.62v12.4l-7.44-.83L204.31,348Zm.82,24.8H206l-.83-9.92,8.26.82Z\" transform=\"translate(-124.06 -299)\" style=\"fill:#100\"/><path id=\"body\" d=\"M124.28,352.81s6.13,11.67,17.14,18.19c18.58,11,66.42,26.73,113.12,21.46s95.8-33.95,105.18-40l16.88-11A170.27,170.27,0,0,1,372,363.11c-6.37,21.44-11.11,43.83-39.3,70.85C298.18,467,221.53,465.62,176,445.6c-31.09-13.68-42.26-44.55-49.48-72.92C123,359,124.28,352.81,124.28,352.81Z\" transform=\"translate(-124.06 -299)\"/></g>";
var Main = (function () {
    function Main() {
        var _this = this;
        var interval = function () {
            _this.enterFrame();
        };
        var resize = function () {
            _this.resize();
        };
        this._viewManager = new ViewManager();
        window.addEventListener('resize', resize);
        var fps = 60 / 1000;
        setInterval(interval, fps);
    }
    Main.prototype.enterFrame = function () {
        this._viewManager.enterFrame();
    };
    Main.prototype.resize = function () {
        this._viewManager.resize();
    };
    return Main;
}());
window.addEventListener("load", function () {
    main = new Main();
});
var View;
(function (View) {
    var Ship;
    (function (Ship) {
        var ShipBase = (function () {
            function ShipBase() {
                this._px = 0;
                this._py = 0;
                this._mass = 1;
                this.x = 0;
                this.y = 0;
                this._vx = 0;
                this._vy = 0;
                this.k = 0.01;
                this.u = 0.01;
            }
            ShipBase.prototype.setPosition = function () {
                var transform = this._image.getAttribute("transform");
                var list = transform.split(" ");
                var str;
                str = list[0];
                this._px = this.x = Number(str.substr(10));
                str = list[1];
                this._py = this.y = Number(str.substr(0, str.length - 1));
            };
            ShipBase.prototype.enterFrame = function () {
                var fx = this.k * (this._px - this.x);
                this._vx += (fx / this._mass) - (this.u * this._vx);
                this.x += this._vx;
                var fy = this.k * (this._py - this.y);
                this._vy += (fy / this._mass) - (this.u * this._vy);
                this.y += this._vy;
                var value = "translate(" + this.x + "," + this.y + ")";
                this._image.setAttributeNS(null, "transform", value);
            };
            return ShipBase;
        }());
        Ship.ShipBase = ShipBase;
    })(Ship = View.Ship || (View.Ship = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Ship;
    (function (Ship) {
        var ShipBody = (function (_super) {
            __extends(ShipBody, _super);
            function ShipBody() {
                var _this = _super.call(this) || this;
                _this._image = document.getElementById("body");
                _this._vy = 0;
                _this._mass = 50;
                _this.setPosition();
                return _this;
            }
            ShipBody.prototype.setBridge = function (bridge) {
                this._bridge = bridge;
            };
            ShipBody.prototype.enterFrame = function () {
                var fy = 0.1 * (this._bridge.y - this.y);
                this._vy += (fy / this._mass) - (0.3 * this._vy);
                this.y += this._vy;
                _super.prototype.enterFrame.call(this);
            };
            return ShipBody;
        }(Ship.ShipBase));
        Ship.ShipBody = ShipBody;
    })(Ship = View.Ship || (View.Ship = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Ship;
    (function (Ship) {
        var ShipBridge = (function (_super) {
            __extends(ShipBridge, _super);
            function ShipBridge() {
                var _this = _super.call(this) || this;
                _this._image = document.getElementById("bridge");
                _this._vy = 0;
                _this._mass = 25;
                _this.setPosition();
                return _this;
            }
            ShipBridge.prototype.setChimney = function (chimney) {
                this._chimney = chimney;
            };
            ShipBridge.prototype.enterFrame = function () {
                var fy = 0.1 * (this._chimney.y - this.y);
                this._vy += (fy / this._mass) - (0.3 * this._vy);
                this.y += this._vy;
                _super.prototype.enterFrame.call(this);
            };
            return ShipBridge;
        }(Ship.ShipBase));
        Ship.ShipBridge = ShipBridge;
    })(Ship = View.Ship || (View.Ship = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Ship;
    (function (Ship) {
        var ShipChimney = (function (_super) {
            __extends(ShipChimney, _super);
            function ShipChimney() {
                var _this = _super.call(this) || this;
                var handler = function () {
                    _this._vy = 2;
                };
                _this._image = document.getElementById("chimney");
                _this._mass = 1;
                _this.setPosition();
                setInterval(handler, 500);
                return _this;
            }
            ShipChimney.prototype.enterFrame = function () {
                _super.prototype.enterFrame.call(this);
            };
            return ShipChimney;
        }(Ship.ShipBase));
        Ship.ShipChimney = ShipChimney;
    })(Ship = View.Ship || (View.Ship = {}));
})(View || (View = {}));
//# sourceMappingURL=ts.js.map