class DeathMenu {
    CANVAS = {w: 1024, h: 540};
    RESTART_POSITION = {x: (1024 / 2) - 90, y: 385};
    QUIT_POSITION = {x: (1024 / 2) -33, y: 455};
    DEATHPIC = ASSET_MANAGER.getAsset("./images/gameoverscreen.jpg");
    CHIEFHEAD = ASSET_MANAGER.getAsset("./images/chiefheadimage.png");


    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
        this.game.unpause();
    }

    update() {
        if(!this.game.pauseb){
            if (this.game.mouse != null) {
                if ((this.game.mouse.x - this.game.camera.x >= this.RESTART_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.RESTART_POSITION.x + 235) && (this.game.mouse.y - this.game.camera.y >= this.RESTART_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.RESTART_POSITION.y) 
                    && (this.game.click)) {
                    ASSET_MANAGER.playAsset("./audio/click.wav");
                    this.game.camera.loadLevel(levelOne);
                    ASSET_MANAGER.playAsset("./music/music_track.mp3");
                }
                if ((this.game.mouse.x - this.game.camera.x >= this.QUIT_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.QUIT_POSITION.x + 120) && (this.game.mouse.y - this.game.camera.y >= this.QUIT_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.QUIT_POSITION.y)
                    && (this.game.click)) {
                    ASSET_MANAGER.playAsset("./audio/click.wav");
                    this.game.camera.loadStartMenu();
                }
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.DEATHPIC, this.x, this.y, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w * 1.6, this.CANVAS.h * 1.2);
        //ctx.drawImage(this.CHIEFHEAD, this.x - 600, this.y, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w * 0.4, this.CANVAS.h * 0.4);
        ctx.font = 56 + 'px "Black Ops One"';
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.RESTART_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.RESTART_POSITION.x + 235) && (this.game.mouse.y - this.game.camera.y >= this.RESTART_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.RESTART_POSITION.y)) {
                ctx.fillStyle = "Blue";
                ctx.fillText("Restart", this.RESTART_POSITION.x, this.RESTART_POSITION.y);
            }
            else {
                ctx.fillStyle = "White";
                ctx.fillText("Restart", this.RESTART_POSITION.x, this.RESTART_POSITION.y);
            }
            if ((this.game.mouse.x - this.game.camera.x >= this.QUIT_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.QUIT_POSITION.x + 120) && (this.game.mouse.y - this.game.camera.y >= this.QUIT_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.QUIT_POSITION.y)) {
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