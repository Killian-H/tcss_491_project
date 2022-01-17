class masterchief {

    X_DEFAULT = 250;
    Y_DEFAULT = 250;
    SCALE = 2;
    ARMS_DEFAULT = ASSET_MANAGER.getAsset("./sprites/master_chief/arms_1.png");
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
        this.state = 0; // 0 = idle, 1 = walking, 2 = idle crouch, 3 = crouch walking, 4 = melee, 5 = dead
        this.dead = false; // not dead initially

        this.armRotation = 0;
        this.orientation = "right";
        this.x = this.X_DEFAULT;
        this.y = this.Y_DEFAULT;
        this.armImg = this.ARMS_DEFAULT;
        //this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/master_chief/arms_1.png"), 3, 0, 38, 70, 1, 0.2);
        
        this.animations = [];
        this.loadAnimations();
        this.leftAnim = this.animations[0][1];
        this.rightAnim = this.animations[0][0];

    };

    loadAnimations() {
        for (var i = 0; i < 6; i++) { // five states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animations[i].push([]);
            }
        }

        // idle animation for standing = 0
        // facing right = 0
        this.animations[0][0] = new Animator(this.IDLE_RIGHT, 0, 0, 26, 43, 1, 1, false, true);

        // idle animation for standing = 0
        // facing left = 1
        this.animations[0][1] = new Animator(this.IDLE_LEFT, 1, 0, 26, 43, 1, 1, false, true);

        // walking animation = 1
        // facing right = 0
        this.animations[1][0] = new Animator(this.WALK_RIGHT, 0, 2, 41, 41, 8, 0.1, false, true);

        // walking animation = 1
        // facing left = 1
        this.animations[1][1] = new Animator(this.WALK_LEFT, 0, 2, 42, 42, 8, 0.1, true, true);

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

        if(this.game.mouse != null) {
            this.armRotation = Math.atan2 (
                this.game.mouse.x - this.x, 
                - (this.game.mouse.y - this.y)
            ) - 1.5708;

            //console.log(this.armRotation);
            if(this.armRotation > -1.5037 && this.armRotation < 1.4825) {
                this.orientation = "right";
                //console.log("Orientation right");
            } else {
                this.orientation = "left";
                //console.log("Orientation left");
            }
        }
    };

    draw(ctx) {

        ctx.save();
        if(this.orientation == "left") {
            this.leftAnim.drawFrame(this.game.clockTick, ctx, this.x- 2.5* 7.5, this.y - 7.5, this.SCALE);
        } else {
            this.rightAnim.drawFrame(this.game.clockTick, ctx, this.x - 7.5, this.y - 7.5, this.SCALE);
        }
        ctx.restore();

        ctx.save();
        ctx.translate(
            this.x,
            this.y
        );
        if (this.orientation == "left") {
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