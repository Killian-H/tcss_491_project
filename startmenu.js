class StartMenu {
    CANVAS = {w: 1024, h: 540};
    TITLE_POSITION = {x: (1024 / 2) - 325, y: 75};
    START_POSITION = {x: (1024 / 2) - 60, y: 150};
    STARTPIC = ASSET_MANAGER.getAsset("./images/menu pic.jpg");


    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.START_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.START_POSITION.x + 160) && (this.game.mouse.y - this.game.camera.y >= this.START_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.START_POSITION.y)
                && (this.game.click)) {
                //play click audio
                this.game.camera.loadLevel(JSON.parse(TestMap), JSON.parse(KillianTileSet));
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.STARTPIC, this.x + 200, this.y + 100, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w * 1.1, this.CANVAS.h);

        ctx.font = 56 + 'px "Black Ops One"';
        ctx.fillStyle = "Black";
        ctx.fillText("Halo: Combat Devolved", this.TITLE_POSITION.x, this.TITLE_POSITION.y);

        ctx.fillStyle = "Black";
        
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.START_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.START_POSITION.x + 160) && (this.game.mouse.y - this.game.camera.y >= this.START_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.START_POSITION.y)) {
                ctx.fillStyle = "Red";
                ctx.fillText("Start", this.START_POSITION.x, this.START_POSITION.y);
            }
            else {
                ctx.fillStyle = "Black";
                ctx.fillText("Start", this.START_POSITION.x, this.START_POSITION.y);
            }
        }




    }
}