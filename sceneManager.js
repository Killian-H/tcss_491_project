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

    loadStartMenu() {
        this.clearEntities();
        this.startmenu = new StartMenu(this.game, 0, 0);
        this.game.addEntity(this.startmenu);
        ASSET_MANAGER.playAsset("./music/halo 3 theme.mp3");
        ASSET_MANAGER.autoRepeat("./music/halo 3 theme.mp3");
        this.update();
    }

    loadWinMenu() {
        this.sleep(1000).then(() => {
            this.clearEntities();
            ASSET_MANAGER.pauseBackgroundMusic();
            this.winmenu = new WinMenu(this.game, 0, 0);
            this.game.addEntityToFront(this.winmenu);
            this.update();
            ASSET_MANAGER.playAsset("./audio/victory_sound.mp3");
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
            this.game.addEntityToFront(this.deathmenu);
            this.update();
            ASSET_MANAGER.playAsset("./audio/gameover.mp3");
        });
    }

    loadControls() {
        this.clearEntities();
        this.controls = new Controls(this.game, 0, 0);
        this.game.addEntityToFront(this.controls);
        this.update();
    }

    loadCredits() {
        this.clearEntities();
        this.credits = new Credits(this.game, 0, 0);
        this.game.addEntityToFront(this.credits);
        this.update();
    }

    loadLevel(level) {
        this.game.unpause();
        this.clearEntities();
        this.resetXanyY();
        let map = level.map.layers[0];
        let tiles = map.data;
        let currX = 0;
        let currY = 0;
        let tileCounter = 0;
        for(let i = 0; i < map.height; i++) {
            for(let j = 0; j < map.width; j++) {
                let tile = tiles[tileCounter];
                //console.log(tile);
                switch(tile) {
                    case 0:
                        break; //empty tile
                    case this.GRASS_1_ID:  
                    case this.GRASS_2_ID:
                    case this.GRASS_3_ID:
                        console.log("Loading Grass at X: ", currX, " Y: ", currY);
                        this.game.addEntity(new Terrain(this.game,currX, currY, tile - 4));
                        currX += this.TILE_WIDTH;
                        tileCounter++;
                        break;
                    case this.DIRT_ID:
                        console.log("Loading Dirt at X: ", currX, " Y: ", currY);
                        this.game.addEntity(new Dirt(this.game,currX, currY));
                        currX += this.TILE_WIDTH;
                        tileCounter++;
                        break;
                    case this.DIRT_WALL_ID:
                        console.log("Loading Dirt Wall at X: ", currX, " Y: ", currY);
                        this.game.addEntity(new Wall(this.game,currX, currY));
                        currX += this.TILE_WIDTH;
                        tileCounter++;
                        break;
                    case this.DIRT_WALL_TOP_ID:
                        console.log("Loading Dirt Wall (grass Top) at X: ", currX, " Y: ", currY);
                        this.game.addEntity(new WallTop(this.game,currX, currY));
                        currX += this.TILE_WIDTH;
                        tileCounter++;
                        break;    
                }
            }
            console.log("Loaded row");
            currX = 0;
            currY += this.TILE_WIDTH;
            
        }
        this.grunt = new Grunt(this.game, 200, 200);
        this.masterchief.resetHealth();
        this.masterchief.resetShield();
        this.masterchief.resetAmmo();
        this.masterchief.resetState();
        this.masterchief = new masterchief(this.game, this.x - this.game.camera.x + this.MID_POINT_X, this.y - this.game.camera.y + this.MID_POINT_Y);
        this.hud = new hud(this.game, this.x, this.y, this.masterchief);
        this.game.addEntityToFront(this.hud);
        this.game.addEntityToFront(this.masterchief);
        this.game.addEntityToFront(this.grunt)
        this.game.addEntityToFront(new Elite(this.game, 250, 400));
        this.grunt2 = new Grunt(this.game, 1000, 200);;
        this.game.addEntityToFront(this.grunt2);
        this.medkit = new Medkit(this.game, 500, 500);
        this.game.addEntityToFront(this.medkit);
        this.game.enemiesInLevel = 3;
        this.update();
    }

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
        //ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Arial"';
       // ctx.font = 'bold 48px serif';
        //ctx.fillStyle = "White";
        //ctx.strokeStyle = "White";
        //commented out because it appears on home screen
        //ctx.fillText((this.masterchief.ammo+"/"+this.masterchief.AMMO_DEFAULT), 25, 50);
        //ctx.fillText(("🛡️ "+this.masterchief.armor), 850, 50);
        //ctx.fillText(("➕ "+this.masterchief.health), 850, 110);
        //if(this.masterchief.health == 0){
            //ctx.fillText("Game Over 💀", 350, 250);
        //}
        //ctx.strokeText((this.masterchief.ammo+"ammo"), 1000, 500);
        if (PARAMS.DEBUG == true) {
            
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