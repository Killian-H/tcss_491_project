class bullet {
    constructor(game, x, y, clickX, clickY, rotation, speed, sprite, dmgShield, dmgHealth) {
        Object.assign(this, {game, x, y, clickX, clickY, rotation, speed, sprite, dmgShield, dmgHealth})
        //this.game = game;
        //this.radius = 2;
        //this.smooth = false;
        this.spritesheet = sprite;
        this.shieldDamage = dmgShield;
        this.healthDamage = dmgHealth;
        //this.target = {x: clickX, y: clickY};
        var dist = Math.sqrt(pow((clickX-x),2)+pow((clickY-y),2));
        this.cache = [];
        
        //var dist = math.distance()
        //console.log(dist);
        this.maxSpeed  = this.speed;
        //this.velocity = {x: clickX, y: clickY};
        this.velocity = {x: (this.clickX - this.x) / dist * this.maxSpeed, y: (this.clickY - this.y) / dist * this.maxSpeed};
        // this.chache = [];

        //thids.animations = [];
        this.removetime = false;
        setTimeout(() => {this.removetime = true}, 3000);
        this.elapsedTime = 0;
        this.updateBoundCircle();

    };

    drawAngle(ctx, rotation) {
        if (rotation < 0 || rotation > 359) return;

        if (!this.cache[rotation]) {
            let radians = rotation / 360 * 2 * Math.PI;
            let offScreenCanvas = document.createElement('canvas');

            offScreenCanvas.width = 24;
            offScreenCanvas.height = 24;

            let offScreenCtx = offScreenCanvas.getContext('2d');

            offScreenCtx.save();
            offScreenCtx.translate(13, 8);
            offScreenCtx.rotate(radians);
            offScreenCtx.translate(-13,-8);
            offScreenCtx.drawImage(this.spritesheet, this.spritesheet.width, this.spritesheet.height);
            offScreenCtx.restore();
            this.cache[rotation] = offScreenCanvas;
        }
        var xOffset = 13;
        var yOffset = 8;

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
                if (entity instanceof AbstractEnemy) {
                    if (entity.armor > 0) {
                        entity.armor = entity.armor - that.shieldDamage;
                        that.removeFromWorld = true;
                    } else {
                    entity.health = entity.health - that.healthDamage;
                    entity.beenShot = true;
                    that.removeFromWorld = true;
                    }
                }
                if (entity instanceof AbstractEnvironment) {
                    that.removeFromWorld = true;
                }
                if (entity instanceof Elite) {
                    entity.alarmGrunts = true;
                    that.removeFromWorld = true;
                }
            }
        }); 
    }  
    };

    updateBoundCircle() {
        this.lastBC = this.BC;
        this.BC = new BoundingCircle(this.x + 1, this.y - 1, 8);
    };

    draw(ctx){
        //if(!this.game.pauseb){
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
        // ctx.drawImage(this.spritesheet, -this.spritesheet.width / 2, -this.spritesheet.height/2);
        // ctx.restore();
        //}
    }
}