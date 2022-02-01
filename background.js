class Background {
    WIDTH = 1024;
    HEIGHT = 540;
    BACKGROUND = ASSET_MANAGER.getAsset("./sprites/TestMap.png");

    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
        
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.BACKGROUND, this.x, this.y, this.WIDTH, this.HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH * 4 , this.HEIGHT * 4);
    }
}