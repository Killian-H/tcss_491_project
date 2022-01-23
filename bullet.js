class bullet {
    constructor(game,x,y,clickX,clickY, rotation){
        Object.assign(this, {game, x, y, clickX, clickY, rotation})
        //this.game = game;
        //this.radius = 2;
        //this.smooth = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet.png");
        //this.target = {x: clickX, y: clickY};
        var dist = Math.sqrt(pow((clickX-x),2)+pow((clickY-y),2));
        //var dist = math.distance()
        console.log(dist);
        this.maxSpeed  = 400;
        //this.velocity = {x: clickX, y: clickY};
        this.velocity = {x: (this.clickX - this.x) / dist * this.maxSpeed, y: (this.clickY - this.y) / dist * this.maxSpeed};
        this.chache = [];

        //thids.animations = [];

        this.elapsedTime = 0;
        this.updateBoundBox();

    };

    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        this.updateBoundBox();
    }

    updateBoundBox() {
        this.BB = new BoundingBox(this.x, this.y, 10, 4);
    };

    draw(ctx){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.spritesheet, -this.spritesheet.width / 2, -this.spritesheet.height/2);
        ctx.restore();
    }
}