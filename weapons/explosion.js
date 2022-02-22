class Explosion {

    EXPLODE = ASSET_MANAGER.getAsset("./sprites/weapons/rocket_explosion.png");
    IN_DMG = 300;
    OUT_DMG = 140;

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.innerDamage = this.IN_DMG;
        this.outerDamage = this.OUT_DMG;
        this.sprite = this.EXPLODE;
        this.removetime = false;
        this.canHit = true;
        setTimeout(() => {this.removetime = true}, 0);
        this.updateBoundBox();
    }

    updateBoundBox() {
        this.BB = new BoundingBox(this.x, this.y, 210, 150);
    };

    update() {
        if(!this.game.pauseb) {
            var that = this;
        }
        if(this.removetime) {
            this.removeFromWorld = true;
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof AbstractEnemy) {
                    entity.beenShot = true;
                    console.log(that.x + " " + that.y);
                    let dist = getDistance(that.x + (that.sprite.width / 2), that.y + (that.sprite.height / 2), entity.x, entity.y);
                    let distDamage = (200 / (.01 * dist * 1.2));
                    console.log(distDamage);
                    console.log(that.sprite.width / 2);
                    console.log(that.sprite.height / 2);
                    if (entity instanceof Elite) {
                        if (entity.armor - distDamage <= 0) {
                            distDamage = distDamage - entity.armor;
                            entity.armor = 0;
                            entity.health = entity.health - distDamage;
                            entity.alarmGrunts = true;
                        } else {
                            entity.armor = entity.armor - distDamage;
                        }
                    }
                    if (entity instanceof Grunt) {
                        entity.health = entity.health - distDamage;
                    }
                }
            }
        }); 
    };

    draw(ctx) {
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        ctx.drawImage(this.sprite, this.x - this.game.camera.x, this.y - this.game.camera.y,this.sprite.width * 2.5,this.sprite.height *2.5)
    };
}