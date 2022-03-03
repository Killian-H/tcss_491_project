class Hunter extends AbstractEnemy {

    SCALE = 1.2;
    SET_VELOCITY = {x: 85, y: 85};
    IDLE = 0;
    WALK = 1;
    FULL_HEALTH = 1150;
    RIGHT = 0;
    LEFT = 1;

    IDLE_RIGHT = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_idle_right.png");
    WALK_RIGHT = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_walk_right.png");
    ARM_CANNON = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_gun.png");
    DEAD_RIGHT = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_dead_right.png");

    // left
    IDLE_LEFT = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_idle_left.png");
    WALK_LEFT = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_walk_left.png");
    DEAD_LEFT = ASSET_MANAGER.getAsset("./sprites/hunter/hunter_dead_left.png");


    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.visualRadius = 425;
        this.radius = 10;
        this.armImg = this.ARM_CANNON;
        this.armRotation = 0;
        this.weapon = "pc";
        this.seen = false;
        this.collideX = false;
        this.collideY = false;
        this.aimingX = 0;
        this.aimingY = 0;
        this.health = this.FULL_HEALTH;
        this.state = this.IDLE; // 0 = idle, 1 = walk, 2 = scared
        this.facing = this.RIGHT; // 0 = right, 1 = left
        this.dead = false;
        this.beenShot = false;
        this.deadLeft = new Animator(this.DEAD_LEFT, 30, 0, 100, 80, 4, 0.12, true, false);
        this.deadRight = new Animator(this.DEAD_RIGHT, 18, 0, 100, 80, 4, .12, false, false);
        this.velocity = { x: 0, y: 0};
        this.animations = [];
        this.elapsedTime = 0;
        this.shieldDamage = 35;
        this.healthDamage = 25;
        this.bulletSpeed = 420;
        this.hasNotBeenRemoved = true;
        this.game.enemiesInLevel += 1;
        this.loadAnimations();
        this.updateBoundBox();
    };

    update() {
        if(!this.game.pauseb){
        this.state = this.IDLE;
        this.updateBoundBox();
        this.elapsedTime += this.game.clockTick;
        this.randomFireRate = Math.random() * (3 - .3) + .3;
        //console.log(this.randomFireRate);a
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Elite) {
                if (canSee(that, entity) && entity.alarmGrunts == true) {
                    that.seen = true;
                }
            }
            else if (entity instanceof Grunt) {
                if (canSee(that, entity) && entity.beenShot == true) {
                    that.seen = true;
                }
            }
            else if (entity instanceof masterchief && that.dead == false) {
                if (canSee(that, entity) || that.seen || that.beenShot) {
                    let r = ASSET_MANAGER.getRandomInt(22001);
                    if (r < 10) {
                        ASSET_MANAGER.playAsset("./audio/hunter/hunterlaugh.mp3");
                    }
                    if (r >= 10 && r < 20) {
                        ASSET_MANAGER.playAsset("./audio/hunter/hunterlaugh2.mp3");
                    }
                    that.seen = true;
                    if (that.BB.left > entity.BB.left) {
                    that.facing = 1;
                    } else {
                        that.facing = 0;
                    }
                    that.aimingX = entity.x;
                    that.aimingY = entity.y;
                    that.collide();
                    let isMoving = that.chooseDirection(entity, 50, 200);
                    if(isMoving) {
                        that.state = that.WALK;
                    }
                    //console.log("In Aiming. -- Left: " + entity.x + " -- Right: " + entity.y);
                    that.armRotation =  Math.atan2 (
                        that.aimingX - that.x, 
                        - (that.aimingY - that.y)
                    ) - Math.PI / 2;
                    if (that.elapsedTime >= that.randomFireRate) {
                        that.elapsedTime = 0;
                        that.game.addEntityToFront(new HunterBullet(that.game, that.x, that.y, entity, that.armRotation, that.shieldDamage, that.healthDamage, that.bulletSpeed));
                        ASSET_MANAGER.playAsset("./audio/weapons/hunter shot.mp3");
                    }
                }
            }
        });
        }
    };

    updateBoundBox() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + 2, 65, 100);
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
        this.animations[0][0] = new Animator(this.IDLE_RIGHT, 0, 0, 58, 82, 1, 1, false, true);

        // idle = 0
        // facing left = 1
        this.animations[0][1] = new Animator(this.IDLE_LEFT, 0, 0, 58, 82, 1, 1, false, true);

        // walk = 1
        // facing right = 0
        this.animations[1][0] = new Animator(this.WALK_RIGHT, 8, 2, 80, 83, 8, 0.15, false, true);

        // walk = 1
        // facing left = 1
        this.animations[1][1] = new Animator(this.WALK_LEFT, 18, 2, 80, 83, 8, .1, true, true);

        // scared = 2
        // facing right = 0

        // scared = 2
        // facing left = 1
    };

    removeCounter(){
        if(this.removeFromWorld == true && this.hasNotBeenRemoved == true){
            this.game.enemiesInLevel -= 1
            this.hasNotBeenRemoved = false;
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Red";
        ctx.fillRect(mmX + this.x / 15, mmY + this.y / 15, PARAMS.SCALE * 5 , PARAMS.SCALE * 5);
    }

    draw(ctx) {
        //if(!this.game.pauseb){
        if (this.health <= 0) {
            this.dead = true;
            if (this.facing === this.RIGHT) {
                this.deadRight.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
            } else if (this.facing === this.LEFT) {
                this.deadLeft.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
            }
            setTimeout(() => {this.removeFromWorld = true,this.removeCounter()}, 800);
        } else {
            if (PARAMS.DEBUG == true) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

                ctx.setLineDash([5, 15]);
                ctx.beginPath();
                ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
                ctx.setLineDash([]);
            }
            if(this.seen == true){
                var ratio = this.health / this.FULL_HEALTH;
                ctx.fillStyle = "Red";
                ctx.fillRect(this.x - this.game.camera.x, this.y- this.game.camera.y -8, 80*ratio, 7);
            }
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.25);
            ctx.save();
            ctx.translate(
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
            if (this.facing === this.LEFT && this.state != this.IDLE) {
                ctx.scale(-1,1);
                ctx.translate(
                    -45,
                    38.5
                );
                ctx.rotate(-this.armRotation + Math.PI);
                ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE)
            } else if (this.facing === this.RIGHT && this.state != this.IDLE) {
                ctx.translate(
                    28,
                    38.5
                );
                ctx.rotate(this.armRotation);
                ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE)
            }
            ctx.restore();
        }
        //}
    };
}