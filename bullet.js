class bullet {
    constructor(game, x, y, clickX, clickY, rotation) {
        Object.assign(this, {game, x, y, clickX, clickY, rotation})
        //this.game = game;
        //this.radius = 2;
        //this.smooth = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet.png");
        //this.target = {x: clickX, y: clickY};
        var dist = Math.sqrt(pow((clickX-x),2)+pow((clickY-y),2));
        
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
            ctx.arc(this.BC.x, this.BC.y, this.BC.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.spritesheet, -this.spritesheet.width / 2, -this.spritesheet.height/2);
        ctx.restore();
    }
}