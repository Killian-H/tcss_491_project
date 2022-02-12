class EnemyBullet {

    PLASMA_SHOT = ASSET_MANAGER.getAsset("./sprites/grunt/plasma_shot.png");
    PLASMA_RIFLE_SHOT = ASSET_MANAGER.getAsset("./sprites/elite/plasma_rifle_shot.png");

    constructor(game, x, y, target, rotation, weapon) {
        Object.assign(this, {game, x, y, target, rotation, weapon});

        this.x = x;
        this.y = y;
        this.target = target;
        this.shot = this.PLASMA_SHOT;
        this.weapon = weapon;
        this.maxSpeed = 350;
        this.rotation = rotation;
        var dist = getDistance(this.x, this.y, target.x, target.y);
        this.cache = [];
        this.removetime = false;
        setTimeout(() => {this.removetime = true}, 3000);

        this.velocity = { x : (this.target.x - this.x) / dist * this.maxSpeed, y : (this.target.y - this.y) / dist *this.maxSpeed };

        this.updateBoundCircle();
    };

    drawAngle(ctx, rotation) {
        if (this.weapon == "pr") {
            this.shot = this.PLASMA_RIFLE_SHOT
        }
        if (rotation < 0 || rotation > 359) return;

        if (!this.cache[rotation]) {
            let radians = rotation / 360 * 2 * Math.PI;
            let offScreenCanvas = document.createElement('canvas');

            offScreenCanvas.width = 32;
            offScreenCanvas.height = 32;

            let offScreenCtx = offScreenCanvas.getContext('2d');

            offScreenCtx.save();
            offScreenCtx.translate(16, 16);
            offScreenCtx.rotate(radians);
            offScreenCtx.translate(-16, -16);
            offScreenCtx.drawImage(this.shot, this.shot.width, this.shot.height);
            offScreenCtx.restore();
            this.cache[rotation] = offScreenCanvas;
        }
        var xOffset = 16;
        var yOffset = 16;

        ctx.drawImage(this.cache[rotation], this.x - this.game.camera.x, this.y - this.game.camera.y);
    }
    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        this.updateBoundCircle();
        if(this.removetime == true){
            this.removeFromWorld = true;
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BC.collisionCircle(entity.BB) && that.weapon == "pp") {
                if (entity instanceof masterchief) {
                    if (entity.armor - 12 < 0) entity.armor = 0;
                    if (entity.health - 6 < 0) entity.health = 0;
                    entity.canRegen = false;
                    entity.regenTimer(4000);
                    entity.beenShot = true;
                    if(entity.health > 0 && entity.armor <= 0) {
                        entity.health = entity.health - 6;
                    }
                    else if(entity.armor > 0){
                        entity.armor = entity.armor - 12;
                    }
                    that.removeFromWorld = true;
                }
                if (entity instanceof AbstractEnvironment) {
                    that.removeFromWorld = true;
                }
            }
            else if (entity.BB && that.BC.collisionCircle(entity.BB) && that.weapon == "pr") {
                if (entity instanceof masterchief) {
                    if (entity.armor - 14 < 0) entity.armor = 0;
                    if (entity.health - 9 < 0) entity.health = 0;
                    entity.canRegen = false;
                    entity.regenTimer(4000);
                    entity.beenShot = true;
                    if(entity.health > 0 && entity.armor <= 0) {
                        entity.health = entity.health - 9;
                    }
                    else if(entity.armor > 0){
                        entity.armor = entity.armor - 14;
                    }
                    that.removeFromWorld = true;
                }
                if (entity instanceof AbstractEnvironment) {
                    that.removeFromWorld = true;
                }
            }
        });
    };

    updateBoundCircle() {
        this.lastBC = this.BC;
        this.BC = new BoundingCircle(this.x, this.y, 7);
    };

    // checkHealth() {

    // };

    draw(ctx){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.BC.x - this.game.camera.x, this.BC.y - this.game.camera.y, this.BC.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

        let angle = Math.atan2(this.velocity.y, this.velocity.x);
        if (this.rotation < 0) this.rotation += Math.PI * 2;
        let degrees = Math.floor(this.rotation / Math.PI / 2 *360);

        this.drawAngle(ctx, degrees);
        // ctx.save();
        // ctx.translate(this.x - this.game.camera.x, this.y - this.game.camera.y);
        // ctx.rotate(this.rotation);
        // ctx.drawImage(this.gun, -this.gun.width / 2, -this.gun.height/2);
        // ctx.restore();
    };

};