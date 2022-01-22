class Grunt {

    IDLE = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_idle.png");
    WALK = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_walk.png");
    SCARED = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_scared.png");
    ARMS = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_arms.png");
    DEAD = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_dead.png");
    HEAD = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_head.png");

    constructor(game) {
        this.game = game;
        this.dead = false;
        this.velocity = { x: 0, y: 0};
        this.animations = [];
        this.test = new Animator(this.IDLE, 0, 0, 26, 38, 1, 1, false, true);
        this.testWalk = new Animator(this.WALK, 5, 1, 30, 41, 6, 0.1, false, true);
        this.animations[0] = new Animator(this.IDLE, 0, 0, 26, 38, 1, false, true);
        this.updateBoundBox();
    };

    update() {
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof masterchief) {

                }
            };
        });
    };

    updateBoundBox() {
        this.BB = new BoundingBox(240, 200, 35, 48);
    };

    draw(ctx) {
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
        this.test.drawFrame(this.game.clockTick, ctx, 240, 200, 1.25);
        this.testWalk.drawFrame(this.game.clockTick, ctx, 240, 240, 1.25);
    };
}