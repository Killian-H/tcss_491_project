class EnemyBullet {

    PLASMA_SHOT = ASSET_MANAGER.getAsset("./sprites/grunt/plasma_shot.png");
    constructor(game, x, y, target, rotation, weapon) {
        Object.assign(this, {game, x, y, target, rotation, weapon});

        this.weapon = weapon;
        this.maxSpeed = 300;
        var dist = getDistance(this.x, this.y, target.x, target.y);

        this.velocity = { x : (this.target.x - this.x) / dist * this.maxSpeed, y : (this.target.y - this.y) / dist *this.maxSpeed };

        this.updateBoundCircle();
        this.elapsedTime = 0;
    };

    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        this.updateBoundCircle();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BC.collisionCircle(entity.BB) && that.weapon == "pp") {
                if (entity instanceof masterchief) {
                    entity.health = entity.health - 20;
                    that.removeFromWorld = true;
                }

            }
        });   
    };

    updateBoundCircle() {
        this.lastBC = this.BC;
        this.BC = new BoundingCircle(this.x, this.y, 7);
    };

    draw(ctx){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.BC.x, this.BC.y, this.BC.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.PLASMA_SHOT, -this.PLASMA_SHOT.width / 2, -this.PLASMA_SHOT.height/2);
        ctx.restore();
    };

};