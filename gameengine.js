// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];
        // Information on the input
        this.click = null;
        this.mouse = null;
        this.mousedown = null;
        this.wheel = null;
        this.keys = {};
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.reload = false;
        this.pointer = null;
        this.escapePress = false;
        this.pauseb = false;
        this.pauseControls = false;
        this.win = false;
        this.enemiesInLevel = -1;
        this.chiefDone = false;
        this.inGame = false;

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };


    //currently pause and unpause should only be used to force a freeze / unfreeze 
    pause(){
        this.escapePress = true;
        this.pauseb = true;
    };

    unpause(){
        this.escapePress = false;
        this.pauseb = false;
        this.pauseControls = false;
    };

    startInput() {
        var that = this;

        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left + this.camera.x,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top + this.camera.y
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                //console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("mousedown", e => {
            if (this.options.debugging) {
                //console.log("CLICK", getXandY(e));
            }
            this.mousedown = true;
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("mouseup", e => {
            if (this.options.debugging) {
                //console.log("CLICK", getXandY(e));
            }
            this.mousedown = null;
            this.click = null;
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                //console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                //console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyR":
                    that.reload = true;
                    break;
                case "Digit1":
                    that.weaponOne = true;
                    break;
                case "Digit2":
                    that.weaponTwo = true;
                    break;
                case "Digit3":
                    that.weaponThree = true;
                    break;
                case "Digit4":
                    that.weaponFour = true;
                    break;
                case "Digit5":
                    that.weaponFive = true;
                    break;
                case "Digit6":
                    that.weaponSix = true;
                    break;
                //case "Escape":
                    //that.escapePress = true;
                    //break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            console.log(e);
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyR":
                    that.reload = false;
                    break;
                case "Digit1":
                    that.weaponOne = false;
                    break;
                case "Digit2":
                    that.weaponTwo = false;
                    break;
                case "Digit3":
                    that.weaponThree = false;
                    break;
                case "Digit4":
                    that.weaponFour = false;
                    break;
                case "Digit5":
                    that.weaponFive = false;
                    break;
                case "Digit6":
                    that.weaponSix = false;
                    break;
                case "Escape":
                    if(that.escapePress == true){
                        that.makeCrosshair();
                        that.escapePress = false;
                    }
                    else if(that.escapePress == false){
                        that.makeDefault();
                        that.escapePress = true;
                    }
                    break;
            }
        }, false);
        

        window.addEventListener("keydown", event => this.keys[event.key] = true);
        window.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    makeCrosshair(){
        if(this.inGame){
            document.getElementById("gameWorld").style.cursor = "crosshair";
        }
    };

    makeDefault(){
        if(this.inGame){
            document.getElementById("gameWorld").style.cursor = "default";
        }
    };

    addEntity(entity) {
       // this.entitiesToAdd.enqueue(entity);
       this.entitiesToAdd.push(entity);
    };
   
    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //this.camera.draw(this.ctx);
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        this.camera.draw(this.ctx);
    };

    update() {

        if(this.enemiesInLevel == 0){
            this.win = true;
        }
        if(this.win == true){
            this.chiefDone = true;
            this.win = false;
            this.camera.loadWinMenu();
        }
        // Update Entities
        this.entities.forEach(entity => entity.update(this));

        PARAMS.DEBUG = document.getElementById("debug").checked;
        
        PARAMS.MUTE = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(PARAMS.MUTE);
        ASSET_MANAGER.adjustVolume(volume);
        
        
        //var volume = document.getElementById("volume").value;

        // Remove dead things
        this.entities = this.entities.filter(entity => !entity.removeFromWorld);

        // Add new things

        this.entities = this.entities.concat(this.entitiesToAdd);
        this.entitiesToAdd = [];

        //this.pointer = getXandY(e);
        //console.log(pointer);

        this.camera.update();
    };
    
    addEntityToFront(entity) {
        this.entities.splice(420, 0, entity);
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    get["deltaTime"]() { return this.clockTick; }
    get["width"]() { return this.ctx?.canvas?.width || 0; }
    get["height"]() { return this.ctx?.canvas?.height || 0; }
};
