class masterchief {

    X_DEFAULT = 0;
    Y_DEFAULT = 0;
    AMMO_DEFAULT = 32;
    MAX_HEALTH = 100;
    MAX_ARMOR = 200;
    SCALE = 1.6;
    LEFT = 1;
    RIGHT = 0;
    TILT_UP = 0.1;
    FORWARD = 0.2;
    TILT_DOWN = 0.3;
    IDLE = 0;
    SET_VELOCITY = {x: 300, y: 300};
    WALK = 1;
    CROUCH = 2;
    CROUCH_WALK = 3;
    MELEE = 4;
    DEAD = 5;


    SHIELD = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_shield_damage.png");
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
        Object.assign(this, {game, x, y});
        this.game.player = this;
        this.facing = this.RIGHT; // 0 = right, 1 = left
        this.state = this.IDLE; // 0 = idle, 1 = walking, 2 = idle crouch, 3 = crouch walking, 4 = melee, 5 = dead
        this.dead = false; // not dead initially
        this.radius = 10;
        this.armRotation = 0;
        this.headOrientation = this.RIGHT;
        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.x - this.game.camera.y;
        this.velocity = { x: 0, y: 0};
        this.beenShot = false;
        this.canRegen = true;
        this.regAudio = true;
        this.health = this.MAX_HEALTH;
        this.armor = this.MAX_ARMOR;
        this.armImg = this.ARMS_ASSAULT;
        this.velocity = { x: 0, y: 0};
        this.elapsedtime = 0;
        this.regenCount = null;
        this.canshoot = true;
        this.reloadTime = 0;
        this.reloading = false;
        this.shieldEffect = [];
        this.shieldEffect[0] = new Animator(this.SHIELD, 4, 3, 17, 23, 1, 1, false, false);
        this.shieldEffect[1] = new Animator(this.SHIELD, 28, 5, 28, 17, 1, 1, false, false);
        this.shieldEffect[2] = new Animator(this.SHIELD, 63, 6, 19, 15, 1, 1, false, false);
        this.shieldEffect[3] = new Animator(this.SHIELD, 88, 3, 17, 22, 1, 1, false, false);
        this.shieldEffect[4] = new Animator(this.SHIELD, 111, 0, 17, 28, 1, 1, false, false);
        this.shieldEffect[5] = new Animator(this.SHIELD, 134, 5, 15, 19, 1, 1, false, false);
        this.randomEffect = 0;
        this.shieldBroken = false;
        this.weaponArray = [];
        this.weaponArray[0] = new AssaultRifle(this.game, this.x, this.y);
        this.weaponArray[1] = new Pistol(this.game, this.x, this.y);
        this.weaponArray[2] = new DMR(this.game, this.x, this.y);
        this.weaponArray[3] = new Shotgun(this.game, this.x, this.y);
        this.weaponArray[4] = new PlasmaRifle(this.game, this.x, this.y);
        this.weapon = this.weaponArray[0];
        this.game.chiefDone = false;

        //this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/master_chief/arms_1.png"), 3, 0, 38, 70, 1, 0.2);
        
        this.updateBoundBox();

        this.animations = [];
        this.loadAnimations();

        this.leftAnim = this.animations[0][1];
        this.rightAnim = this.animations[0][0];

    };

    checkShield(){
        if(this.canRegen){
            if(this.armor < (this.MAX_ARMOR-1)){
                this.armor += 2;
            }
            else if(this.armor > (this.MAX_ARMOR-2) && this.armor < this.MAX_ARMOR){
                this.armor = this.MAX_ARMOR;
            }
            this.canRegen = false;
            this.regenTimer(50);
        }
    }

    regenTimer(waitTime){
        clearTimeout(this.regenCount);
        if(waitTime == 6000){
            this.regenCount = setTimeout(() => {this.playRegen()}, waitTime);
        }
        else{
            this.regenCount = setTimeout(() => {this.canRegen = true}, waitTime);
        }
    }

    playRegen(){
        if(!this.dead&&!this.game.pauseb&&!this.game.chiefDone){
            this.canRegen = true
            ASSET_MANAGER.playAsset("./audio/recharge.mp3");
        }
    }

    resetHealth() {
        this.health = this.MAX_HEALTH;
    }

    resetAmmo() {
        this.ammo = this.AMMO_DEFAULT;
    }

    resetShield() {
        this.armor = this.MAX_ARMOR;
    }

    resetState() {
        this.state = this.IDLE;
    }

    updateBoundBox() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - 6, this.y - 20, 35, 78);
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
        this.animations[0][0] = new Animator(this.IDLE_RIGHT, -3, 0, 30, 43, 1, 1, false, true);

        // idle animation for standing = 0
        // facing left = 1
        this.animations[0][1] = new Animator(this.IDLE_LEFT, -3, 0, 26, 43, 1, 1, false, true);

        // walking animation = 1
        // facing right = 0
        this.animations[1][0] = new Animator(this.WALK_RIGHT, 7, 2, 41, 41, 8, 0.1, false, true);

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
        this.animations[5][0] = new Animator(this.DEAD_RIGHT, 0, 1, 58, 50, 4, 0.14, false, false);

        // dead right = 5
        // facing right = 1
        this.animations[5][1] = new Animator(this.DEAD_LEFT, 25, 0, 58, 50, 4, 0.14, true, false);
    };

    update() {
        this.randomEffect = getRandomInteger(0, 5);
        if(this.game.win == true){
            this.gameDone = true;
        }
        if(this.game.escapePress){
            this.game.pauseb = true;
        }
        else if(!this.game.escapePress){
            this.game.pauseb = false;
            //this.regenCount = setTimeout(() => {this.canRegen = true}, 3000);
        }
        if(!this.game.pauseb){
        //console.log(this.game.escapePress);
        const TICK = this.game.clockTick;
        this.checkShield();
        this.weapon.update();
        if (this.game.weaponOne) {
            ASSET_MANAGER.playAsset("./audio/weapons/ar switch.mp3");
            this.weapon = this.weaponArray[0];
        } else if (this.game.weaponTwo) {
            ASSET_MANAGER.playAsset("./audio/weapons/pistol switch.mp3");
            this.weapon = this.weaponArray[1];
        } else if (this.game.weaponThree && this.weaponArray[2].unlocked) {
            ASSET_MANAGER.playAsset("./audio/weapons/ar switch.mp3");
            this.weapon = this.weaponArray[2];
        } else if (this.game.weaponFour && this.weaponArray[3].unlocked) {
            ASSET_MANAGER.playAsset("./audio/weapons/shotgun switch.mp3");
            this.weapon = this.weaponArray[3];
        } else if (this.game.weaponFive && this.weaponArray[4].unlocked) {
            ASSET_MANAGER.playAsset("./audio/weapons/pr switch.mp3");
            this.weapon = this.weaponArray[4];
        }
        if (this.health <= 0) {
            ASSET_MANAGER.playAsset("./audio/mcdeath.mp3");
            this.dead = true;
            this.state = this.DEAD;
            this.game.camera.loadDeathMenu();
        }
        if(this.game.mouse != null) {
            if(this.weapon.getArmRotation() > -(Math.PI / 2) && this.weapon.getArmRotation() < Math.PI / 2) {
                this.facing = this.RIGHT;
                if (this.weapon.getArmRotation() < -(Math.PI / 6)) {
                    this.headOrientation = this.TILT_UP;
                } else if (this.weapon.getArmRotation() < (Math.PI / 6)) {
                    this.headOrientation = this.FORWARD;
                } else {
                    this.headOrientation = this.TILT_DOWN;
                }
            } else {
                this.facing = this.LEFT;
                if (this.weapon.getArmRotation() > (-(Math.PI) + (Math.PI/ 6)) && this.weapon.getArmRotation() < Math.PI /2) {
                    this.headOrientation = this.TILT_UP;
                } else if (this.weapon.getArmRotation() > -(Math.PI) - (Math.PI/ 6) && this.weapon.getArmRotation() < Math.PI /2) {
                    this.headOrientation = this.FORWARD;
                } else {
                    this.headOrientation = this.TILT_DOWN;
                }
            }
        }

        this.elapsedtime += this.game.clockTick;
        var isMoving = false;

        if (this.game.up) {
            this.velocity.y = -1 * (this.SET_VELOCITY.y * this.game.clockTick);
            isMoving = true;
        } else if (this.game.down) {
            this.velocity.y = this.SET_VELOCITY.y * this.game.clockTick;
            isMoving = true;
        } else {
            this.velocity.y = 0;
        }
        if (this.game.left) {
            this.velocity.x = -1 * (this.SET_VELOCITY.x * this.game.clockTick);
            isMoving = true;
        } else if (this.game.right) {
            this.velocity.x = this.SET_VELOCITY.x * this.game.clockTick;
            isMoving = true;
        } else {
            this.velocity.x = 0;
        }

        if ((this.game.left || this.game.right) && (this.game.up || this.game.down)) {
            this.velocity.x = (this.velocity.x / 2) * Math.sqrt(2);
            this.velocity.y = (this.velocity.y / 2) * Math.sqrt(2);
            isMoving = true;
        }

        if (isMoving) {
            this.state = this.WALK;
            ASSET_MANAGER.playAsset("./audio/stopping.mp3");
        } else {
            ASSET_MANAGER.playAsset("./audio/walking.mp3");
            ASSET_MANAGER.autoRepeat("./audio/walking.mp3");
            this.state = this.IDLE;
        }

        var collisionx = 1;
        var collisiony = 1;
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0 || (that.velocity.y < 0 && that.BB.bottom < entity.BB.bottom)) { // Traveling down.
                    if ((entity instanceof AbstractEnemy || entity instanceof AbstractEnvironment) && (that.BB.bottom > entity.BB.top)) {
                        if ((that.game.down && that.BB.top < entity.BB.top)) {
                            collisiony = 0;
                        }
                    }
                }
                if (that.velocity.y < 0 && that.BB.bottom > entity.BB.bottom) { // traveling up.
                    if ((entity instanceof AbstractEnemy || entity instanceof AbstractEnvironment) && that.BB.top <= entity.BB.bottom) {
                        that.y += 1;
                        if (that.game.up && that.BB.bottom > entity.BB.bottom) {
                            collisiony = 0;
                        }
                    }
                } 
                if (that.velocity.x > 0 || (that.velocity.x < 0 && that.BB.right < entity.BB.right)) { // traveling right.
                    if ((entity instanceof AbstractEnemy || entity instanceof AbstractEnvironment) && that.BB.right >= entity.BB.left) {
                            if (that.game.right && that.BB.left < entity.BB.left) {
                               collisionx = 0;
                            }
                    }
                }
                if (that.velocity.x < 0 && that.BB.right > entity.BB.right) { // traveling left.
                    if (that.BB.top >= entity.BB.top) {
                        that.x += 1;
                    }
                    if ((entity instanceof AbstractEnemy || entity instanceof AbstractEnvironment) && that.BB.left <= entity.BB.right) {
                        collisionx = 0;
                    }
                }
            }
        });
        this.updateBoundBox();
        this.x += this.velocity.x * collisionx;
        this.y += this.velocity.y * collisiony;

        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.y - this.game.camera.y;
        this.updateBoundBox();
        }
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
    // 

    draw(ctx) {
        //if(!this.game.pauseb){
        //Drawing Body
        ctx.save();
        if (!this.dead) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 2 * 7.5, this.y - this.game.camera.y - 12.5, this.SCALE);//this.x -2* 7.5, this.y -12.5
            if(!this.game.pauseb){
            if (PARAMS.DEBUG == true) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.x - 6 - this.game.camera.x, this.y - 20 - this.game.camera.y, this.BB.width, this.BB.height);
                ctx.fillText(("X: "+ (this.velocity.x).toFixed(2)), this.x - 20 - this.game.camera.x, this.y - 80 - this.game.camera.y);
                ctx.fillText(("Y: "+ (this.velocity.y).toFixed(2)), this.x - 20 - this.game.camera.x, this.y - 60 - this.game.camera.y);
                ctx.fillText(("Chief X: "+ (this.x).toFixed(2)), this.x - 50 - this.game.camera.x, this.y - 40 - this.game.camera.y);
                ctx.fillText(("Chief Y: "+ (this.y).toFixed(2)),this.x - 5 - this.game.camera.x, this.y - 20 - this.game.camera.y);
            }
            }
            ctx.save();
            ctx.restore();
    
            ctx.translate(
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
            if (this.facing == this.LEFT) {
                ctx.scale(-1,1);
                ctx.save();
                ctx.translate(-34, -31.5); 
                if (this.headOrientation == this.TILT_UP) {
                    ctx.drawImage(this.HEAD_TILT_UP, this.HEAD_TILT_UP.width, this.HEAD_TILT_UP.height, this.HEAD_TILT_UP.width * this.SCALE, this.HEAD_TILT_UP.height * this.SCALE);
                } else if (this.headOrientation == this.FORWARD){
                    ctx.drawImage(this.HEAD_FORWARD, this.HEAD_FORWARD.width, this.HEAD_FORWARD.height, this.HEAD_FORWARD.width * this.SCALE, this.HEAD_FORWARD.height * this.SCALE);
                } else {
                    ctx.drawImage(this.HEAD_TILT_DOWN, this.HEAD_TILT_DOWN.width, this.HEAD_TILT_DOWN.height, this.HEAD_TILT_DOWN.width * this.SCALE, this.HEAD_TILT_DOWN.height * this.SCALE)//, this.x - this.game.camera.x, this.y - this.game.camera.y, 50,50);

                }
                ctx.restore();
                ctx.translate(
                    -20,
                    1
                );
                ctx.rotate(-this.weapon.getArmRotation() + 2 *1.5708);
                ctx.drawImage(this.weapon.draw, -this.weapon.draw.width / 2, -this.weapon.draw.height/2, this.weapon.draw.width * this.SCALE, this.weapon.draw.height * this.SCALE)//, this.x-  this.game.camera.x, this.y - this.game.camera.y, 50, 50);

            } else {
                ctx.save();
                ctx.translate(-13.5, -31); 
                if (this.headOrientation == this.TILT_UP) {
                    ctx.drawImage(this.HEAD_TILT_UP, this.HEAD_TILT_UP.width, this.HEAD_TILT_UP.height, this.HEAD_TILT_UP.width * this.SCALE, this.HEAD_TILT_UP.height * this.SCALE);
            } else if (this.headOrientation == this.FORWARD){
                ctx.drawImage(this.HEAD_FORWARD, this.HEAD_FORWARD.width, this.HEAD_FORWARD.height, this.HEAD_FORWARD.width * this.SCALE, this.HEAD_FORWARD.height * this.SCALE)
            } else {
                ctx.drawImage(this.HEAD_TILT_DOWN, this.HEAD_TILT_DOWN.width, this.HEAD_TILT_DOWN.height, this.HEAD_TILT_DOWN.width * this.SCALE, this.HEAD_TILT_DOWN.height * this.SCALE)

                }
                ctx.restore();
                ctx.rotate(this.weapon.getArmRotation());
                ctx.drawImage(this.weapon.draw, -this.weapon.draw.width / 2, -this.weapon.draw.height/2, this.weapon.draw.width * this.SCALE, this.weapon.draw.height * this.SCALE);
            }
            ctx.restore();
            if (this.armor > 0 && this.beenShot == true) {
                this.shieldEffect[this.randomEffect].drawFrame(this.game.clockTick, ctx, this.x - 5 - this.game.camera.x, this.y - this.game.camera.y, 2);
                this.beenShot = false;
            }
            if (this.armor <= 0 && this.shieldBroken == false) {
                this.shieldEffect[0].drawFrame(this.game.clockTick, ctx, this.x - 5 - this.game.camera.x, this.y - this.game.camera.y, 2);
                this.shieldEffect[1].drawFrame(this.game.clockTick, ctx, this.x - 5 - this.game.camera.x, this.y + 1 - this.game.camera.y, 2);
                this.shieldEffect[2].drawFrame(this.game.clockTick, ctx, this.x - 5 - this.game.camera.x, this.y + 2 - this.game.camera.y, 2);
                this.shieldEffect[3].drawFrame(this.game.clockTick, ctx, this.x - 5 - this.game.camera.x, this.y + 3 - this.game.camera.y, 2);
                this.shieldEffect[4].drawFrame(this.game.clockTick, ctx, this.x - 5 - this.game.camera.x, this.y + 4 - this.game.camera.y, 2);
                this.shieldEffect[5].drawFrame(this.game.clockTick, ctx, this.x - 5 - this.game.camera.x, this.y + 5 - this.game.camera.y, 2);
                this.shieldBroken = true;
            }
        } else {
                this.animations[this.DEAD][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x -2 * 7.5, this.y - this.game.camera.y -12.5, this.SCALE);
                setTimeout(() => {this.removeFromWorld = true}, 700);
            }
        //}
    };
    

};