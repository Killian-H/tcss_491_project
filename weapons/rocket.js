class Rocket {

    constructor(game, x, y, clickX, clickY, rotation, speed, sprite, dmgShield, dmgHealth) {
        Object.assign(this, {game, x, y, clickX, clickY, rotation, speed, sprite, dmgShield, dmgHealth})
        //this.game = game;
        //this.radius = 2;
        //this.smooth = false;
        this.spritesheet = sprite;
        this.shieldDamage = dmgShield;
        this.healthDamage = dmgHealth;
        this.collide = false;
        this.once = true;
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
        setTimeout(() => {this.removetime = true}, 1200);
        this.elapsedTime = 0;
        this.updateBoundBox();

    };

    drawAngle(ctx, rotation) {
        if (rotation < 0 || rotation > 359) return;

        if (!this.cache[rotation]) {
            let radians = rotation / 360 * 2 * Math.PI;
            let offScreenCanvas = document.createElement('canvas');

            offScreenCanvas.width = 64;
            offScreenCanvas.height = 64;

            let offScreenCtx = offScreenCanvas.getContext('2d');

            offScreenCtx.save();
            offScreenCtx.translate(32, 32);
            offScreenCtx.rotate(radians);
            offScreenCtx.translate(-32,-32);
            offScreenCtx.drawImage(this.spritesheet, this.spritesheet.width, this.spritesheet.height);
            offScreenCtx.restore();
            this.cache[rotation] = offScreenCanvas;
        }
        var xOffset = 32;
        var yOffset = 32;

        ctx.drawImage(this.cache[rotation], this.x - xOffset - this.game.camera.x, this.y - yOffset - this.game.camera.y);
    }

    update() {
        if(!this.game.pauseb){
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;

            this.updateBoundBox();
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof AbstractEnemy || entity instanceof AbstractEnvironment) {
                        that.collide = true;
                    }
                }
            }); 
            if ((this.collide || this.removetime) && this.once) {
                this.game.addEntityToFront(new Explosion(that.game, that.x - 70, that.y - 100));
                this.once = false;
                this.removeFromWorld = true;
            }
        }  
    };

    updateBoundBox() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 1, this.y - 12, 24, 24);
    };

    draw(ctx){
        //if(!this.game.pauseb){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

        // let angle = Math.atan2(this.velocity.y, this.velocity.x);
        // if (this.rotation < 0) this.rotation += Math.PI * 2;
        // let degrees = Math.floor(this.rotation / Math.PI / 2 *360);

        // this.drawAngle(ctx, degrees);
        ctx.save();
        ctx.translate(this.x - this.game.camera.x, this.y - this.game.camera.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.spritesheet, -this.spritesheet.width / 2, -this.spritesheet.height/2);
        ctx.restore();
        //}
    }
}