class SceneManager {
    
    TILE_WIDTH = 128;
    DIRT_ID = 1;
    DIRT_WALL_ID = 2;
    DIRT_WALL_TOP_ID = 3;
    GRASS_1_ID = 4;
    GRASS_2_ID = 5;
    GRASS_3_ID = 6;


    MID_POINT_X = 1024/2;
    MID_POINT_Y = 540/2;
    constructor(game) {
        this.game = game;
        this.x = this.MID_POINT_X;
        this.y = this.MID_POINT_Y;
        this.game.camera = this;
        this.masterchief = new masterchief(game, this.x, this.y);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };
    updateAudio() {
        if (PARAMS.MUTE == true) {
            ASSET_MANAGER.muteAudio(PARAMS.MUTE)
        }
    }
    resetXanyY() {
        this.x = this.masterchief.x - this.MID_POINT_X;
        this.y = this.masterchief.y - this.MID_POINT_Y;

    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loadSplashScreen(){
        this.clearEntities();
        this.splashscreen = new SplashScreen(this.game, 0, 0);
        this.game.addEntity(this.splashscreen);
        this.update();
    }

    loadStartMenu() {
        this.clearEntities();
        this.startmenu = new StartMenu(this.game, 0, 0);
        this.game.addEntity(this.startmenu);
        ASSET_MANAGER.playAsset("./music/halo 3 theme.mp3");
        ASSET_MANAGER.autoRepeat("./music/halo 3 theme.mp3");
        this.update();
    }

    loadWinMenu() {
        this.sleep(100).then(() => {
            this.game.enemiesInLevel = -1;
            this.clearEntities();
            ASSET_MANAGER.pauseBackgroundMusic();
            this.winmenu = new WinMenu(this.game, 0, 0);
            this.game.addEntity(this.winmenu);
            ASSET_MANAGER.playAsset("./audio/victory_sound.mp3");
            this.update();
        });
    } 

    loadStartMenuNoAudio() {
        this.clearEntities();
        this.startmenu = new StartMenu(this.game, 0, 0);
        this.game.addEntity(this.startmenu);
        this.update();
    } 

    loadDeathMenu() {
        this.sleep(2000).then(() => {
            this.clearEntities();
            ASSET_MANAGER.pauseBackgroundMusic();
            this.deathmenu = new DeathMenu(this.game, 0, 0);
            this.game.addEntity(this.deathmenu);
            this.update();
            ASSET_MANAGER.playAsset("./audio/gameover.mp3");
        });
    }

    loadControls() {
        this.clearEntities();
        this.controls = new Controls(this.game, 0, 0);
        this.game.addEntity(this.controls);
        this.update();
    }

    loadCredits() {
        this.clearEntities();
        this.credits = new Credits(this.game, 0, 0);
        this.game.addEntity(this.credits);
        this.update();
    }

    loadLevel(level) {
        this.game.unpause();
        this.clearEntities();
        this.resetXanyY();
        //intro
        this.pelican = new Pelican(this.game, 200, 200);
        this.game.addEntity(this.pelican);
        ASSET_MANAGER.playAsset("./audio/takeoff.mp3");
        //add in masterchief and HUD
        this.masterchief = new masterchief(this.game, this.x - this.game.camera.x + this.MID_POINT_X, this.y - this.game.camera.y + this.MID_POINT_Y);
        this.hud = new hud(this.game, this.x, this.y, this.masterchief);
        this.game.addEntity(this.hud);
        this.game.addEntity(this.masterchief);
        //add in enemys
       this.game.enemiesInLevel = 0;
        this.game.addEntity(new Elite(this.game, 250, 750));
        this.game.addEntity(new Grunt(this.game, 1600, 400));
        this.game.addEntity(new Grunt(this.game, 200, 800));
        this.game.addEntity(new Grunt(this.game, 1000, 200));
        this.game.addEntity(new Elite(this.game, 1600, 500));
        //add in powerups/weapons
        this.game.addEntity(new Medkit(this.game, 500, 500));
        this.game.addEntity(new DMRPickup(this.game, 400, 350));
        this.game.addEntity(new ShotgunPickup(this.game, 300, 300));
        this.game.addEntity(new PlasmaPickup(this.game, 200, 250));
        let layers = level.layers;
        for(let layerNum = 0; layerNum < layers.length; layerNum++) {
            let layer = layers[layerNum];
            let tiles = layer.data;
            let currX = 0;
            let currY = 0;
            let tileCounter = 0;
            for(let i = 0; i < layer.height; i++) {
                for(let j = 0; j < layer.width; j++) {
                    let tile = tiles[tileCounter];
                    let isDirt = false; //specifies between dirt walls and rock walls
                    //console.log(tile);
                    switch(tile - 1) {
                        case -1: //empty tile
                            break; 
                        case 0:  //Ground tiles
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            this.game.addEntity(new Terrain(this.game,currX, currY, tile - 1));
                            break;
                        case 17: //Top Wall Tiles
                            isDirt = true;
                        case 26:
                            this.game.addEntity(new TopWall(this.game,currX, currY, isDirt));
                            break;
                        case 12: //Bottom Wall Tiles
                            isDirt = true;
                        case 21:
                            this.game.addEntity(new BottomWall(this.game,currX, currY, isDirt));
                            break;
                        case 15: //Left Wall Tiles
                            isDirt = true;
                        case 24:
                            this.game.addEntity(new LeftWall(this.game,currX, currY, isDirt));
                            break;
                        case 16: //Right Wall Tiles
                            isDirt = true;
                        case 25:
                            this.game.addEntity(new RightWall(this.game,currX, currY, isDirt));
                            break;
                        case 13: //Bottom Left Full Wall Tiles (Mostly grass small wall)
                            isDirt = true;
                        case 22:
                            this.game.addEntity(new BottomLeftFullWall(this.game,currX, currY, isDirt));
                            break;
                        case 14: //Bottom Right Full Wall Tiles (Mostly grass small wall)
                            isDirt = true;
                        case 23:
                            this.game.addEntity(new BottomRightFullWall(this.game,currX, currY, isDirt));
                            break;
                    }
                    currX += this.TILE_WIDTH;
                    tileCounter++;
                }
                //console.log("Loaded row");
                currX = 0;
                currY += this.TILE_WIDTH;
                
            }
        }
        
        //his.game.addEntity(new Background(this.game, 0, 0));
        this.masterchief.resetHealth();
        this.masterchief.resetShield();
        this.masterchief.resetAmmo();
        this.masterchief.resetState();
        this.update();
    };

    update() {
        this.updateAudio();
        if(!this.game.pauseb){
            var lastX = this.x;
            var lastY = this.y;
            this.x = this.masterchief.x - this.MID_POINT_X;
            this.y = this.masterchief.y - this.MID_POINT_Y;
            if (this.game.mouse) {
                this.game.mouse.x -= lastX - this.x;
                this.game.mouse.y -= lastY - this.y;
            }
        }
    };

    draw(ctx) {
        if(!this.game.pauseb){
            if (PARAMS.DEBUG == true) {
                ctx.font = 'bold 16px "Black Ops One"';
                ctx.fillStyle = "White";
                ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
                ctx.strokeStyle = "White";
                ctx.lineWidth = 2;
                ctx.strokeStyle = this.game.left ? "White" : "Grey";
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText("Left", 6.2 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
                ctx.strokeStyle = this.game.down ? "White" : "Grey";
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText("Down", 6.7 * PARAMS.BLOCKWIDTH + 2, 3 * PARAMS.BLOCKWIDTH + 2);
                ctx.strokeStyle = this.game.up ? "White" : "Grey";
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText("Up", 7.0 * PARAMS.BLOCKWIDTH + 2, 2 * PARAMS.BLOCKWIDTH - 2);
                ctx.strokeStyle = this.game.right ? "White" : "Grey";
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText("Right", 7.5 * PARAMS.BLOCKWIDTH + 4, 2.5 * PARAMS.BLOCKWIDTH);
                ctx.strokeStyle = this.game.reload ? "White" : "Grey";
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText("Reload", 5.5 * PARAMS.BLOCKWIDTH + 2, 1.2 * PARAMS.BLOCKWIDTH - 2);
                ctx.strokeStyle = this.game.click ? "White" : "Grey";
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText("Click", 7.5 * PARAMS.BLOCKWIDTH + 2, 1.2 * PARAMS.BLOCKWIDTH - 2);

                ctx.translate(0, 10);
                ctx.strokeStyle = "White";
                ctx.fillStyle = ctx.strokeStyle;
            }
        }

    };

};