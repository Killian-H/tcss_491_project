class Controls {
    CANVAS = {w: 1024, h: 540};
    WASD = {x: 10, y: 150};
    RELOAD = {x: 10, y: 250};
    AIM = {x: 10, y: 350};
    LEFT_CLICK = {x: 10, y: 450};
    BACK = {x: 10, y: 50};
    CONTROLSPIC = ASSET_MANAGER.getAsset("./images/controlsimage.jpg");


    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.BACK.x && this.game.mouse.x - this.game.camera.x <= this.BACK.x + 185) && (this.game.mouse.y - this.game.camera.y >= this.BACK.y - 40 && this.game.mouse.y - this.game.camera.y <= this.BACK.y)
                && (this.game.click)) {
                ASSET_MANAGER.playAsset("./audio/click.wav");
                this.game.camera.loadStartMenu();
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.CONTROLSPIC, this.x, this.y, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w, this.CANVAS.h * 1.15);
        ctx.font = 56 + 'px "Black Ops One"';
        ctx.fillStyle = "White";
        ctx.fillText("W/A/S/D = Move MasterChief", this.WASD.x, this.WASD.y);
        ctx.fillText("R = Reload", this.RELOAD.x, this.RELOAD.y);
        ctx.fillText("Aim = Move Mouse", this.AIM.x, this.AIM.y);
        ctx.fillText("Left Click = Shoot Weapon", this.LEFT_CLICK.x, this.LEFT_CLICK.y);

        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.BACK.x && this.game.mouse.x - this.game.camera.x <= this.BACK.x + 185) && (this.game.mouse.y - this.game.camera.y >= this.BACK.y - 40 && this.game.mouse.y - this.game.camera.y <= this.BACK.y)) {
                ctx.fillStyle = "Red";
                ctx.fillText("<Back", this.BACK.x, this.BACK.y);
            }
            else {
                ctx.fillStyle = "Black";
                ctx.fillText("<Back", this.BACK.x, this.BACK.y);
            }
        }
    }
}