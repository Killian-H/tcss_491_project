class Medkit {

    MED_KIT = ASSET_MANAGER.getAsset("./images/healthpack.png");
    WIDTH = 200;
    HEIGHT = 200;
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x+3, this.y, 43, 50);
    };

    update() {
        if(!this.game.pauseb){
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof masterchief) {
                        if(entity.health < (entity.MAX_HEALTH-49)){
                            ASSET_MANAGER.playAsset("./audio/Health_Sound.mp3");
                            entity.health += 50;
                            that.removeFromWorld = true;
                        }
                        else if(entity.health > (entity.MAX_HEALTH-50) && entity.health < entity.MAX_HEALTH){
                            ASSET_MANAGER.playAsset("./audio/Health_Sound.mp3");
                            entity.health = entity.MAX_HEALTH;
                            that.removeFromWorld = true;
                        }
                    }
                }
            });
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "purple";
        //console.log(PARAMS.SCALE);
        ctx.fillRect(mmX + this.x / 32.5, mmY + this.y / 32.5, PARAMS.SCALE * 1.7 , PARAMS.SCALE * 1.7);
    }

    draw(ctx){
        //if(!this.game.pauseb){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        ctx.save();
        ctx.drawImage(this.MED_KIT, this.x - this.game.camera.x, this.y - this.game.camera.y,50,50)// this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.HEIGHT);
        ctx.restore();
        //}
    };
}