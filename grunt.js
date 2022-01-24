class Grunt {

    IDLE = 0;
    WALK = 1;
    SCARED = 2;
    FULL_HEALTH = 100;
    RIGHT = 0;
    LEFT = 1;

    IDLE_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_idle.png");
    WALK_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_walk.png");
    SCARED_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_scared.png");
    ARMS = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_arms.png");
    DEAD_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_dead.png");
    HEAD = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_head.png");

    // left
    IDLE_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_idle_left.png");
    WALK_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_walk_left.png");
    SCARED_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_scared_left.png");
    DEAD_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_dead_left.png");

    constructor(game) {
        this.game = game;
        this.health = this.FULL_HEALTH;
        this.state = this.WALK; // 0 = idle, 1 = walk, 2 = scared
        this.facing = this.RIGHT; // 0 = right, 1 = left
        this.dead = false;
        this.deadLeft = new Animator(this.DEAD_LEFT, 7, 0, 47, 35, 5, 0.12, true, false);
        this.deadRight = new Animator(this.DEAD_RIGHT, 8, 0, 45, 35, 5, 0.12, false, false);
        this.velocity = { x: 0, y: 0};
        this.animations = [];
        this.loadAnimations();
        this.updateBoundBox();
    };

    update() {
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof masterchief && that.dead == false) {
                if (that.BB.left > entity.BB.left) {
                    that.facing = 1;
                } else {
                    that.facing = 0;
                }
            }
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof masterchief) {

                }
            };
        });
    };

    updateBoundBox() {
        this.BB = new BoundingBox(240, 240, 35, 48);
    };

    loadAnimations() {
        for (var i = 0; i < 3; i++) { // three states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animations[i].push([]);
            }
        }
        //example
        // this.animations[0][0] = new Animator(this.IDLE_RIGHT, -3, 0, 30, 43, 1, 1, false, true);

        // idle = 0
        // facing right = 0
        this.animations[0][0] = new Animator(this.IDLE_RIGHT, 0, 0, 26, 38, 1, 1, false, true);

        // idle = 0
        // facing left = 1
        this.animations[0][1] = new Animator(this.IDLE_LEFT, 0, 0, 26, 38, 1, 1, false, true);

        // walk = 1
        // facing right = 0
        this.animations[1][0] = new Animator(this.WALK_RIGHT, 5, 1, 30, 41, 6, 0.1, false, true);

        // walk = 1
        // facing left = 1
        this.animations[1][1] = new Animator(this.WALK_LEFT, 20, 1, 30, 41, 6, 0.1, true, true);

        // scared = 2
        // facing right = 0

        // scared = 2
        // facing left = 1
    };

    draw(ctx) {
        if (this.health <= 0) {
            this.dead = true;
            if (this.facing === 0) {
                this.deadRight.drawFrame(this.game.clockTick, ctx, 240, 240, 1.25);
            } else if (this.facing === 1) {
                this.deadLeft.drawFrame(this.game.clockTick, ctx, 240, 240, 1.25);
            }
        } else {
            if (PARAMS.DEBUG == true) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            }
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, 240, 240, 1.25);
        }
    };
}