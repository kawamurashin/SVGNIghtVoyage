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
    var Smoke;
    (function (Smoke) {
        var SmokeManager = (function () {
            function SmokeManager() {
                var svg = document.getElementById("svg");
                this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                svg.appendChild(this._layer);
                this._smokeList = [];
            }
            SmokeManager.prototype.start = function (x, y, theta) {
                var smoke = new Smoke.SmokeObject(this._layer, x, y, theta - 90);
                this._smokeList.push(smoke);
            };
            SmokeManager.prototype.enterFrame = function () {
                var n = this._smokeList.length;
                for (var i = 0; i < n; i++) {
                    var smoke = this._smokeList[i];
                    var dx = 0;
                    smoke.vx += dx - 0.05 * smoke.vx;
                    smoke.x += smoke.vx - 0.3 + (0.3 * Math.random());
                    var dy = 0;
                    smoke.vy += dy - 0.05 * smoke.vy;
                    smoke.y += smoke.vy + -0.4;
                    smoke.setPosition(smoke.x, smoke.y);
                }
                this.checkSmokePosition();
            };
            SmokeManager.prototype.checkSmokePosition = function () {
                var n = this._smokeList.length;
                for (var i = 0; i < n; i++) {
                    var smoke = this._smokeList[i];
                    smoke.x += smoke.vx - 0.3 + (0.3 * Math.random());
                    if (smoke.x < 100 || smoke.y < 100) {
                        smoke.remove();
                        this._smokeList.splice(i, 1);
                        this.checkSmokePosition();
                        break;
                    }
                }
            };
            return SmokeManager;
        }());
        Smoke.SmokeManager = SmokeManager;
    })(Smoke = View.Smoke || (View.Smoke = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Ship;
    (function (Ship) {
        var ShipManager = (function () {
            function ShipManager() {
                var _this = this;
                this._vr = 0;
                this._currentTheta = 0;
                var handler = function () {
                    _this.smoke();
                };
                var svg = document.getElementById("svg");
                svg.innerHTML = svg_ship;
                this._ship = document.getElementById("ship");
                this._baseList = [];
                this._shipChimney = new Ship.ShipChimney();
                this._baseList.push(this._shipChimney);
                var bridge = new Ship.ShipBridge();
                this._baseList.push(bridge);
                var body = new Ship.ShipBody();
                this._baseList.push(body);
                bridge.setChimney(this._shipChimney);
                body.setBridge(bridge);
                this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                this._circle.setAttributeNS(null, "fill", "#F00");
                this._circle.setAttributeNS(null, "cx", "0");
                this._circle.setAttributeNS(null, "cy", "0");
                this._circle.setAttributeNS(null, "r", "10");
                svg.appendChild(this._circle);
                setInterval(handler, 500);
            }
            ShipManager.prototype.enterFrame = function () {
                var n = this._baseList.length;
                for (var i = 0; i < n; i++) {
                    var base = this._baseList[i];
                    base.enterFrame();
                }
                var x = 350;
                var wavePoint = this._waveObject.pointList[x];
                this._circle.setAttributeNS(null, "cx", wavePoint.x.toString());
                this._circle.setAttributeNS(null, "cy", wavePoint.y.toString());
                this.setShipPosition(x);
            };
            ShipManager.prototype.setWave = function (waveObject) {
                this._waveObject = waveObject;
                var x = 350;
                this.setShipPosition(x);
            };
            ShipManager.prototype.smoke = function () {
                this._shipChimney.start();
                var x = this._x;
                var y = this._y;
                this._smokeManager.start(x, y, this._currentTheta);
            };
            ShipManager.prototype.setShipPosition = function (x) {
                var wavePoint = this._waveObject.pointList[x];
                var nextPoint = this._waveObject.pointList[x + 1];
                var theta = 180 * (Math.atan2(nextPoint.y - wavePoint.y, nextPoint.x - wavePoint.x) / Math.PI);
                var dTheta = theta - this._currentTheta;
                this._vr += dTheta * 0.001 - 0.5 * this._vr;
                this._currentTheta += this._vr;
                this._x = wavePoint.x - 120;
                this._y = wavePoint.y - 150;
                var value = "translate(" + this._x + "," + this._y + ")";
                var rotate = "rotate(" + this._currentTheta + "," + 120 + "," + 150 + ")";
                this._ship.setAttributeNS(null, "transform", value + " " + rotate);
            };
            ShipManager.prototype.setSmokeManager = function (smokeManager) {
                this._smokeManager = smokeManager;
            };
            return ShipManager;
        }());
        Ship.ShipManager = ShipManager;
    })(Ship = View.Ship || (View.Ship = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Wave;
    (function (Wave) {
        var WaveManager = (function () {
            function WaveManager() {
                var svg = document.getElementById("svg");
                this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                svg.appendChild(this._layer);
                this.setWave();
            }
            WaveManager.prototype.setWave = function () {
                var svg = document.getElementById("svg");
                var height = Number(svg.getAttribute("height"));
                this._waveList = [];
                var n = 4;
                for (var i = 0; i < n; i++) {
                    var wave = new Wave.WaveObject(this._layer, height * 0.5 - 50 * i);
                    this._waveList.push(wave);
                }
            };
            WaveManager.prototype.enterFrame = function () {
                var n = this._waveList.length;
                for (var i = 0; i < n; i++) {
                    var wave = this._waveList[i];
                    wave.enterFrame();
                }
            };
            WaveManager.prototype.getShipWave = function () {
                return this._waveList[0];
            };
            return WaveManager;
        }());
        Wave.WaveManager = WaveManager;
    })(Wave = View.Wave || (View.Wave = {}));
})(View || (View = {}));
var View;
(function (View) {
    var ShipManager = View.Ship.ShipManager;
    var WaveManager = View.Wave.WaveManager;
    var SmokeManager = View.Smoke.SmokeManager;
    var ViewManager = (function () {
        function ViewManager() {
            this._shipManager = new ShipManager();
            this._waveManager = new WaveManager();
            var waveObject = this._waveManager.getShipWave();
            this._shipManager.setWave(waveObject);
            this._smokeManager = new SmokeManager();
            this._shipManager.setSmokeManager(this._smokeManager);
        }
        ViewManager.prototype.enterFrame = function () {
            this._shipManager.enterFrame();
            this._waveManager.enterFrame();
            this._smokeManager.enterFrame();
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
var svg_smoke1 = "<path id=\"smoke1\" d=\"M218.57,273.56a6.49,6.49,0,0,0-10-8.27A12,12,0,0,0,203,264c-5,0-9,2.69-9,6s4,6,9,6a12.87,12.87,0,0,0,2.44-.23A2.1,2.1,0,0,0,205,277c0,2.21,4,4,9,4s9-1.79,9-4C223,275.53,221.22,274.26,218.57,273.56Z\" transform=\"translate(-194 -263)\"/>";
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
                _this._image = document.getElementById("chimney");
                _this._mass = 1;
                _this.setPosition();
                return _this;
            }
            ShipChimney.prototype.enterFrame = function () {
                _super.prototype.enterFrame.call(this);
            };
            ShipChimney.prototype.start = function () {
                this._vy = 2;
            };
            return ShipChimney;
        }(Ship.ShipBase));
        Ship.ShipChimney = ShipChimney;
    })(Ship = View.Ship || (View.Ship = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Wave;
    (function (Wave) {
        var WavePoint = (function () {
            function WavePoint(x, y) {
                this.x = 0;
                this.y = 0;
                this.x = x;
                this.y = y;
            }
            return WavePoint;
        }());
        Wave.WavePoint = WavePoint;
    })(Wave = View.Wave || (View.Wave = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Wave;
    (function (Wave) {
        var WaveObject = (function () {
            function WaveObject(layer, waveHeight) {
                this._count0 = 0;
                this._count2 = 0;
                var svg = document.getElementById("svg");
                var width = Number(svg.getAttribute("width"));
                var height = Number(svg.getAttribute("height"));
                this._polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                this._polyline.setAttributeNS(null, "fill", "#003");
                this._polyline.setAttributeNS(null, "opacity", "0.1");
                this._height = waveHeight;
                this._count0 = 2 * Math.PI * Math.random();
                this._count2 = 2 * Math.PI * Math.random();
                this._pointList = [];
                var n = width;
                for (var i = 0; i < n; i++) {
                    var x = i;
                    var y = this._height + (100 * Math.cos(x * 0.01 + this._count0)) + (5 * Math.cos(x * 0.1 + this._count2));
                    var point = new Wave.WavePoint(x, y);
                    this._pointList.push(point);
                }
                this.startPoint = new Wave.WavePoint(0, height);
                this.endPoint = new Wave.WavePoint(width, height);
                this.draw();
                layer.appendChild(this._polyline);
            }
            Object.defineProperty(WaveObject.prototype, "pointList", {
                get: function () {
                    return this._pointList;
                },
                enumerable: true,
                configurable: true
            });
            WaveObject.prototype.enterFrame = function () {
                this._count0 += 0.001;
                if (this._count0 > 2 * Math.PI) {
                    this._count0 -= 2 * Math.PI;
                }
                this._count2 += 0.05;
                if (this._count2 > 2 * Math.PI) {
                    this._count2 -= 2 * Math.PI;
                }
                var n = this._pointList.length;
                this._pointList = [];
                for (var i = 0; i < n; i++) {
                    var x = i;
                    var y = this._height + (100 * Math.cos(x * 0.01 + this._count0)) + (5 * Math.cos(x * 0.1 + this._count2));
                    var point = new Wave.WavePoint(x, y);
                    this._pointList.push(point);
                }
                this.draw();
            };
            WaveObject.prototype.draw = function () {
                var value = this.startPoint.x + "," + this.startPoint.y + " ";
                var n = this._pointList.length;
                for (var i = 0; i < n; i++) {
                    var point = this._pointList[i];
                    value += point.x + "," + point.y + " ";
                }
                value += this.endPoint.x + "," + this.endPoint.y + " ";
                value += this.startPoint.x + "," + this.startPoint.y;
                this._polyline.setAttributeNS(null, "points", value);
            };
            return WaveObject;
        }());
        Wave.WaveObject = WaveObject;
    })(Wave = View.Wave || (View.Wave = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Smoke;
    (function (Smoke) {
        var SmokeObject = (function () {
            function SmokeObject(layer, x, y, theta) {
                this.vx = 0;
                this.vy = 0;
                this._layer = layer;
                this._g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                this._layer.appendChild(this._g);
                var list = [
                    new SmokeData(svg_smoke1, 15, 12)
                ];
                this._smokeData = list[0];
                this._g.innerHTML = this._smokeData.string;
                this.setPosition(x, y);
                var rad = Math.PI * (theta / 180);
                var v = 5;
                this.vx = v * Math.cos(rad);
                this.vy = v * Math.sin(rad);
            }
            SmokeObject.prototype.remove = function () {
                this._layer.removeChild(this._g);
            };
            SmokeObject.prototype.setPosition = function (x, y) {
                this.x = x;
                this.y = y;
                var valueX = this.x - this._smokeData.marginX;
                var valueY = this.y - this._smokeData.marginY;
                var value = "translate(" + valueX + "," + valueY + ")";
                this._g.setAttributeNS(null, "transform", value);
            };
            return SmokeObject;
        }());
        Smoke.SmokeObject = SmokeObject;
        var SmokeData = (function () {
            function SmokeData(string, marginX, marginY) {
                this._string = string;
                this._marginX = marginX;
                this._marginY = marginY;
            }
            Object.defineProperty(SmokeData.prototype, "marginY", {
                get: function () {
                    return this._marginY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SmokeData.prototype, "marginX", {
                get: function () {
                    return this._marginX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SmokeData.prototype, "string", {
                get: function () {
                    return this._string;
                },
                enumerable: true,
                configurable: true
            });
            return SmokeData;
        }());
    })(Smoke = View.Smoke || (View.Smoke = {}));
})(View || (View = {}));
//# sourceMappingURL=ts.js.map