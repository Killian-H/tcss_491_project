class DeathMenu {
    CANVAS = {w: 1024, h: 540};
    RESTART_POSITION = {x: (1024 / 2) - 60, y: 385};
    QUIT_POSITION = {x: (1024 / 2) -33, y: 445};
    DEATHPIC = ASSET_MANAGER.getAsset("./images/gameoverscreen.jpg");


    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.RESTART_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.RESTART_POSITION.x + 155) && (this.game.mouse.y - this.game.camera.y >= this.RESTART_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.RESTART_POSITION.y) 
                && (this.game.click)) {
                //play click audio
                this.game.camera.loadLevel();
                ASSET_MANAGER.playAsset("./music/halo 3 theme.mp3");
            }
            if ((this.game.mouse.x - this.game.camera.x >= this.QUIT_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.QUIT_POSITION.x + 95) && (this.game.mouse.y - this.game.camera.y >= this.QUIT_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.QUIT_POSITION.y)
                && (this.game.click)) {
                //transition audio here
                this.game.camera.loadStartMenu();
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.DEATHPIC, this.x, this.y, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w * 1.6, this.CANVAS.h * 1.2);
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.RESTART_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.RESTART_POSITION.x + 155) && (this.game.mouse.y - this.game.camera.y >= this.RESTART_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.RESTART_POSITION.y)) {
                ctx.fillStyle = "Blue";
                ctx.fillText("Restart", this.RESTART_POSITION.x, this.RESTART_POSITION.y);
            }
            else {
                ctx.fillStyle = "White";
                ctx.fillText("Restart", this.RESTART_POSITION.x, this.RESTART_POSITION.y);
            }
            if ((this.game.mouse.x - this.game.camera.x >= this.QUIT_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.QUIT_POSITION.x + 95) && (this.game.mouse.y - this.game.camera.y >= this.QUIT_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.QUIT_POSITION.y)) {
                ctx.fillStyle = "Blue";
                ctx.fillText("Quit", this.QUIT_POSITION.x, this.QUIT_POSITION.y);
            }
            else {
                ctx.fillStyle = "White";
                ctx.fillText("Quit", this.QUIT_POSITION.x, this.QUIT_POSITION.y);
            }
        }




    }
}