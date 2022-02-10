class AssaultRifle extends AbstractWeapon {

    ARMS_ASSAULT = ASSET_MANAGER.getAsset("./sprites/master_chief/chief_arms_assault_rifle.png");
    SCALE = 1.6;
    AMMO_DEFAULT = 32;

    constructor(game, chiefX, chiefY, chiefFacing) {
        super(game, chiefX, chiefY, chiefFacing);
        Object.assign(this, {game, chiefX, chiefY, chiefFacing});
        this.game = game;
        this.x = chiefX;
        this.y = chiefY;
        this.armRotation = 0;
        this.draw = this.ARMS_ASSAULT;
        this.firerate = .1;
        this.scale = this.SCALE;
        this.canshoot = true;
        this.reloading = false;
        this.reloadTime = 0;
        this.facing = chiefFacing;
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
        //console.log(this.elapsedtime);
        if(this.game.click != null && this.elapsedtime > this.firerate && this.ammo > 0 && !this.game.reload && this.canshoot) {
            this.elapsedtime = 0;
            this.clickcount = 1;
            this.ammo -= 1;

            this.game.addEntityToFront(new bullet(this.game, this.x, this.y, this.game.mouse.x, this.game.mouse.y, this.armRotation));
            ASSET_MANAGER.playAsset("./audio/ar single.mp3");
            //this.game.click = null
        }

        if (this.game.reload && (this.ammo < this.AMMO_DEFAULT)&&!this.reloading) {
            let stopShoot = setInterval(() => {this.canshoot = false,this.reloadTime += 1,this.reloading = true}, 1);
            ASSET_MANAGER.playAsset("./audio/ar reload.mp3")
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