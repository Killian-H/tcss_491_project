class RocketLauncherPickup {

    RL_PIC = ASSET_MANAGER.getAsset("./sprites/hud_display/rocket_launcher.png");
    //WIDTH = 200;
    //HEIGHT = 200;
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x, this.y, this.RL_PIC.width * 2.5,this.RL_PIC.height *2.5);
    };

    update() {
        if(!this.game.pauseb){
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof masterchief) {
                        entity.weaponArray[5].unlocked = true;
                        // reload here ASSET_MANAGER.playAsset("./audio/weapons/shotgun switch.mp3");
                        that.removeFromWorld = true;
                    }
                }
            });
        }
    };

    draw(ctx){
        //if(!this.game.pauseb){
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        ctx.save();
        ctx.drawImage(this.RL_PIC, this.x - this.game.camera.x, this.y - this.game.camera.y, this.RL_PIC.width * 2.5, this.RL_PIC.height * 2.5)// this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.HEIGHT);
        ctx.restore();
        //}
    };
}