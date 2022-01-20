class bullet {
    constructor(game,x,y,clickX,clickY){
        Object.assign(this, {game, x, y, clickX, clickY})
        //this.game = game;
        //this.radius = 2;
        //this.smooth = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet.png");
        //this.target = {x: clickX, y: clickY};
        var dist = Math.sqrt(pow((clickX-x),2)+pow((clickY-y),2));
        //var dist = math.distance()
        console.log(dist);
        this.maxSpeed  = 200;
        //this.velocity = {x: clickX, y: clickY};
        this.velocity = {x: (this.clickX - this.x) / dist * this.maxSpeed, y: (this.clickY - this.y) / dist * this.maxSpeed};
        this.chache = [];

        //thids.animations = [];

        this.elapsedTime = 0;

    };

    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
    }

    draw(ctx){
        ctx.drawImage(this.spritesheet, this.x, this.y);
    }
}