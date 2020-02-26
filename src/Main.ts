///<reference path="View/ViewManager.ts"/>
import ViewManager = View.ViewManager;

let main;
const svg_ship:string = "<g id=\"ship\"><path id=\"chimney\" d=\"M233.5,347c0-2-6-43-6-43l15-5-5,48Z\" transform=\"translate(-124.06 -299)\" style=\"fill:#200\"/><path id=\"bridge\" d=\"M247.11,327.23l-65.3,12.4s3.88,73.78,11.32,82.87l42.15-12.4C249.34,380.34,247.11,327.23,247.11,327.23Zm-56.85,22.45L201,348l.82,11.58-9.92,1.65Zm4.13,23.14-1.65-8.26,9.09-1.66.83,8.27Zm18.19-25.62v12.4l-7.44-.83L204.31,348Zm.82,24.8H206l-.83-9.92,8.26.82Z\" transform=\"translate(-124.06 -299)\" style=\"fill:#100\"/><path id=\"body\" d=\"M124.28,352.81s6.13,11.67,17.14,18.19c18.58,11,66.42,26.73,113.12,21.46s95.8-33.95,105.18-40l16.88-11A170.27,170.27,0,0,1,372,363.11c-6.37,21.44-11.11,43.83-39.3,70.85C298.18,467,221.53,465.62,176,445.6c-31.09-13.68-42.26-44.55-49.48-72.92C123,359,124.28,352.81,124.28,352.81Z\" transform=\"translate(-124.06 -299)\"/></g>";
const svg_smoke1:string ="<path id=\"smoke1\" d=\"M218.57,273.56a6.49,6.49,0,0,0-10-8.27A12,12,0,0,0,203,264c-5,0-9,2.69-9,6s4,6,9,6a12.87,12.87,0,0,0,2.44-.23A2.1,2.1,0,0,0,205,277c0,2.21,4,4,9,4s9-1.79,9-4C223,275.53,221.22,274.26,218.57,273.56Z\" transform=\"translate(-194 -263)\"/>";
const svg_smoke2:string ="<path id=\"smoke2\" d=\"M182,226c0-3.31-4.7-6-10.5-6-4.59,0-8.47,1.68-9.9,4-4.27.22-7.6,1.91-7.6,4,0,.07,0,.15,0,.22-1.88,1-3,2.35-3,3.78,0,3.31,6,6,13.5,6s13.5-2.69,13.5-6a2.89,2.89,0,0,0-.26-1.18C180.32,229.73,182,228,182,226Z\" transform=\"translate(-151 -220)\"/>";
const svg_smoke3:string ="<path id=\"smoke3\" d=\"M120,214c0-1.66-3.36-3-7.5-3a17.79,17.79,0,0,0-2.91.23A14.43,14.43,0,0,0,107,211c-4.88,0-8.84,2.38-9,5.34a5.55,5.55,0,0,0-1,3.16c0,3.59,3.58,6.5,8,6.5a9.46,9.46,0,0,0,2.35-.29,16.61,16.61,0,0,0,3.15.29c4.69,0,8.5-1.79,8.5-4,0-1.38-1.48-2.6-3.74-3.32a3.86,3.86,0,0,0,.73-2C118.37,216.15,120,215.15,120,214Z\" transform=\"translate(-97 -211)\"/>";
const svg_smoke4:string ="<path id=\"smoke4\" d=\"M78,187.5c-.34-4.18-4.89-7.5-10.47-7.5-4,0-7.41,1.67-9.2,4.14-5.3.67-9.3,3.71-9.3,7.36,0,4.14,5.15,7.5,11.5,7.5a14.15,14.15,0,0,0,9.27-3.07c.72,0,1.47.07,2.23.07,7.18,0,13-2,13-4.5C85,189.76,82.14,188.25,78,187.5Z\" transform=\"translate(-49 -180)\"/>";
class Main {
    private _viewManager:ViewManager;
    constructor() {
        const interval = () => {
            this.enterFrame();
        };
        const resize = () =>
        {
            this.resize();
        };

        this._viewManager = new ViewManager();


        window.addEventListener( 'resize',resize );
        let fps = 60 / 1000;
        setInterval(interval, fps);
    }
    private enterFrame() {
        this._viewManager.enterFrame();
    }
    private resize():void
    {
        this._viewManager.resize();
    }
}

window.addEventListener("load", () => {
    main = new Main();
});
