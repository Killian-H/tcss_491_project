class SceneManager {
    MID_POINT_X = 1024/2;
    MID_POINT_Y = 540/2;
    constructor(game) {
        this.game = game;
        this.x = this.MID_POINT_X;
        this.y = this.MID_POINT_Y;
        this.game.camera = this;
        this.masterchief = new masterchief(game, this.x, this.y);
        // this.pine = new Tree(game, 0, 0);
        // this.rock = new Rock(game, 128, 128);
        // this.terrain = new Terrain(game, 0, 0);
        // this.terrain2 = new Terrain(game, 128, 128);
        // this.terrain3 = new Terrain(game, 0, 128);
        // this.terrain4 = new Terrain(game, 128, 0);
        // this.rock = new Rock(game, 128, 128);
        //this.game.addEntityToFront(this.pine);
        //this.game.addEntityToFront(this.rock);
        //this.game.addEntity(this.masterchief);
        //this.grunt = new Grunt(game, 200, 200);
        //this.grunt2 = new Grunt(game, 600, 100);
        //this.game.addEntity(this.grunt);
        //this.game.addEntity(this.grunt2);
        //this.terrain = new Terrain(game, 0, 0);
        //this.game.addEntity(this.terrain);
        //this.background = new Background(game, 0, 0);
        //this.game.addEntity(this.background);
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

    loadStartMenu() {
        this.clearEntities();
        this.startmenu = new StartMenu(this.game, 0, 0);
        this.game.addEntity(this.startmenu);
        this.update();
    }

    loadLevel() {
        this.clearEntities();
        this.masterchief = new masterchief(this.game, this.x, this.y);
        // this.pine = new Tree(this/game, 0, 0);
        // this.rock = new Rock(this.game, 128, 128);
        // this.terrain = new Terrain(this.game, 0, 0);
        // this.terrain2 = new Terrain(this.game, 128, 128);
        // this.terrain3 = new Terrain(this.game, 0, 128);
        // this.terrain4 = new Terrain(this.game, 128, 0);
        // this.rock = new Rock(this.game, 128, 128);
        // this.game.addEntityToFront(this.pine);
        // this.game.addEntityToFront(this.rock);
        this.game.addEntity(this.masterchief);
        this.grunt = new Grunt(this.game, 200, 200);
        //this.grunt2 = new Grunt(game, 600, 100);
        this.game.addEntity(this.grunt);
        // //this.game.addEntity(this.grunt2);
        // this.terrain = new Terrain(game, 0, 0);
        // //this.game.addEntity(this.terrain);
        this.background = new Background(this.game, 0, 0);
        this.game.addEntity(this.background);
        this.update();
    }

    update() {
        this.updateAudio();
        var lastX = this.x;
        var lastY = this.y;
        this.x = this.masterchief.x - this.MID_POINT_X
        this.y = this.masterchief.y - this.MID_POINT_Y;
        if (this.game.mouse) {
            this.game.mouse.x -= lastX - this.x;
            this.game.mouse.y -= lastY - this.y;
        }
    };

    draw(ctx) {
        //ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Arial"';
        ctx.font = 'bold 48px serif';
        ctx.fillStyle = "White";
        ctx.strokeStyle = "White";
        //commented out because it appears on home screen
        ctx.fillText((this.masterchief.ammo+"/"+this.masterchief.AMMO_DEFAULT), 25, 50);
        ctx.fillText(("🛡️ "+this.masterchief.armor), 850, 50);
        ctx.fillText(("➕ "+this.masterchief.health), 850, 110);
        if(this.masterchief.health == 0){
            ctx.fillText("Game Over 💀", 350, 250);
        }
        //ctx.strokeText((this.masterchief.ammo+"ammo"), 1000, 500);
        if (PARAMS.DEBUG == true) {
            
            ctx.fillStyle = "White";
            ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
            ctx.strokeStyle = "White";
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.game.left ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Left", 5.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.down ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Down", 6.2 * PARAMS.BLOCKWIDTH + 2, 4 * PARAMS.BLOCKWIDTH + 2);
            ctx.strokeStyle = this.game.up ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Up", 6.8 * PARAMS.BLOCKWIDTH + 2, 2 * PARAMS.BLOCKWIDTH - 2);
            ctx.strokeStyle = this.game.right ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Right", 7.5 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.reload ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Reload", 8.5 * PARAMS.BLOCKWIDTH + 2, 1.2 * PARAMS.BLOCKWIDTH - 2);
            ctx.strokeStyle = this.game.click ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Click", 4.5 * PARAMS.BLOCKWIDTH + 2, 1.2 * PARAMS.BLOCKWIDTH - 2);


            ctx.translate(0, 10);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle;
        }

    };
};