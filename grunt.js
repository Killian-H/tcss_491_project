class Grunt {

    X_DEFAULT = 200;
    Y_DEFAULT = 200;

    SCALE = 1.2;

    IDLE = 0;
    WALK = 1;
    SCARED = 2;
    FULL_HEALTH = 100;
    RIGHT = 0;
    LEFT = 1;

    IDLE_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_idle.png");
    WALK_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_walk.png");
    SCARED_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_scared.png");
    ARM_PLASMA_PISTOL = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_arm_plasma_pistol.png");
    ARMS = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_arms.png");
    DEAD_RIGHT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_dead.png");
    HEAD = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_head.png");

    // left
    IDLE_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_idle_left.png");
    WALK_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_walk_left.png");
    SCARED_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_scared_left.png");
    DEAD_LEFT = ASSET_MANAGER.getAsset("./sprites/grunt/grunt_dead_left.png");

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.x = x;
        this.y = y;
        this.visualRadius = 300;
        this.armImg = this.ARM_PLASMA_PISTOL;
        this.armRotation = 0;

        this.aimingX = 0;
        this.aimingY = 0;
        this.game = game;
        this.health = this.FULL_HEALTH;
        this.state = this.IDLE; // 0 = idle, 1 = walk, 2 = scared
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
                if (canSee(that, entity)) {
                    that.aimingX = entity.x;
                    that.aimingY = entity.y;
                    console.log("In Aiming. -- Left: " + entity.x + " -- Right: " + entity.y);
                    that.armRotation =  Math.atan2 (
                        that.aimingX - that.x, 
                        - (that.aimingY - that.y)
                    ) - Math.PI / 2;
                    console.log("Arm Rotation: " + that.armRotation);
                }
            }

            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof masterchief) {

                }
            };
        });
    };

    updateBoundBox() {
        this.BB = new BoundingBox(this.x, this.y, 35, 48);
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
            if (this.facing === this.RIGHT) {
                this.deadRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.25);
            } else if (this.facing === this.LEFT) {
                this.deadLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.25);
            }
            setTimeout(() => {this.removeFromWorld = true}, 800);
        } else {
            if (PARAMS.DEBUG == true) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

                ctx.setLineDash([5, 15]);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.visualRadius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
                ctx.setLineDash([]);
            }
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.25);
            ctx.save();
            ctx.translate(
                this.x,
                this.y
            );
            if (this.facing === this.LEFT) {
                ctx.scale(-1,1);
                ctx.translate(
                    -20,
                    27.5
                );
                ctx.rotate(-this.armRotation + Math.PI);
                ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE);
            } else {
                ctx.translate(
                    15,
                    27.5
                );
                ctx.rotate(this.armRotation);
                ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE);
            }
            ctx.restore();
        }
    };
}