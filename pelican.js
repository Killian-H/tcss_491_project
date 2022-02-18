class Pelican {
    WIDTH = 600;
    HEIGHT = 292;
    POSX = 0;
    POSY = 0;
    PELICAN = ASSET_MANAGER.getAsset("./images/pelican.png");

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {
        this.x += 75 * this.game.clockTick;
        this.y -= 120 * this.game.clockTick;

        //console.log("added");
    }

    draw(ctx) {
        ctx.drawImage(this.PELICAN, this.POSX, this.POSY, this.WIDTH - this.POSX, this.HEIGHT - this.POSY, this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.HEIGHT);
    }



}