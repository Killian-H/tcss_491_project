class masterchief {

    X_DEFAULT = 480;
    Y_DEFAULT = 240;
    SCALE = 2;
    LEFT = 1;
    RIGHT = 0;
    IDLE = 0;
    WALK = 1;
    CROUCH = 2;
    CROUCH_WALK = 3;
    MELEE = 4;
    DEAD = 5;


    ARMS_ASSAULT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_arms_assault_rifle.png");
    IDLE_RIGHT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_idle_right.png");
    IDLE_LEFT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_idle_left.png");    
    WALK_RIGHT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_walk_right.png");
    WALK_LEFT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_walk_left.png");
    IDLE_CROUCH_RIGHT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_crouch_idle_right.png");
    IDLE_CROUCH_LEFT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_crouch_idle_left.png");
    CROUCH_WALK_RIGHT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_crouch_move_right.png");
    CROUCH_WALK_LEFT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_crouch_move_left.png");
    DEAD_RIGHT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_die_right.png");
    DEAD_LEFT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_die_left.png");
    MELEE_RIGHT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_melee_right.png");
    MELEE_LEFT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_melee_left.png");



    constructor(game) {
        this.game = game;
        this.facing = 0; // 0 = right, 1 = left
        this.state = 1; // 0 = idle, 1 = walking, 2 = idle crouch, 3 = crouch walking, 4 = melee, 5 = dead
        this.dead = false; // not dead initially

        this.armRotation = 0;
        this.x = this.X_DEFAULT;
        this.y = this.Y_DEFAULT;
        this.armImg = this.ARMS_ASSAULT;
        this.velocity = { x: 0, y: 0};
        this.elapsedtime = 0;
        this.firerate = .1;
        this.clickcount = 0;
        //this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/master_chief/arms_1.png"), 3, 0, 38, 70, 1, 0.2);
        
        // this.updateBoundBox();

        this.animations = [];
        this.loadAnimations();

        this.leftAnim = this.animations[0][1];
        this.rightAnim = this.animations[0][0];

    };

    loadAnimations() {
        for (var i = 0; i < 6; i++) { // five statesa
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animations[i].push([]);
            }
        }

        // idle animation for standing = 0
        // facing right = 0
        this.animations[0][0] = new Animator(this.IDLE_RIGHT, -4, 0, 30, 43, 1, 1, false, true);

        // idle animation for standing = 0
        // facing left = 1
        this.animations[0][1] = new Animator(this.IDLE_LEFT, 1, 0, 26, 43, 1, 1, false, true);

        // walking animation = 1
        // facing right = 0
        this.animations[1][0] = new Animator(this.WALK_RIGHT, 5, 2, 41, 41, 8, 0.1, false, true);

        // walking animation = 1
        // facing left = 1
        this.animations[1][1] = new Animator(this.WALK_LEFT, 2, 2, 41, 42, 8, 0.1, true, true);

        // idle animation for crouching = 2
        // facing right = 0
        this.animations[2][0] = new Animator(this.IDLE_CROUCH_RIGHT, 1, 0, 37, 31, 1, 1, false, true);

        // idle animation for crouching = 2
        // facing left = 1
        this.animations[2][1] = new Animator(this.IDLE_CROUCH_LEFT, 0, 1, 37, 31, 1, 1, false, true);

        // crouch walking animation = 3
        // facing right = 0
        // Potentially cut last frame
        this.animations[3][0] = new Animator(this.CROUCH_WALK_RIGHT, 0, 0, 36, 31, 4, 0.2, false, true);

        // crouch walking animation = 3
        // facing left = 1
        // Potentially cut last frame
        this.animations[3][1] = new Animator(this.CROUCH_WALK_LEFT, 7, 4, 36, 31, 4, 0.2, true, true);

        // Melee Right = 4
        // facing right = 0
        this.animations[4][0] = new Animator(this.MELEE_RIGHT, 15, 1, 42, 44, 7, 0.1, false, false);

        // Melee Right = 4
        // facing right = 1
        this.animations[4][1] = new Animator(this.MELEE_LEFT, 15, 3, 40, 43, 7, 0.1, false, false);

        // dead right = 5
        // facing right = 0
        this.animations[5][0] = new Animator(this.DEAD_RIGHT, 0, 1, 47, 43, 4, 0.14, false, false);

        // dead right = 5
        // facing right = 1
        this.animations[5][1] = new Animator(this.DEAD_LEFT, 30, 1, 50, 43, 4, 0.14, true, false);
    };

    update() {
        const TICK = this.game.clockTick;
        const walk = 5; //test

        if(this.game.mouse != null) {
            this.armRotation = Math.atan2 (
                this.game.mouse.x - this.x, 
                - (this.game.mouse.y - this.y)
            ) - 1.5708;

            //console.log(this.armRotation);
            if(this.armRotation > -1.5037 && this.armRotation < 1.4825) {
                this.facing = this.RIGHT;
                //console.log("Orientation right");
            } else {
                this.facing = this.LEFT;
                //console.log("Orientation left");
            }
        }

        this.elapsedtime += this.game.clockTick;
        if(this.game.click != null && this.elapsedtime > this.firerate) {
            console.log("click at x: "+this.game.click.x + " y: " +this.game.click.y)
            this.elapsedtime = 0;
            this.clickcount = 1;
            this.game.addEntity(new bullet(this.game, this.x, this.y, this.game.click.x,this.game.click.y));
            //this.game.click = null
        }

        if (this.game.right || this.game.left || this.game.up || this.game.down) {
            this.state = this.WALK;
        } else {
            this.state = this.IDLE;
        }

        if(this.game.right) {
            this.velocity.x = walk;
        }

        // CODE FOR UPDATING CHIEFS COORDINATES GOES HERE

        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // Traveling down.
                    if ((entity instanceof Tree || entity instanceof Rock || entity instanceof Grunt ||
                        entity instanceof Brute || entity instanceof Elite) && that.lastBB.bottom <= entity.BB.top) {
                            if (that.velocity.y > 0) {
                                that.velocity.y === 0;
                            }
                            if (that.velocity.x === 0) {
                                that.state = 0;
                            }
                        }
                        that.updateBoundBox();
                } 
                if (that.velocity.y < 0) { // traveling up.
                    if ((entity instanceof Tree || entity instanceof Rock || entity instanceof Grunt ||
                        entity instanceof Brute || entity instanceof Elite) && that.lastBB.top >= entity.BB.bottom) {
                            if (that.velocity.y < 0) {
                                that.velocity.y === 0;
                            }
                            if (that.velocity.x === 0) {
                                that.state = 0;
                            }
                        }
                        that.updateBoundBox();
                }
                if (that.velocity.x > 0) { // traveling right.
                    if ((entity instanceof Tree || entity instanceof Rock || entity instanceof Grunt ||
                        entity instanceof Brute || entity instanceof Elite) && that.lastBB.right >= entity.BB.left) {
                            if (that.velocity.x > 0) {
                                that.velocity.x === 0;
                            }
                            if (that.velocity.y === 0) {
                                that.state = 0;
                            }
                        }
                        that.updateBoundBox();
                }
                if (that.velocity.x < 0) { // traveling left.
                    if ((entity instanceof Tree || entity instanceof Rock || entity instanceof Grunt ||
                        entity instanceof Brute || entity instanceof Elite) && that.lastBB.left <= entity.BB.right) {
                            if (that.velocity.x < 0) {
                                that.velocity.x === 0;
                            }
                            if (that.velocity.y === 0) {
                                that.state = 0;
                            }
                        }
                        that.updateBoundBox();
                }
            }
        })
    };

    updateBoundBox() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.X_DEFAULT, THIS.Y_DEFAULT, 30, 100);
    }

    draw(ctx) {

        ctx.save();
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.X_DEFAULT -2.5* 7.5, this.Y_DEFAULT -7.5, this.SCALE);
        ctx.restore();
        //- 2.5* 7.5
        //-7.5
        ctx.save();
        ctx.translate(
            this.x,
            this.y
        );
        if (this.facing == 1) {
            ctx.scale(-1,1);
            ctx.translate(
                -27.5,
                0
            );
            ctx.rotate(-this.armRotation + 2 *1.5708);
            ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE);

        } else {
            ctx.rotate(this.armRotation);
            ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE);
        }
        ctx.restore();
    };

};