class Background {
    WIDTH = 1024;
    HEIGHT = 540;
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
        if(!this.game.pauseb){
            ctx.drawImage(this.BACKGROUND, this.x, this.y, this.WIDTH, this.HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.HEIGHT);
        }
    }
}