class Medkit {

    MED_KIT = ASSET_MANAGER.getAsset("./sprites/healthpak.png");

    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.BC = new BoundingCircle(this.x, this.y, 7);
    };

    update() {
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BC.collisionCircle(entity.BB)) {
                if (entity instanceof masterchief) {
                    if(entity.health < (entity.MAX_HEALTH-19)){
                        entity.health += 20;
                        that.removeFromWorld = true;
                    }
                    else if(entity.health > (entity.MAX_HEALTH-20) && entity.health < entity.MAX_HEALTH){
                        entity.health = entity.MAX_HEALTH;
                        that.removeFromWorld = true;
                    }
                }
            }
        });
    };

    draw(ctx){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.BC.x - this.game.camera.x, this.BC.y - this.game.camera.y, this.BC.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.save();
        ctx.drawImage(this.MED_KIT, this.x - this.game.camera.x, this.y - this.game.camera.y);
        ctx.restore();
    };
}