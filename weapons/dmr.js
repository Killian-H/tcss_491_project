class DMR extends AbstractWeapon {

    ARMS_ASSAULT = ASSET_MANAGER.getAsset("./sprites/master_chief/arms_dmr.png");
    DMR_PIC = ASSET_MANAGER.getAsset("./sprites/hud_display/dmr.png");
    PR_BULLET = ASSET_MANAGER.getAsset("./sprites/weapons/dmr_bullet.png");
    SCALE = 1.6;
    AMMO_DEFAULT = 15;

    constructor(game, chiefX, chiefY) {
        super(game, chiefX, chiefY);
        Object.assign(this, {game, chiefX, chiefY});
        this.game = game;
        this.x = chiefX;
        this.y = chiefY;
        this.armRotation = 0;
        this.draw = this.ARMS_ASSAULT;
        this.speed = 750;
        this.shieldDamage = 35;
        this.healthDamage = 50;
        this.firerate = .35;
        this.scale = this.SCALE;
        this.canshoot = true;
        this.reloading = false;
        this.reloadTime = 0;
        this.defaultReloadTime = 2500;
        this.elapsedtime = 0;
        this.ammo = this.AMMO_DEFAULT;
        this.ammoReserve = Infinity;
        this.ammotype = this.PR_BULLET;
        this.gun = this.DMR_PIC;
        this.ammotypescale = 2.5;
        this.unlocked = false;
    };

    update() {
        if(!this.game.pauseb){
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
            if(this.game.click != null && this.elapsedtime > this.firerate && this.ammo > 0 && !this.game.reload && this.canshoot) {
                this.elapsedtime = 0;
                this.clickcount = 1;
                this.ammo -= 1;

                this.game.addEntityToFront(new bullet(this.game, this.x, this.y, this.game.mouse.x, this.game.mouse.y, this.armRotation, this.speed, this.PR_BULLET, this.shieldDamage, this.healthDamage));
                ASSET_MANAGER.playAsset("./audio/weapons/ar single.mp3");
            }

            if(this.reloading){
                this.reloadTime += TICK;
            }

            if (this.game.reload && (this.ammo < this.AMMO_DEFAULT)&&!this.reloading&&this.ammoReserve > 0) {
                this.reloadTime = 0;
                let stopShoot = setInterval(() => {this.canshoot = false,this.reloading = true}, 1);
                ASSET_MANAGER.playAsset("./audio/weapons/ar reload.mp3");
                setTimeout(() => {this.reloadlogic(), clearInterval(stopShoot), this.canshoot = true,this.reloading = false,this.reloadTime = 0}, this.defaultReloadTime);
            }
        }
    };

    reloadlogic(){
        if(this.ammoReserve >= this.AMMO_DEFAULT){
            this.ammoReserve -= (this.AMMO_DEFAULT - this.ammo)
            this.ammo = this.AMMO_DEFAULT;
        }
        else {
            this.ammo = this.ammoReserve;
            this.ammoReserve = 0;
        }
    }
    
    drawMinimap(ctx, mmX, mmY) {
    };

    getArmRotation() {
        return this.armRotation;
    };

    resetAmmo() {
        this.ammo = this.AMMO_DEFAULT;
    }

    draw(ctx) {
        if(!this.game.pauseb){
        }
        // if (this.facing == 1) {

        // } else {
            
        // }
    };
};