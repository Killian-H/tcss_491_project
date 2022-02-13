class Credits {
    CANVAS = {w: 1024, h: 540};
    DEVS = {x: 10, y: 120};
    KILLIAN = {x: 10, y: 170};
    LEVI = {x: 10, y: 220};
    JEFF = {x: 10, y: 270};
    TROY = {x: 10, y: 320};
    SPECIAL = {x: 10, y: 395};
    CHRIS = {x: 10, y: 450};
    BACK = {x: 10, y: 50};
    CREDITSSPIC = ASSET_MANAGER.getAsset("./images/creditsimage.jpg");


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
        ctx.drawImage(this.CREDITSSPIC, this.x, this.y, this.CANVAS.w, this.CANVAS.h, this.x, this.y, this.CANVAS.w * 1.76, this.CANVAS.h * 1.65);
        ctx.font = 56 + 'px "Black Ops One"';
        ctx.fillStyle = "Black";
        ctx.fillText("Developers: ", this.DEVS.x, this.DEVS.y);
        ctx.fillStyle = "Red";
        ctx.fillText("Killian Hickey", this.KILLIAN.x, this.KILLIAN.y);
        ctx.fillText("Levi McCoy", this.LEVI.x, this.LEVI.y);
        ctx.fillText("Jeff Schultz", this.JEFF.x, this.JEFF.y);
        ctx.fillText("Troy Zon", this.TROY.x, this.TROY.y);
        ctx.fillStyle = "Black";
        ctx.fillText("Special Thanks: ", this.SPECIAL.x, this.SPECIAL.y);
        ctx.fillStyle = "Red";
        ctx.fillText("Chris Marriott", this.CHRIS.x, this.CHRIS.y);

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