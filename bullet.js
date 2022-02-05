class bullet {
    constructor(game, x, y, clickX, clickY, rotation) {
        Object.assign(this, {game, x, y, clickX, clickY, rotation})
        //this.game = game;
        //this.radius = 2;
        //this.smooth = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet.png");
        //this.target = {x: clickX, y: clickY};
        var dist = Math.sqrt(pow((clickX-x),2)+pow((clickY-y),2));
        this.cache = [];
        
        //var dist = math.distance()
        //console.log(dist);
        this.maxSpeed  = 400;
        //this.velocity = {x: clickX, y: clickY};
        this.velocity = {x: (this.clickX - this.x) / dist * this.maxSpeed, y: (this.clickY - this.y) / dist * this.maxSpeed};
        // this.chache = [];

        //thids.animations = [];

        this.elapsedTime = 0;
        this.updateBoundCircle();

    };

    drawAngle(ctx, rotation) {
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
            offScreenCtx.drawImage(this.spritesheet, this.spritesheet.width / 2, this.spritesheet.height / 2);
            offScreenCtx.restore();
            this.cache[rotation] = offScreenCanvas;
        }
        var xOffset = 16;
        var yOffset = 16;

        ctx.drawImage(this.cache[rotation], this.x - xOffset - this.game.camera.x, this.y - yOffset - this.game.camera.y);
    }
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

    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        this.updateBoundCircle();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BC.collisionCircle(entity.BB)) {
                if (entity instanceof Grunt) {
                    let r = ASSET_MANAGER.getRandomInt(101);
                    entity.health = entity.health - 10;
                    entity.beenShot = true;
                    if (r <= 15) {
                        ASSET_MANAGER.playAsset("./audio/gruntscream.mp3");
                    }
                    if (r == 100) {
                        ASSET_MANAGER.playAsset("./audio/gruntpee.mp3");
                    }
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
            ctx.arc(this.BC.x - this.game.camera.x, this.BC.y - this.game.camera.y, this.BC.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

        let angle = Math.atan2(this.velocity.y, this.velocity.x);
        if (angle < 0) angle += Math.PI * 2;
        let degrees = Math.floor(angle / Math.PI / 2 *360);

        this.drawAngle(ctx, degrees);
        // ctx.save();
        // ctx.translate(this.x - this.game.camera.x, this.y - this.game.camera.y);
        // ctx.rotate(this.rotation);
        // ctx.drawImage(this.spritesheet, -this.spritesheet.width / 2, -this.spritesheet.height/2);
        // ctx.restore();
    }
}