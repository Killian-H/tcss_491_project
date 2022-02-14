class SplashScreen {
    CANVAS = {w: 1024, h: 540};
    TITLE_POSITION = {x: (1024 / 2) - 493, y: 75};
    START_POSITION = {x: (1024 / 2) - 200, y: 500};
    CONTROLS_POSITION = {x: (1024 / 2) - 110, y: 225};
    CREDITS_POSITION = {x: (1024 / 2) - 90, y: 300};
    STARTPIC = ASSET_MANAGER.getAsset("./images/menu pic.jpg");


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
            if ((this.game.mouse.x - this.game.camera.x >= this.START_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.START_POSITION.x + 400) && (this.game.mouse.y - this.game.camera.y >= this.START_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.START_POSITION.y)
                && (this.game.click)) {
                ASSET_MANAGER.playAsset("./audio/click.wav");
                this.game.camera.loadStartMenu();
            }
        }
        }
    }

    draw(ctx) {
        //if(!this.game.pauseb){
        //ctx.drawImage(this.STARTPIC, this.x + 200, this.y + 100, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w * 1.1, this.CANVAS.h);
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, 1024, 540);
        ctx.font = 56 + 'px "Black Ops One"';
        ctx.fillStyle = "Black";
        
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.START_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.START_POSITION.x + 400) && (this.game.mouse.y - this.game.camera.y >= this.START_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.START_POSITION.y)) {
                ctx.fillStyle = "Red";
                ctx.fillText("Click to Start", this.START_POSITION.x, this.START_POSITION.y);
            }
            else {
                ctx.fillStyle = "White";
                ctx.fillText("Click to Start", this.START_POSITION.x, this.START_POSITION.y);
            }
        }
        //}

    }
}