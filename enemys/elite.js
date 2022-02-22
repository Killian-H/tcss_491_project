class Elite extends AbstractEnemy {

    SCALE = 1.65;
    SET_VELOCITY = {x: 175, y: 175};
    IDLE = 0;
    WALK = 1;
    FULL_HEALTH = 225;
    MAX_ARMOR = 200;
    RIGHT = 0;
    LEFT = 1;

    // Shield
    SHIELD = ASSET_MANAGER.getAsset("./sprites/elite/elite_shield_damage.png");
    // Right
    IDLE_RIGHT = ASSET_MANAGER.getAsset("./sprites/elite/elite_idle_right.png");
    WALK_RIGHT = ASSET_MANAGER.getAsset("./sprites/elite/elite_walk_right.png");
    DEAD_RIGHT = ASSET_MANAGER.getAsset("./sprites/elite/elite_die_right.png");
    ARM_PLASMA_RIFLE = ASSET_MANAGER.getAsset("./sprites/elite/elite_arm_plasma_rifle.png");

    // left
    IDLE_LEFT = ASSET_MANAGER.getAsset("./sprites/elite/elite_idle_left.png");
    WALK_LEFT = ASSET_MANAGER.getAsset("./sprites/elite/elite_walk_left.png");
    DEAD_LEFT = ASSET_MANAGER.getAsset("./sprites/elite/elite_die_left.png");

    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.visualRadius = 400;
        this.armImg = this.ARM_PLASMA_RIFLE;
        this.armRotation = 0;
        this.armor = this.MAX_ARMOR;
        this.radius = 10;
        this.weapon = "pr";
        this.seen = false;
        this.aimingX = 0;
        this.aimingY = 0;
        this.alarmGrunts = false;
        this.health = this.FULL_HEALTH;
        this.state = this.IDLE; // 0 = idle, 1 = walk
        this.facing = this.RIGHT; // 0 = right, 1 = left
        this.dead = false;
        this.beenShot = false;
        this.deadLeft = new Animator(this.DEAD_LEFT, 30, 2, 60, 51, 4, 0.12, true, false);
        this.deadRight = new Animator(this.DEAD_RIGHT, 20, 2, 60, 51, 4, 0.12, false, false);
        this.velocity = { x: 0, y: 0};
        this.animations = [];
        this.elapsedTime = 0;
        this.shieldDamage = 20;
        this.healthDamage = 15;
        this.bulletSpeed = 415;
        this.hasNotBeenRemoved = true;
        this.shieldEffect = [];
        this.shieldEffect[0] = new Animator(this.SHIELD, 4, 3, 17, 23, 1, 1, false, false);
        this.shieldEffect[1] = new Animator(this.SHIELD, 28, 5, 28, 17, 1, 1, false, false);
        this.shieldEffect[2] = new Animator(this.SHIELD, 63, 6, 19, 15, 1, 1, false, false);
        this.shieldEffect[3] = new Animator(this.SHIELD, 88, 3, 17, 22, 1, 1, false, false);
        this.shieldEffect[4] = new Animator(this.SHIELD, 111, 0, 17, 28, 1, 1, false, false);
        this.shieldEffect[5] = new Animator(this.SHIELD, 134, 5, 15, 19, 1, 1, false, false);
        this.randomEffect = 0;
        this.shieldBroken = false;
        this.game.enemiesInLevel += 1;
        this.loadAnimations();
        this.updateBoundBox();
    };

    updateBoundBox() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 13, this.y + 3, 50, 84);
    };

    loadAnimations() {
            for (var i = 0; i < 2; i++) { // three states
                this.animations.push([]);
                for (var j = 0; j < 2; j++) { // two directions
                    this.animations[i].push([]);
                }
            }
            //example
            // this.animations[0][0] = new Animator(this.IDLE_RIGHT, -3, 0, 30, 43, 1, 1, false, true);
    
            // idle = 0
            // facing right = 0
            this.animations[0][0] = new Animator(this.IDLE_RIGHT, -10, 0, 42, 50, 1, 1, false, true);
    
            // idle = 0
            // facing left = 1
            this.animations[0][1] = new Animator(this.IDLE_LEFT, -9, 0, 39, 50, 1, 1, false, true);
    
            // walk = 1
            // facing right = 0
            this.animations[1][0] = new Animator(this.WALK_RIGHT, 9, 2, 41, 54, 8, 0.08, false, true);
    
            // walk = 1
            // facing left = 1
            this.animations[1][1] = new Animator(this.WALK_LEFT, 32, 0, 45, 54, 8, 0.08, true, true);

        };

    removeCounter(){
        if(this.removeFromWorld == true && this.hasNotBeenRemoved == true){
            this.game.enemiesInLevel -= 1
            this.hasNotBeenRemoved = false;
        }
    };

    update() {
        this.randomEffect = getRandomInteger(0, 5);
        if(!this.game.pauseb){
        this.updateBoundBox();
        this.elapsedTime += this.game.clockTick;
        this.randomFireRate = Math.random() * (1 - .3) + .3;
        var that = this;

        this.game.entities.forEach(function (entity) {
            if (entity instanceof masterchief  && that.dead == false) {
                if (canSee(that, entity) || that.seen || that.beenShot) {
                    that.alarmGrunts = true;
                    let r = ASSET_MANAGER.getRandomInt(25001);
                    if (r < 10) {
                        ASSET_MANAGER.playAsset("./audio/elite/elitelaugh1.mp3");
                    }
                    if (r >= 10 && r < 20) {
                        ASSET_MANAGER.playAsset("./audio/elite/elitewut.mp3");
                    }
                    if (r >= 20 && r < 30) {
                        ASSET_MANAGER.playAsset("./audio/elite/eliteRIH.mp3");
                    }
                    if (r >= 30 && r < 40) {
                        ASSET_MANAGER.playAsset("./audio/elite/elitemad.mp3");
                    }
                    that.seen = true;
                    if (that.BB.left > entity.BB.left) {
                    that.facing = 1;
                    } else {
                        that.facing = 0;
                    }
                    that.aimingX = entity.x;
                    that.aimingY = entity.y;
                    let isMoving = that.chooseDirection(entity, 275, 350);
                    if(isMoving) {
                        that.state = that.WALK;
                    }
                    that.armRotation =  Math.atan2 (
                        that.aimingX - that.x, 
                        - (that.aimingY - that.y)
                    ) - Math.PI / 2;
                    if (that.elapsedTime >= that.randomFireRate) {
                        that.elapsedTime = 0;
                        that.game.addEntityToFront(new EnemyBullet(that.game, that.x, that.y, entity, that.armRotation, that.weapon, that.shieldDamage, that.healthDamage, that.bulletSpeed));
                        ASSET_MANAGER.playAsset("./audio/weapons/pr single shot.mp3");
                    }

                }
            }
            if (entity instanceof Grunt) {
                if (canSee(that, entity) && entity.seen == true) {
                    that.seen = true;
                    that.alarmGrunts = true;
                }
            }
        });
        }
    };

    draw(ctx) {
        //if(!this.game.pauseb){
        if (this.health <= 0) {
            this.dead = true;
            if (this.facing === this.RIGHT) {
                this.deadRight.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.65);
            } else {
                this.deadLeft.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.65);
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
                var ratio2 = this.armor / this.MAX_ARMOR;
                ctx.fillStyle = "Red";
                ctx.fillRect(this.x - this.game.camera.x-4, this.y- this.game.camera.y -8, 75*ratio, 7);
                ctx.fillStyle = "Blue";
                ctx.fillRect(this.x - this.game.camera.x-4, this.y- this.game.camera.y -15, 75*ratio2, 7);
            }
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.65);
            ctx.save();
            ctx.translate(
                this.x - this.game.camera.x,
                this.y - this.game.camera.y
            );
            if (this.facing === this.LEFT) {
                ctx.scale(-1,1);
                ctx.translate(
                    -40,
                    30.5
                );
                ctx.rotate(-this.armRotation + Math.PI);
                ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE)
            } else {
                ctx.translate(
                    34,
                    30.5
                );
                ctx.rotate(this.armRotation);
                ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2, this.armImg.width * this.SCALE, this.armImg.height * this.SCALE)
            }
            ctx.restore();
            if (this.armor > 0 && this.beenShot == true) {
                this.shieldEffect[this.randomEffect].drawFrame(this.game.clockTick, ctx, this.x + 18 - this.game.camera.x, this.y + 10 - this.game.camera.y, 2);
                this.beenShot = false;
            }
            if (this.armor <= 0 && this.shieldBroken == false) {
                this.shieldEffect[0].drawFrame(this.game.clockTick, ctx, this.x + 18 - this.game.camera.x, this.y + 8 - this.game.camera.y, 2);
                this.shieldEffect[1].drawFrame(this.game.clockTick, ctx, this.x + 18 - this.game.camera.x, this.y + 10 - this.game.camera.y, 2);
                this.shieldEffect[2].drawFrame(this.game.clockTick, ctx, this.x + 18 - this.game.camera.x, this.y + 12 - this.game.camera.y, 2);
                this.shieldEffect[3].drawFrame(this.game.clockTick, ctx, this.x + 18 - this.game.camera.x, this.y + 14 - this.game.camera.y, 2);
                this.shieldEffect[4].drawFrame(this.game.clockTick, ctx, this.x + 18 - this.game.camera.x, this.y + 16 - this.game.camera.y, 2);
                this.shieldEffect[5].drawFrame(this.game.clockTick, ctx, this.x + 18 - this.game.camera.x, this.y + 18 - this.game.camera.y, 2);
                this.shieldBroken = true;
            }
        }
        //}
    };
}