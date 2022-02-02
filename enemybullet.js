class EnemyBullet {

    PLASMA_SHOT = ASSET_MANAGER.getAsset("./sprites/grunt/plasma_shot.png");
    constructor(game, x, y, target, rotation, weapon) {
        Object.assign(this, {game, x, y, target, rotation, weapon});

        this.target = target;
        this.weapon = weapon;
        this.maxSpeed = 300;
        var dist = getDistance(this.x, this.y, target.x, target.y);

        this.velocity = { x : (this.target.x - this.x) / dist * this.maxSpeed, y : (this.target.y - this.y) / dist *this.maxSpeed };

        this.updateBoundCircle();
    };

    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        this.updateBoundCircle();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BC.collisionCircle(entity.BB) && that.weapon == "pp") {
                if (entity instanceof masterchief) {
                    entity.beenShot = true;
                    if(entity.health > 0 && entity.armor == 0){
                        entity.health = entity.health - 20;
                    }
                    else if(entity.armor > 0){
                        entity.armor = entity.armor - 20;
                    }
                    that.removeFromWorld = true;
                }

            }
        });
        if (this.target instanceof masterchief && this.target.beenShot == false) {
            while (this.target.health < this.target.MAX_HEALTH) {
                this.target.health += 1;
            }
        }
    };

    updateBoundCircle() {
        this.lastBC = this.BC;
        this.BC = new BoundingCircle(this.x, this.y, 7);
    };

    checkHealth() {

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
        ctx.translate(this.x - this.game.camera.x, this.y - this.game.camera.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.PLASMA_SHOT, -this.PLASMA_SHOT.width / 2, -this.PLASMA_SHOT.height/2);
        ctx.restore();
    };

};