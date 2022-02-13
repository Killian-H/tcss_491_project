class StartMenu {
    CANVAS = {w: 1024, h: 540};
    TITLE_POSITION = {x: (1024 / 2) - 493, y: 75};
    START_POSITION = {x: (1024 / 2) - 60, y: 150};
    CONTROLS_POSITION = {x: (1024 / 2) - 110, y: 225};
    CREDITS_POSITION = {x: (1024 / 2) - 90, y: 300};
    STARTPIC = ASSET_MANAGER.getAsset("./images/menu pic.jpg");


    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {
        if(!this.game.pauseb){
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.START_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.START_POSITION.x + 160) && (this.game.mouse.y - this.game.camera.y >= this.START_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.START_POSITION.y)
                && (this.game.click)) {
                ASSET_MANAGER.playAsset("./audio/click.wav");
                this.game.camera.loadLevel(new TestLevel());
            }
            if ((this.game.mouse.x - this.game.camera.x >= this.CONTROLS_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.CONTROLS_POSITION.x + 267) && (this.game.mouse.y - this.game.camera.y >= this.CONTROLS_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.CONTROLS_POSITION.y)
                && (this.game.click)) {
                ASSET_MANAGER.playAsset("./audio/click.wav");
                this.game.camera.loadControls();
            }
            if ((this.game.mouse.x - this.game.camera.x >= this.CREDITS_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.CREDITS_POSITION.x + 225) && (this.game.mouse.y - this.game.camera.y >= this.CREDITS_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.CREDITS_POSITION.y)
                && (this.game.click)) {
                ASSET_MANAGER.playAsset("./audio/click.wav");
                this.game.camera.loadCredits();
            }
        }
        }
    }

    draw(ctx) {
        if(!this.game.pauseb){
        ctx.drawImage(this.STARTPIC, this.x + 200, this.y + 100, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w * 1.1, this.CANVAS.h);

        ctx.font = 80 + 'px "Black Ops One"';
        ctx.fillStyle = "Black";
        ctx.fillText("Halo: Combat Devolved", this.TITLE_POSITION.x, this.TITLE_POSITION.y);
        ctx.font = 56 + 'px "Black Ops One"';
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
            if ((this.game.mouse.x - this.game.camera.x >= this.CONTROLS_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.CONTROLS_POSITION.x + 267) && (this.game.mouse.y - this.game.camera.y >= this.CONTROLS_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.CONTROLS_POSITION.y)) {
                ctx.fillStyle = "Red";
                ctx.fillText("Controls", this.CONTROLS_POSITION.x, this.CONTROLS_POSITION.y);
            }
            else {
                ctx.fillStyle = "Black";
                ctx.fillText("Controls", this.CONTROLS_POSITION.x, this.CONTROLS_POSITION.y);
            }
            if ((this.game.mouse.x - this.game.camera.x >= this.CREDITS_POSITION.x && this.game.mouse.x - this.game.camera.x <= this.CREDITS_POSITION.x + 225) && (this.game.mouse.y - this.game.camera.y >= this.CREDITS_POSITION.y - 40 && this.game.mouse.y - this.game.camera.y <= this.CREDITS_POSITION.y)) {
                ctx.fillStyle = "Red";
                ctx.fillText("Credits", this.CREDITS_POSITION.x, this.CREDITS_POSITION.y);
            }
            else {
                ctx.fillStyle = "Black";
                ctx.fillText("Credits", this.CREDITS_POSITION.x, this.CREDITS_POSITION.y);
            }
        }
        }

    }
}