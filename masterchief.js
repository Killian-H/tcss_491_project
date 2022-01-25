class masterchief {

    X_DEFAULT = 100;
    Y_DEFAULT = 100;
    AMMO_DEFAULT = 32;
    SCALE = 1.6;
    LEFT = 1;
    RIGHT = 0;
    TILT_UP = 0.1;
    FORWARD = 0.2;
    TILT_DOWN = 0.3;
    IDLE = 0;
    WALK = 1;
    CROUCH = 2;
    CROUCH_WALK = 3;
    MELEE = 4;
    DEAD = 5;


    ARMS_ASSAULT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_arms_assault_rifle.png");
    HEAD_FORWARD = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_head_right.png");
    HEAD_TILT_UP = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_head_top_right.png");_
    HEAD_TILT_DOWN = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_head_bottom_right.png");_
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



    constructor(game, x, y) {
        this.game = game;
        this.facing = this.RIGHT; // 0 = right, 1 = left
        this.state = this.IDLE; // 0 = idle, 1 = walking, 2 = idle crouch, 3 = crouch walking, 4 = melee, 5 = dead
        this.dead = false; // not dead initially

        this.armRotation = 0;
        this.headOrientation = this.RIGHT;
        this.x = this.X_DEFAULT;
        this.y = this.Y_DEFAULT;
        this.armImg = this.ARMS_ASSAULT;
        this.velocity = { x: 0, y: 0};
        this.elapsedtime = 0;
        this.elapsedtime2 = 0;
        this.firerate = .1;
        this.clickcount = 0;
        this.ammo = this.AMMO_DEFAULT;

        //this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/master_chief/arms_1.png"), 3, 0, 38, 70, 1, 0.2);
        
        this.updateBoundBox();

        this.animations = [];
        this.loadAnimations();

        this.leftAnim = this.animations[0][1];
        this.rightAnim = this.animations[0][0];

    };

    updateBoundBox() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - 6, this.y - 20, 35, 78);
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
        this.animations[0][0] = new Animator(this.IDLE_RIGHT, -3, 0, 30, 43, 1, 1, false, true);

        // idle animation for standing = 0
        // facing left = 1
        this.animations[0][1] = new Animator(this.IDLE_LEFT, -3, 0, 26, 43, 1, 1, false, true);

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
        //console.log("velocity x: " + this.velocity.x);
        //console.log("velocity y: " + this.velocity.y);
        if(this.game.mouse != null) {
            this.armRotation = Math.atan2 (
                this.game.mouse.x - this.x, 
                - (this.game.mouse.y - this.y)
            ) - Math.PI / 2;

            //console.log(this.armRotation);
            if(this.armRotation > -(Math.PI / 2) && this.armRotation < Math.PI / 2) {
                this.facing = this.RIGHT;
                if (this.armRotation < -(Math.PI / 6)) {
                    this.headOrientation = this.TILT_UP;
                } else if (this.armRotation < (Math.PI / 6)) {
                    this.headOrientation = this.FORWARD;
                } else {
                    this.headOrientation = this.TILT_DOWN;
                }

                //console.log("Orientation right");
            } else {
                this.facing = this.LEFT;
                if (this.armRotation > (-(Math.PI) + (Math.PI/ 6)) && this.armRotation < Math.PI /2) {
                    this.headOrientation = this.TILT_UP;
                } else if (this.armRotation > -(Math.PI) - (Math.PI/ 6) && this.armRotation < Math.PI /2) {
                    this.headOrientation = this.FORWARD;
                } else {
                    this.headOrientation = this.TILT_DOWN;
                }
                //console.log("Orientation left");
            }
        }

        this.elapsedtime += this.game.clockTick;
        // console.log(this.elapsedtime);
        if(this.game.click != null && this.elapsedtime > this.firerate && this.ammo > 0) {
            //console.log("click at x: "+this.game.click.x + " y: " +this.game.click.y)
            this.elapsedtime = 0;
            this.clickcount = 1;
            this.ammo -= 1;
            this.game.addEntity(new bullet(this.game, this.x, this.y, this.game.mouse.x,this.game.mouse.y, this.armRotation));
            //this.game.click = null
        }

        //moving left/right/up/down
        if (this.game.right) { //right
            this.state = this.WALK;
            this.x += 220 * TICK;
            this.velocity.x = 1;
            //console.log("velocity: " + this.velocity.x)
            if (this.x > 1024) {
                this.X_DEFAULT = 0;
                this.x = this.X_DEFAULT;
            }
        }
        else if (this.game.left) { //left
            this.state = this.WALK;
            this.x -= 220 * TICK;
            this.velocity.x = -1;
            //console.log("velocity" + this.velocity.x)
            if (this.x < 0) {
                this.x = 1024;
                //this.velocity.x = 0;
            }
        }
        else if (this.game.up) { //up
            this.state = this.WALK;
            this.y -= 220 * TICK;
            this.velocity.y = -1;
            if (this.y < 0) {
                this.Y_DEFAULT = 540;
                this.y = this.Y_DEFAULT;
            }
        }
        else if (this.game.down) { //down
            this.state = this.WALK;
            this.y += 220 * TICK;
            this.velocity.y = 1;
            if (this.y > 540) {
                this.Y_DEFAULT = 0;
                this.y = this.Y_DEFAULT;
            } 
        }
        else {
            this.state = this.IDLE;
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        if (this.game.reload) {
            setTimeout(() => {this.ammo = this.AMMO_DEFAULT}, 3000);
        }
        //moving diagonal
        //adjust x (50) for more left/right, adjust y for more up/down
        if (this.game.right && this.game.up) { //right/up
            this.state = this.WALK;
            this.x += ((50 * TICK) / 2) * Math.sqrt(2);
            this.y -= ((150 * TICK) / 2) * Math.sqrt(2);
            this.velocity.x = ((50 * TICK) / 2) * Math.sqrt(2);
            this.velocity.y = ((150 * TICK) / 2) * Math.sqrt(2);
        }
        if (this.game.right && this.game.down) { //right/down
            this.state = this.WALK;
            this.x += ((50 * TICK) / 2) * Math.sqrt(2);
            this.y += ((150 * TICK) / 2) * Math.sqrt(2);
            this.velocity.x = ((50 * TICK) / 2) * Math.sqrt(2);
            this.velocity.y = ((150 * TICK) / 2) * Math.sqrt(2);
        }
        if (this.game.left && this.game.up) { //left/up
            this.state = this.WALK;
            this.x -= ((50 * TICK) / 2) * Math.sqrt(2);
            this.y -= ((150 * TICK) / 2) * Math.sqrt(2);
            this.velocity.x = ((50 * TICK) / 2) * Math.sqrt(2);
            this.velocity.y = ((150 * TICK) / 2) * Math.sqrt(2);
        }
        if (this.game.left && this.game.down) { //left/down
            this.state = this.WALK;
            this.x -= ((50 * TICK) / 2) * Math.sqrt(2);
            this.y += ((150 * TICK) / 2) * Math.sqrt(2);
            this.velocity.x = ((50 * TICK) / 2) * Math.sqrt(2);
            this.velocity.y = ((150 * TICK) / 2) * Math.sqrt(2);
        }
        this.updateBoundBox();
        
       
        var that = this;
        this.game.entities.forEach(function (entity) {
            console.log(that.velocity.x);
            console.log(that.velocity.y);
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // Traveling down.
                    if ((entity instanceof Grunt) && (that.lastBB.bottom >= entity.BB.top)) {
                            if (that.velocity.y > 0) {
                                that.y = entity.BB.top - 58;
                                that.velocity.y === 0;
                            }
                        }
                        that.updateBoundBox();
                } 
                 if (that.velocity.y < 0) { // traveling up.
                    if ((entity instanceof Grunt) && that.lastBB.top <= entity.BB.bottom) {
                            if (that.velocity.y < 0) {
                                that.velocity.y === 0;
                                // dsthat.y = entity.BB.bottom + 58;
                            }
                            if (that.velocity.x === 0) {
                                that.state = 0;
                            }
                        }
                        that.updateBoundBox();
                } 
                else if (that.velocity.x > 0) { // traveling right.
                    if ((entity instanceof Grunt) && that.lastBB.right >= entity.BB.left) {
                            if (that.velocity.x > 0) {
                                that.velocity.x === 0;
                                // that.x = entity.BB.left - 50;
                            }
                            if (that.velocity.y === 0) {
                                that.state = 0;
                            }
                        }
                        that.updateBoundBox();
                }
                else if (that.velocity.x < 0) { // traveling left.
                    if ((entity instanceof Grunt) && that.lastBB.left <= entity.BB.right) {
                            if (that.velocity.x < 0) {
                                that.velocity.x === 0;
                                that.x = entity.BB.right + 10;
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

    // calculateWeaponLocationX() {
    //     if (this.facing == this.LEFT) {
    //         return this.x - this.armImg.width/2; 
    //     } else {
    //         return this.x;
    //     }
    // }

    // calculateWeaponLocationY() {
    //     if (this.Orientation == this.LEFT) {
    //         return this.x - this.armImg.width/2; 
    //     } else {
    //         return this.x;
    //     }
    // }

    draw(ctx) {

        //Drawing Body
        ctx.save();
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x -2* 7.5, this.y -12.5, this.SCALE);
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
        ctx.save();
        ctx.restore();
        //this.game.clockTick, ctx, this.X_DEFAULT -2.5* 7.5, this.Y_DEFAULT -7.5, this.SCALE
    
        ctx.translate(
            this.x,
            this.y
        );
        if (this.facing == this.LEFT) {
            ctx.scale(-1,1);
            ctx.save();
            ctx.translate(-34, -33); 
            if (this.headOrientation == this.TILT_UP) {
                ctx.drawImage(this.HEAD_TILT_UP, this.HEAD_TILT_UP.width, this.HEAD_TILT_UP.height, this.HEAD_TILT_UP.width * this.SCALE, this.HEAD_TILT_UP.height * this.SCALE );
            } else if (this.headOrientation == this.FORWARD){
                ctx.drawImage(this.HEAD_FORWARD, this.HEAD_FORWARD.width, this.HEAD_FORWARD.height, this.HEAD_FORWARD.width * this.SCALE, this.HEAD_FORWARD.height * this.SCALE );
            } else {
                ctx.drawImage(this.HEAD_TILT_DOWN, this.HEAD_TILT_DOWN.width, this.HEAD_TILT_DOWN.height, this.HEAD_TILT_DOWN.width * this.SCALE, this.HEAD_TILT_DOWN.height * this.SCALE );

            }
            ctx.restore();
            ctx.translate(
                -20,
                1
            );
            ctx.rotate(-this.armRotation + 2 *1.5708);
            ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE);

        } else {
            ctx.save();
            ctx.translate(-12.5, -32.5); 
            if (this.headOrientation == this.TILT_UP) {
                ctx.drawImage(this.HEAD_TILT_UP, this.HEAD_TILT_UP.width, this.HEAD_TILT_UP.height, this.HEAD_TILT_UP.width * this.SCALE, this.HEAD_TILT_UP.height * this.SCALE );
            } else if (this.headOrientation == this.FORWARD){
                ctx.drawImage(this.HEAD_FORWARD, this.HEAD_FORWARD.width, this.HEAD_FORWARD.height, this.HEAD_FORWARD.width * this.SCALE, this.HEAD_FORWARD.height * this.SCALE );
            } else {
                ctx.drawImage(this.HEAD_TILT_DOWN, this.HEAD_TILT_DOWN.width, this.HEAD_TILT_DOWN.height, this.HEAD_TILT_DOWN.width * this.SCALE, this.HEAD_TILT_DOWN.height * this.SCALE );

            }
            ctx.restore();
            ctx.rotate(this.armRotation);
            ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE);
        }
        ctx.restore();
    };
    

};