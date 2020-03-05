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
                    var dScale = 1 - smoke.scale;
                    smoke.vScale += dScale * 0.01 - 0.05 * smoke.vScale;
                    smoke.scale += smoke.vScale;
                    smoke.setPosition(smoke.x, smoke.y, smoke.scale);
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
                var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", "120");
                circle.setAttribute("cy", "150");
                circle.setAttribute("r", "5");
                circle.setAttribute("fill", "#FFF");
                this._ship.appendChild(circle);
                bridge.setChimney(this._shipChimney);
                body.setBridge(bridge);
                setInterval(handler, 500);
            }
            Object.defineProperty(ShipManager.prototype, "y", {
                get: function () {
                    return this._y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ShipManager.prototype, "x", {
                get: function () {
                    return this._x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ShipManager.prototype, "currentTheta", {
                get: function () {
                    return this._currentTheta;
                },
                enumerable: true,
                configurable: true
            });
            ShipManager.prototype.enterFrame = function () {
                var n = this._baseList.length;
                for (var i = 0; i < n; i++) {
                    var base = this._baseList[i];
                    base.enterFrame();
                }
                var x = 350;
                var wavePoint = this._waveObject.pointList[x];
                this.setShipPosition(x);
            };
            ShipManager.prototype.setWave = function (waveObject) {
                this._waveObject = waveObject;
                var x = 350;
                this.setShipPosition(x);
            };
            ShipManager.prototype.smoke = function () {
                this._shipChimney.start();
                var theta = Math.atan2(100, 5) + Math.PI * (this._currentTheta / 180);
                var x = this._x + 120 - 110 * Math.cos(theta);
                var y = this._y + 150 - 110 * Math.sin(theta);
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
                    var wave = new Wave.WaveObject(this._layer, i);
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
    var Moon;
    (function (Moon) {
        var MoonManager = (function () {
            function MoonManager() {
                this.cx = 1600;
                this.cy = 120;
                this._count = 2 * Math.PI * Math.random();
                var svg = document.getElementById("svg");
                var layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                var rotate = "rotate(70,1600,120)";
                layer.setAttributeNS(null, "transform", rotate);
                svg.appendChild(layer);
                this._polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                this._polyline.setAttributeNS(null, "fill", "#ff0");
                this._polyline.setAttributeNS(null, "opacity", "0.3");
                layer.appendChild(this._polyline);
                this._pointList = [];
                var n = 180;
                for (var i = 0; i < n; i++) {
                    var moonPoint = new Moon.MoonPoint();
                    this._pointList.push(moonPoint);
                }
                this.setPoint();
                this.draw();
            }
            MoonManager.prototype.draw = function () {
                var value = "";
                var n = this._pointList.length;
                for (var i = 0; i < n; i++) {
                    var point = this._pointList[i];
                    value += point.x + "," + point.y + " ";
                }
                this._polyline.setAttributeNS(null, "points", value);
            };
            MoonManager.prototype.setPoint = function () {
                var n = this._pointList.length;
                for (var i = 0; i < n; i++) {
                    var moonPoint = this._pointList[i];
                    var theta = 2 * Math.PI * (i / n) - Math.PI;
                    var x = this.cx + 50 * Math.cos(theta);
                    var y = void 0;
                    if (i > Math.floor(n * 0.5)) {
                        y = this.cy + 50 * Math.cos(this._count) * Math.sin(theta);
                    }
                    else {
                        y = this.cy + 50 * Math.sin(theta);
                    }
                    moonPoint.x = x;
                    moonPoint.y = y;
                }
            };
            MoonManager.prototype.enterFrame = function () {
                this._count += 0.0002;
                if (this._count > 2 * Math.PI) {
                    this._count -= 2 * Math.PI;
                }
                this.setPoint();
                this.draw();
            };
            return MoonManager;
        }());
        Moon.MoonManager = MoonManager;
    })(Moon = View.Moon || (View.Moon = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Fisherman;
    (function (Fisherman) {
        var Rod;
        (function (Rod) {
            var RodManager = (function () {
                function RodManager() {
                    this._length = 120;
                }
                Object.defineProperty(RodManager.prototype, "linePointY", {
                    get: function () {
                        return this._linePointY;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RodManager.prototype, "linePointX", {
                    get: function () {
                        return this._linePointX;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RodManager.prototype, "theta", {
                    get: function () {
                        return this._theta;
                    },
                    enumerable: true,
                    configurable: true
                });
                RodManager.prototype.setHand = function (hand) {
                    this._hand = hand;
                    this.init();
                };
                RodManager.prototype.init = function () {
                    var svg = document.getElementById("svg");
                    this._g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    svg.appendChild(this._g);
                    var body = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    var handX = (this._hand.getAttribute("cx")).toString();
                    var handY = (this._hand.getAttribute("cy")).toString();
                    body.setAttribute("x", handX);
                    body.setAttribute("y", handY);
                    body.setAttribute("width", this._length.toString());
                    body.setAttribute("height", "3");
                    body.setAttribute("fill", "#000");
                    body.id = ("rod");
                    this._g.appendChild(body);
                    this.setRodRotation(-45);
                };
                RodManager.prototype.enterFrame = function () {
                };
                RodManager.prototype.setRodRotation = function (value) {
                    this._theta = value;
                    var handX = Number(this._hand.getAttribute("cx"));
                    var handY = Number(this._hand.getAttribute("cy"));
                    var rotate = "rotate(" + this._theta + " " + handX.toString() + " " + handY.toString() + ")";
                    this._g.setAttribute("transform", rotate);
                    var radian = Math.PI * (this.theta / 180);
                    this._linePointX = handX + this._length * Math.cos(radian);
                    this._linePointY = handY + this._length * Math.sin(radian);
                };
                return RodManager;
            }());
            Rod.RodManager = RodManager;
        })(Rod = Fisherman.Rod || (Fisherman.Rod = {}));
    })(Fisherman = View.Fisherman || (View.Fisherman = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Fisherman;
    (function (Fisherman) {
        var Line;
        (function (Line) {
            var LinePoint = (function () {
                function LinePoint(layer, x, y, mass) {
                    if (mass === void 0) { mass = 1; }
                    this.vx = 0;
                    this.vy = 0;
                    console.log("start");
                    this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this._circle.setAttribute("r", "3");
                    this._circle.setAttribute("fill", "#F0F");
                    layer.appendChild(this._circle);
                    this.x = x;
                    this.y = y;
                    this._mass = mass;
                }
                Object.defineProperty(LinePoint.prototype, "mass", {
                    get: function () {
                        return this._mass;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LinePoint.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (value) {
                        this._y = value;
                        this._circle.setAttribute("cy", this._y.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LinePoint.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (value) {
                        this._x = value;
                        this._circle.setAttribute("cx", this._x.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                return LinePoint;
            }());
            Line.LinePoint = LinePoint;
        })(Line = Fisherman.Line || (Fisherman.Line = {}));
    })(Fisherman = View.Fisherman || (View.Fisherman = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Fisherman;
    (function (Fisherman) {
        var Line;
        (function (Line) {
            var LineManager = (function () {
                function LineManager() {
                    this._length = 40;
                }
                LineManager.prototype.setRod = function (rodManager) {
                    this._rodManager = rodManager;
                    this.init();
                };
                LineManager.prototype.enterFrame = function (rodTopX, rodTopY) {
                    if (rodTopX === void 0) { rodTopX = null; }
                    if (rodTopY === void 0) { rodTopY = null; }
                    var k = 0.3;
                    var u = 0.1;
                    var g = 0.08;
                    var n = this._linePointList.length;
                    this._rodTop = this._linePointList[0];
                    this._rodTop.x = this._rodManager.linePointX;
                    this._rodTop.y = this._rodManager.linePointY;
                    for (var i = 1; i < n; i++) {
                        var linePoint = this._linePointList[i];
                        linePoint.vy += g * linePoint.mass;
                        linePoint.y += linePoint.vy;
                    }
                    for (var i = 0; i < n; i++) {
                        var dx = void 0;
                        var dy = void 0;
                        var linePoint = this._linePointList[i];
                        var prev = void 0;
                        var next = void 0;
                        if (i != 0) {
                            prev = this._linePointList[i - 1];
                            dx = prev.x - linePoint.x;
                            linePoint.vx = dx * k - u * linePoint.vx;
                            linePoint.x += linePoint.vx;
                            dy = prev.y - linePoint.y;
                            linePoint.vy = dy * k - u * linePoint.vy;
                            linePoint.y += linePoint.vy;
                            if (i != 1) {
                                prev.vx = -dx * k - u * prev.vx;
                                prev.x += prev.vx;
                                prev.vy = -dy * k - u * prev.vy;
                                prev.y += prev.vy;
                            }
                        }
                        if (i != this._linePointList.length - 1) {
                            next = this._linePointList[i + 1];
                            dx = next.x - linePoint.x;
                            dy = next.y - linePoint.y;
                            if (i != 0) {
                                linePoint.vx = dx * k - u * linePoint.vx;
                                linePoint.vy = dy * k - u * linePoint.vy;
                                linePoint.x += linePoint.vx;
                                linePoint.y += linePoint.vy;
                            }
                            next.vx = -dx * k - u * next.vx;
                            next.vy = -dy * k - u * next.vy;
                            next.x += next.vx;
                            next.y += next.vy;
                        }
                    }
                };
                LineManager.prototype.init = function () {
                    var svg = document.getElementById("svg");
                    this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    svg.appendChild(this._layer);
                    this._linePointList = [];
                    var n = 15;
                    for (var i = 0; i < n; i++) {
                        var theta = -0.25 * Math.PI + 0.5 * Math.PI;
                        var dx = (this._length * i) * Math.cos(theta);
                        var dy = (this._length * i) * Math.sin(theta);
                        var x = this._rodManager.linePointX + dx;
                        var y = this._rodManager.linePointY + dy;
                        var mass = 1;
                        if (i == n - 1) {
                            mass = 30;
                        }
                        var linePoint = new Line.LinePoint(this._layer, x, y, mass);
                        this._linePointList.push(linePoint);
                    }
                    this._rodTop = this._linePointList[0];
                };
                return LineManager;
            }());
            Line.LineManager = LineManager;
        })(Line = Fisherman.Line || (Fisherman.Line = {}));
    })(Fisherman = View.Fisherman || (View.Fisherman = {}));
})(View || (View = {}));
var View;
(function (View) {
    var Fisherman;
    (function (Fisherman) {
        var RodManager = View.Fisherman.Rod.RodManager;
        var LineManager = View.Fisherman.Line.LineManager;
        var FishermanManager = (function () {
            function FishermanManager() {
                this.count = 0;
                var svg = document.getElementById("svg");
                this._layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                svg.appendChild(this._layer);
                this._fishermanLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                this._layer.appendChild(this._fishermanLayer);
                var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                this._fishermanLayer.appendChild(g);
                g.innerHTML = svg_fisherman;
                g.setAttributeNS(null, "transform", "translate(-18,-80)");
                var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
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
            Object.defineProperty(FishermanManager.prototype, "linePointY", {
                get: function () {
                    return this._linePointY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FishermanManager.prototype, "linePointX", {
                get: function () {
                    return this._linePointX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FishermanManager.prototype, "theta", {
                get: function () {
                    return this._theta;
                },
                enumerable: true,
                configurable: true
            });
            FishermanManager.prototype.setPosition = function (x, y, theta) {
                var t = Math.atan2(150, 120) + Math.PI * (theta / 180);
                var d = Math.sqrt(150 * 150 + 120 * 120);
                var localTheta = Math.PI * (theta / 180) + -0.2 * Math.PI;
                var localRadius = 120;
                var px = x + d * Math.cos(t) + localRadius * Math.cos(localTheta);
                var py = y + d * Math.sin(t) + localRadius * Math.sin(localTheta);
                var transform = "translate(" + (px) + "," + (py) + ")";
                var rotate = "rotate(" + theta + "," + 120 + "," + 150 + ")";
                this._layer.setAttributeNS(null, "transform", transform + " " + rotate);
                var fishermanTheta = -1 * theta + (-20 + 40 * Math.cos(this.count));
                rotate = "rotate(" + fishermanTheta + ")";
                this._fishermanLayer.setAttributeNS(null, "transform", rotate);
                var rodTheta = -0.4 * Math.PI + (Math.PI * (fishermanTheta + theta) / 180);
                var rodRadius = 80;
                px = x + 120 + localRadius * Math.cos(localTheta) + rodRadius * Math.cos(rodTheta);
                py = y + 150 + localRadius * Math.sin(localTheta) + rodRadius * Math.sin(rodTheta);
                transform = "translate(" + px + "," + py + ")";
                this._hand.setAttributeNS(null, "transform", transform);
            };
            FishermanManager.prototype.enterFrame = function () {
                this.setPosition(this._shipManager.x, this._shipManager.y, this._shipManager.currentTheta);
                this.count += 0.03;
                if (this.count > 2 * Math.PI) {
                    this.count += 2 * Math.PI;
                }
                this._lineManager.enterFrame();
            };
            FishermanManager.prototype.setShipManager = function (shipManager) {
                this._shipManager = shipManager;
            };
            return FishermanManager;
        }());
        Fisherman.FishermanManager = FishermanManager;
    })(Fisherman = View.Fisherman || (View.Fisherman = {}));
})(View || (View = {}));
var View;
(function (View) {
    var ShipManager = View.Ship.ShipManager;
    var WaveManager = View.Wave.WaveManager;
    var SmokeManager = View.Smoke.SmokeManager;
    var MoonManager = View.Moon.MoonManager;
    var FishermanManager = View.Fisherman.FishermanManager;
    var ViewManager = (function () {
        function ViewManager() {
            this._shipManager = new ShipManager();
            this._waveManager = new WaveManager();
            var waveObject = this._waveManager.getShipWave();
            this._shipManager.setWave(waveObject);
            this._smokeManager = new SmokeManager();
            this._shipManager.setSmokeManager(this._smokeManager);
            this._moonManager = new MoonManager();
            this._fishermanManager = new FishermanManager();
            this._fishermanManager.setShipManager(this._shipManager);
            var click = function () {
                console.log("clickfdfdfdfd");
            };
            var svg = document.getElementById("svg");
            svg.addEventListener("click", click);
        }
        ViewManager.prototype.enterFrame = function () {
            this._shipManager.enterFrame();
            this._waveManager.enterFrame();
            this._smokeManager.enterFrame();
            this._moonManager.enterFrame();
            this._fishermanManager.enterFrame();
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
var svg_smoke2 = "<path id=\"smoke2\" d=\"M182,226c0-3.31-4.7-6-10.5-6-4.59,0-8.47,1.68-9.9,4-4.27.22-7.6,1.91-7.6,4,0,.07,0,.15,0,.22-1.88,1-3,2.35-3,3.78,0,3.31,6,6,13.5,6s13.5-2.69,13.5-6a2.89,2.89,0,0,0-.26-1.18C180.32,229.73,182,228,182,226Z\" transform=\"translate(-151 -220)\"/>";
var svg_smoke3 = "<path id=\"smoke3\" d=\"M120,214c0-1.66-3.36-3-7.5-3a17.79,17.79,0,0,0-2.91.23A14.43,14.43,0,0,0,107,211c-4.88,0-8.84,2.38-9,5.34a5.55,5.55,0,0,0-1,3.16c0,3.59,3.58,6.5,8,6.5a9.46,9.46,0,0,0,2.35-.29,16.61,16.61,0,0,0,3.15.29c4.69,0,8.5-1.79,8.5-4,0-1.38-1.48-2.6-3.74-3.32a3.86,3.86,0,0,0,.73-2C118.37,216.15,120,215.15,120,214Z\" transform=\"translate(-97 -211)\"/>";
var svg_smoke4 = "<path id=\"smoke4\" d=\"M78,187.5c-.34-4.18-4.89-7.5-10.47-7.5-4,0-7.41,1.67-9.2,4.14-5.3.67-9.3,3.71-9.3,7.36,0,4.14,5.15,7.5,11.5,7.5a14.15,14.15,0,0,0,9.27-3.07c.72,0,1.47.07,2.23.07,7.18,0,13-2,13-4.5C85,189.76,82.14,188.25,78,187.5Z\" transform=\"translate(-49 -180)\"/>";
var svg_fisherman = "<path d=\"M673.51,393a12.12,12.12,0,0,0-.76-1.62c.92.43,1.85.57,2.52-.2a7.13,7.13,0,0,0,.93-1.62,4.28,4.28,0,0,0,0,1c.11.65-.48,1.45-.69,2.13-.32,1-1.19,2.06-1.15,3.13C673.86,395.06,673.86,393.89,673.51,393Z\" transform=\"translate(-660.21 -332.39)\" style=\"fill:none\"/><path d=\"M688.08,414.07a3.9,3.9,0,0,1,.71.42,9,9,0,0,0-.51,1.4A17.47,17.47,0,0,1,688.08,414.07Z\" transform=\"translate(-660.21 -332.39)\" style=\"fill:none\"/><path d=\"M660.34,390.8c.12,3.24,1.75,5.74,3.56,8.26a10.73,10.73,0,0,1,1.49,5.23,14.61,14.61,0,0,0,.62,3.65c.52,1.48.73,2.9,2,3.89,1.67,1.28,3.66.84,5.6.84,1.37,0,2.8.43,4.15.17a3.9,3.9,0,0,1,1.18-.28c.44.05.49.34.94,0,0,0,0,0,0,0a3.3,3.3,0,0,0,.91.59,1.41,1.41,0,0,0,1.27,0c1,2,2.36,3.94,3.5,5.88a14,14,0,0,1,1.47,2.48c.16.53-.17.6-.18,1.07a2.17,2.17,0,0,0,.33.95c-.16,1.18-.32,2.35-.44,3.54,0,.53-.14,1-.23,1.55.06-.36-.6.39-.64.49-.15.37-.2.77-.33,1.15-.41,1.25-.83,2.12.46,2.93.61.38,1.42.14,2.07.42s.88.83,1.44,1.11c1,.46,5.24,1.69,5.16-.21-.05-1.14-1.3-1.9-2.1-2.51-.46-.35-.9-.69-1.34-1s-.88-1.08-1.26-1.11a7.33,7.33,0,0,1,.05-1.55,11.17,11.17,0,0,1,.36-2c.31.12.58.29,1,.46a8.34,8.34,0,0,0,2.94.41c.76.06,2.1,0,2.57-.72.64-.95-.1-2.05-.9-2.62-.46-.32-.92-.64-1.4-.94a12.58,12.58,0,0,1-1.89-1.52,3.71,3.71,0,0,0-.71-.66l-.07,0a17.35,17.35,0,0,1,.84-2.74c.56-1.3,1.22-2.56,1.68-3.91a7.73,7.73,0,0,0,.49-3.19c-.16-.88-1.57-1.55-2.23-2a24.72,24.72,0,0,0-3.63-2.26c-.57-.29-1.13-.59-1.7-.87a11.87,11.87,0,0,0-1-4.86,4.29,4.29,0,0,0-1.86-1.86c-.91-.4-1.93.22-2.8.52-1.78.59-3.51,1.35-5.23,2.08-.64.26-1,.62-1.38,0a4.81,4.81,0,0,1-.57-1.19,1.52,1.52,0,0,0,.82-.19c1.11-.63,1.62-1.89,2.21-2.94a11.61,11.61,0,0,0,1.17-4c.12-.83,0-1.65.67-2.29.38-.39,1.14-.84,1.35-1.33.15-.33-.14-.75-.33-1,.2-.28.08-.52-.06-.79s-.23-.22-.11-.66.14-1.19-.58-1.09c-.46.06-.55.68-.92.59l.68-4.09c.16-.08.09-.18.25-.3a2,2,0,0,0,.66-.65c.17-.25.5-.4.6-.67s-.05-.43,0-.61.15-.23.2-.37c.12-.35,0-.61,0-1,0-.16.14-.29.14-.52a2.55,2.55,0,0,0-.1-.51,1.14,1.14,0,0,0-.19-.47.59.59,0,0,1-.08-.08c9.48-38.41,24.85-44.63,25.61-44.92C689.17,338.3,678.65,378,678.65,378h0a14.34,14.34,0,0,0-1.28.79A4.51,4.51,0,0,0,676,381a9.49,9.49,0,0,1-1.65,3.09,4.66,4.66,0,0,0-1.22,1.93,3.77,3.77,0,0,0-.2.93,25.65,25.65,0,0,0-2.25-2.67,9.14,9.14,0,0,0-1.53-1.33,1.24,1.24,0,0,1,0-.61c.16-.31.77-.29,1.05-.65.43-.54.32-1.87.39-2.55a2.42,2.42,0,0,0-.24-1.26c-.15-.48.09-.81,0-1.29a6.44,6.44,0,0,0-1.37-2.18c-.54-.66-.76-1.1-1.66-1.24-1.55-.24-4,.17-4.52,1.92a5.72,5.72,0,0,0-.07,3.15,20.89,20.89,0,0,0,1.4,3,2.47,2.47,0,0,0-1.59,1.05,12,12,0,0,0-1.57,2.95,10.66,10.66,0,0,0-.77,2.77A23.33,23.33,0,0,0,660.34,390.8Zm28.45,23.69a9,9,0,0,0-.51,1.4,17.47,17.47,0,0,1-.2-1.82A3.9,3.9,0,0,1,688.79,414.49ZM674.4,395.81c-.54-.75-.54-1.92-.89-2.78a12.12,12.12,0,0,0-.76-1.62c.92.43,1.85.57,2.52-.2a7.13,7.13,0,0,0,.93-1.62,4.28,4.28,0,0,0,0,1c.11.65-.48,1.45-.69,2.13C675.23,393.69,674.36,394.74,674.4,395.81Z\" transform=\"translate(-660.21 -332.39)\"/>\n" +
    "<path d=\"M706.51,332.4h0Z\" transform=\"translate(-660.21 -332.39)\"/>";
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
    var Moon;
    (function (Moon) {
        var MoonPoint = (function () {
            function MoonPoint() {
            }
            return MoonPoint;
        }());
        Moon.MoonPoint = MoonPoint;
    })(Moon = View.Moon || (View.Moon = {}));
})(View || (View = {}));
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
    var Smoke;
    (function (Smoke) {
        var SmokeObject = (function () {
            function SmokeObject(layer, x, y, theta) {
                this.vx = 0;
                this.vy = 0;
                this.vScale = 0;
                this._layer = layer;
                this._g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                this._layer.appendChild(this._g);
                var list = [
                    new SmokeData(svg_smoke1, -194 - 15, -263 - 12),
                    new SmokeData(svg_smoke2, -151 - 15, -220 - 12),
                    new SmokeData(svg_smoke3, -97 - 15, -211 - 12),
                    new SmokeData(svg_smoke4, -49 - 15, -180 - 12)
                ];
                this._smokeData = list[Math.floor(Math.random() * list.length)];
                this._g.innerHTML = this._smokeData.string;
                var path = this._g.getElementsByTagName("path")[0];
                var translate = "translate(" + this._smokeData.marginX + " " + this._smokeData.marginY + ")";
                path.setAttributeNS(null, "transform", translate);
                this.setPosition(x, y, 0);
                var radian = Math.PI * (theta / 180);
                var v = 5;
                this.vx = v * Math.cos(radian);
                this.vy = v * Math.sin(radian);
                this.vy = v * Math.sin(radian);
            }
            SmokeObject.prototype.remove = function () {
                this._layer.removeChild(this._g);
            };
            SmokeObject.prototype.setPosition = function (x, y, scale) {
                this.x = x;
                this.y = y;
                var valueX = this.x;
                var valueY = this.y;
                var value = "translate(" + valueX + "," + valueY + ")";
                this.scale = scale;
                var scaleValue = "scale(" + this.scale + ")";
                this._g.setAttributeNS(null, "transform", value + " " + scaleValue);
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
var View;
(function (View) {
    var Wave;
    (function (Wave) {
        var WaveObject = (function () {
            function WaveObject(layer, waveCount) {
                this._count0 = 0;
                this._count1 = 0;
                this._count2 = 0;
                var svg = document.getElementById("svg");
                var width = Number(svg.getAttribute("width"));
                var height = Number(svg.getAttribute("height"));
                this._polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                this._polyline.setAttributeNS(null, "fill", "#003");
                this._polyline.setAttributeNS(null, "opacity", "0.1");
                this._height = height * 0.5 - 50 * waveCount;
                this._count0 = 0.5 * waveCount;
                this._count1 = 1.0 * waveCount;
                this._count2 = 2 * Math.PI * Math.random();
                this._pointList = [];
                var n = width;
                for (var i = 0; i < n; i++) {
                    var point = new Wave.WavePoint();
                    this._pointList.push(point);
                }
                this.startPoint = new Wave.WavePoint(0, height);
                this.endPoint = new Wave.WavePoint(width, height);
                layer.appendChild(this._polyline);
                this.setWavePoint();
                this.draw();
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
            };
            WaveObject.prototype.setWavePoint = function () {
                var n = this._pointList.length;
                this._pointList = [];
                for (var i = 0; i < n; i++) {
                    var x = i;
                    var y = this._height + (100 * Math.cos(x * 0.001 + this._count0)) +
                        (50 * Math.cos(x * 0.01 + this._count0)) +
                        (5 * Math.cos(x * 0.05 + this._count2));
                    var point = new Wave.WavePoint(x, y);
                    this._pointList.push(point);
                }
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
    var Wave;
    (function (Wave) {
        var WavePoint = (function () {
            function WavePoint(x, y) {
                if (x === void 0) { x = null; }
                if (y === void 0) { y = null; }
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
//# sourceMappingURL=ts.js.map