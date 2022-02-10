class PlasmaRifle extends AbstractWeapon {

    ARMS_ASSAULT = ASSET_MANAGER.getAsset("./sprites/master_chief/arms_plasma_rifle.png");
    PR_BULLET = ASSET_MANAGER.getAsset("./sprites/weapons/plasma_rifle_red_shot.png");
    SCALE = 1.6;
    AMMO_DEFAULT = 20;

    constructor(game, chiefX, chiefY) {
        super(game, chiefX, chiefY);
        Object.assign(this, {game, chiefX, chiefY});
        this.game = game;
        this.x = chiefX;
        this.y = chiefY;
        this.armRotation = 0;
        this.draw = this.ARMS_ASSAULT;
        this.speed = 500;
        this.shieldDamage = 12;
        this.healthDamage = 4;
        this.firerate = .15;
        this.scale = this.SCALE;
        this.canshoot = true;
        this.reloading = false;
        this.reloadTime = 0;
        this.elapsedtime = 0;
        this.ammo = this.AMMO_DEFAULT;
    };

    update() {
        this.x = this.game.player.x;
        this.y = this.game.player.y;
        const TICK = this.game.clockTick;
        if(this.game.mouse != null) {
            this.armRotation = Math.atan2 (
                this.game.mouse.x - this.x, 
                - (this.game.mouse.y - this.y)
            ) - Math.PI / 2;
        }

        this.elapsedtime += TICK;
        console.log(this.elapsedtime);
        if(this.game.click != null && this.elapsedtime > this.firerate && this.ammo > 0 && !this.game.reload && this.canshoot) {
            this.elapsedtime = 0;
            this.clickcount = 1;
            this.ammo -= 1;

            this.game.addEntityToFront(new bullet(this.game, this.x, this.y, this.game.mouse.x, this.game.mouse.y, this.armRotation, this.speed, this.PR_BULLET, this.shieldDamage, this.healthDamage));
            ASSET_MANAGER.playAsset("./audio/pr single shot.mp3");
            //this.game.click = null
        }

        if (this.game.reload && (this.ammo < this.AMMO_DEFAULT)&&!this.reloading) {
            let stopShoot = setInterval(() => {this.canshoot = false,this.reloadTime += 1,this.reloading = true}, 1);
            ASSET_MANAGER.playAsset("./audio/pr reload.mp3")
            setTimeout(() => {this.ammo = this.AMMO_DEFAULT, clearInterval(stopShoot), this.canshoot = true,this.reloading = false,this.reloadTime = 0}, 2500);
            //clearInterval(() => {clearInterval(stopShoot), this.canshoot = true}, 3000);
        }
    };

    getArmRotation() {
        return this.armRotation;
    };

    resetAmmo() {
        this.ammo = this.AMMO_DEFAULT;
    }

    draw(ctx) {
        // if (this.facing == 1) {

        // } else {
            
        // }
    };
};