class HunterBullet {

    PLASMA_CANNON_SHOT = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_bullet.png");

    constructor(game, x, y, target, rotation,shieldDmg, healthDmg, speed) {
        Object.assign(this, {game, x, y, target, rotation, shieldDmg, healthDmg, speed});

        this.shot = this.PLASMA_CANNON_SHOT;
        var dist = getDistance(this.x, this.y, target.x, target.y);
        this.cache = [];
        this.removetime = false;
        setTimeout(() => {this.removetime = true}, 6000);

        this.velocity = { x : (this.target.x - this.x) / dist * this.speed, y : (this.target.y - this.y) / dist * this.speed};

        this.updateBoundCircle();
    };

    drawAngle(ctx, rotation) {
        if (rotation < 0 || rotation > 359) return;

        if (!this.cache[rotation]) {
            let radians = rotation / 360 * 2 * Math.PI;
            let offScreenCanvas = document.createElement('canvas');

            offScreenCanvas.width = 128;
            offScreenCanvas.height = 128;

            let offScreenCtx = offScreenCanvas.getContext('2d');

            offScreenCtx.save();
            offScreenCtx.translate(64, 64);
            offScreenCtx.rotate(radians);
            offScreenCtx.translate(-64,-64);
            offScreenCtx.drawImage(this.shot, this.shot.width, this.shot.height);
            offScreenCtx.restore();
            this.cache[rotation] = offScreenCanvas;
        }
        var xOffset = 64;
        var yOffset = 64;

        ctx.drawImage(this.cache[rotation], this.x - xOffset - this.game.camera.x, this.y - yOffset - this.game.camera.y);
    }
    update() {
        if(!this.game.pauseb){
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        this.updateBoundCircle();
        if(this.removetime == true){
            this.removeFromWorld = true;
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BC.collisionCircle(entity.BB)) {
                if (entity instanceof masterchief) {
                    if (entity.armor - that.shieldDmg < 0) entity.armor = 0;
                    if (entity.health - that.healthDmg < 0) entity.health = 0;
                    entity.canRegen = false;
                    entity.regenTimer(6000);
                    entity.beenShot = true;
                    if(entity.health > 0 && entity.armor <= 0) {
                        entity.health = entity.health - that.healthDmg;
                        entity.beenShot = true;
                    }
                    else if(entity.armor > 0){
                        entity.armor = entity.armor - that.shieldDmg;
                        entity.beenShot = true;
                    }
                    that.removeFromWorld = true;
                }
                if (entity instanceof AbstractEnvironment) {
                    that.removeFromWorld = true;
                }
            }
        });
        }
    };

    drawMinimap(ctx, mmX, mmY) {
    };

    updateBoundCircle() {
        this.lastBC = this.BC;
        this.BC = new BoundingCircle(this.x + 2, this.y, 16);
    };

    // checkHealth() {

    // };

    draw(ctx){
        //if(!this.game.pauseb){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.BC.x - this.game.camera.x, this.BC.y - this.game.camera.y, this.BC.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

        // let angle = Math.atan2(this.velocity.y, this.velocity.x);
        // if (this.rotation < 0) this.rotation += Math.PI * 2;
        // let degrees = Math.floor(this.rotation / Math.PI / 2 *360);

        // this.drawAngle(ctx, degrees);
        ctx.save();
        ctx.translate(this.x - this.game.camera.x, this.y - this.game.camera.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.shot, -this.shot.width / 2, -this.shot.height/2);
        ctx.restore();
    };

};