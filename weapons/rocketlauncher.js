class RocketLauncher extends AbstractWeapon {

    ARMS_ROCKET = ASSET_MANAGER.getAsset("./sprites/master_chief/arms_rocket_launcher.png");
    ROCKET_PIC = ASSET_MANAGER.getAsset("./sprites/hud_display/rocket_launcher.png");
    RL_BULLET = ASSET_MANAGER.getAsset("./sprites/weapons/rocket.png");
    SCALE = 1.6;
    AMMO_DEFAULT = 2;


    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
        this.armRotation = 0;
        this.draw = this.ARMS_ROCKET;
        this.speed = 450;
        // this.shieldDamage = 20;
        // this.healthDamage = 45;
        this.firerate = 1.35;
        this.scale = this.SCALE;
        this.canshoot = true;
        this.reloading = false;
        this.reloadTime = 0;
        this.defaultReloadTime = 4500;
        this.elapsedtime = 0;
        this.ammo = this.AMMO_DEFAULT;
        this.ammotype = this.RL_BULLET;
        this.gun = this.ROCKET_PIC;
        this.ammotypescale = 0.75;
        this.unlocked = true;
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

                this.game.addEntityToFront(new Rocket(this.game, this.x, this.y, this.game.mouse.x, this.game.mouse.y, this.armRotation, this.speed, this.RL_BULLET, this.shieldDamage, this.healthDamage));
                ASSET_MANAGER.playAsset("./audio/weapons/rocket single shot.mp3");
            }
            
            if(this.reloading){
                this.reloadTime += TICK;
            }

            if (this.game.reload && (this.ammo < this.AMMO_DEFAULT)&&!this.reloading) {
                this.reloadTime = 0;
                let stopShoot = setInterval(() => {this.canshoot = false,this.reloading = true}, 1);
                ASSET_MANAGER.playAsset("./audio/weapons/rocket reload.mp3");
                setTimeout(() => {this.ammo = this.AMMO_DEFAULT, clearInterval(stopShoot), this.canshoot = true,this.reloading = false,this.reloadTime = 0}, this.defaultReloadTime);
            }
        }
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
}