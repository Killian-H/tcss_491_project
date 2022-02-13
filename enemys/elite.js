class Elite extends AbstractEnemy {

    SCALE = 1.65;

    IDLE = 0;
    WALK = 1;
    FULL_HEALTH = 250;
    MAX_ARMOR = 200;
    RIGHT = 0;
    LEFT = 1;

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
        this.weapon = "pr";
        this.seen = false;
        this.aimingX = 0;
        this.aimingY = 0;
        this.health = this.FULL_HEALTH;
        this.state = this.WALK; // 0 = idle, 1 = walk
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
        this.bulletSpeed = 550;
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

    update() {
        if(!this.game.pauseb){
        this.updateBoundBox();
        this.elapsedTime += this.game.clockTick;
        this.randomFireRate = Math.random() * (1 - .3) + .3;
        var that = this;

        this.game.entities.forEach(function (entity) {
            if (entity instanceof masterchief  && that.dead == false) {
                if (canSee(that, entity) || that.seen || that.beenShot) {
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
            setTimeout(() => {this.removeFromWorld = true}, 800);
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
        }
        //}
    };
}