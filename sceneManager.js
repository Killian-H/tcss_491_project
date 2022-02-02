class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.masterchief = new masterchief(game, 100, 100);
        this.pine = new Tree(game, 0, 0);
        this.rock = new Rock(game, 128, 128);
        this.terrain = new Terrain(game, 0, 0);
        this.terrain2 = new Terrain(game, 128, 128);
        this.terrain3 = new Terrain(game, 0, 128);
        this.terrain4 = new Terrain(game, 128, 0);
        this.rock = new Rock(game, 128, 128);
        this.game.addEntityToFront(this.pine);
        this.game.addEntityToFront(this.rock);
        this.game.addEntity(this.masterchief);
        this.grunt = new Grunt(game, 200, 200);
        this.grunt2 = new Grunt(game, 600, 100);
        this.game.addEntity(this.grunt);
        this.game.addEntity(this.grunt2);
        this.game.addEntity(this.terrain);
        this.game.addEntity(this.terrain2);
        this.game.addEntity(this.terrain3);
        this.game.addEntity(this.terrain4);

    };
    updateAudio() {
        if (PARAMS.MUTE == true) {
            ASSET_MANAGER.muteAudio(PARAMS.MUTE)
        }
    }

    update() {
        this.updateAudio();
        let midpoint = 1024/2;

        this.x = this.masterchief.x - midpoint;
    };

    draw(ctx) {
        //ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Arial"';
        ctx.font = 'bold 48px serif';
        ctx.fillStyle = "White";
        ctx.strokeStyle = "White";
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