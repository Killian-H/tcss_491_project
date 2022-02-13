class Controls {
    CANVAS = {w: 1024, h: 540};
    WASD = {x: 10, y: 120};
    RELOAD = {x: 10, y: 180};
    AIM = {x: 10, y: 240};
    LEFT_CLICK = {x: 10, y: 300};
    NUMBERS = {x: 10, y: 360};
    NUMBERS2 = {x: 10, y: 420};
    NUMBERS3 = {x: 10, y: 480};
    PAUSEBUTTON = {x: 10, y: 535};
    BACK = {x: 10, y: 50};
    CONTROLSPIC = ASSET_MANAGER.getAsset("./images/controlsimage.jpg");


    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {
        if(!this.game.pauseb){
        if (this.game.mouse != null) {
            if ((this.game.mouse.x - this.game.camera.x >= this.BACK.x && this.game.mouse.x - this.game.camera.x <= this.BACK.x + 185) && (this.game.mouse.y - this.game.camera.y >= this.BACK.y - 40 && this.game.mouse.y - this.game.camera.y <= this.BACK.y)
                && (this.game.click)) {
                ASSET_MANAGER.playAsset("./audio/click.wav");
                this.game.camera.loadStartMenuNoAudio();
            }
        }
        }
    }

    draw(ctx) {
        if(!this.game.pauseb){
        ctx.drawImage(this.CONTROLSPIC, this.x, this.y, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w, this.CANVAS.h * 1.15);
        ctx.font = 56 + 'px "Black Ops One"';
        ctx.fillStyle = "White";
        ctx.fillText("W/A/S/D = Move MasterChief", this.WASD.x, this.WASD.y);
        ctx.fillText("R = Reload", this.RELOAD.x, this.RELOAD.y);
        ctx.fillText("Aim = Move Mouse", this.AIM.x, this.AIM.y);
        ctx.fillText("Left Click = Shoot Weapon", this.LEFT_CLICK.x, this.LEFT_CLICK.y);
        ctx.fillText("1 = Assault Rifle, 2 = Pistol", this.NUMBERS.x, this.NUMBERS.y);
        ctx.fillText("3 = DMR, 4 = Shotgun", this.NUMBERS2.x, this.NUMBERS2.y);
        ctx.fillText("5 = Plasma Rifle", this.NUMBERS3.x, this.NUMBERS3.y);
        ctx.fillText("Escape = Pause Game", this.PAUSEBUTTON.x, this.PAUSEBUTTON.y);
        

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
}