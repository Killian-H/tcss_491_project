class ShotgunPickup {

    SHOTGUN_PIC = ASSET_MANAGER.getAsset("./sprites/hud_display/shotgun.png");
    //WIDTH = 200;
    //HEIGHT = 200;
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x, this.y, this.SHOTGUN_PIC.width * 2.5,this.SHOTGUN_PIC.height *2.5);
    };

    update() {
        if(!this.game.pauseb){
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof masterchief) {
                        entity.weaponArray[3].unlocked = true;
                        ASSET_MANAGER.playAsset("./audio/weapons/shotgun reload.mp3");
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
        ctx.drawImage(this.SHOTGUN_PIC, this.x - this.game.camera.x, this.y - this.game.camera.y,this.SHOTGUN_PIC.width * 2.5,this.SHOTGUN_PIC.height *2.5)// this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.HEIGHT);
        ctx.restore();
        //}
    };
}