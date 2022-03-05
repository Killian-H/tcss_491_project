class Background {
    WIDTH = 10000;
    HEIGHT = 10000;
    BACKGROUND = ASSET_MANAGER.getAsset("./images/Grass_Background_Huge.png");

    constructor(game,x,y) {
        Object.assign(this, {game, x, y});
        
    }

    update() {
        if(!this.game.pauseb){
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    };

    draw(ctx) {
        ctx.drawImage(this.BACKGROUND, this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.HEIGHT);
    }
}