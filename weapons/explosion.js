class Explosion {

    EXPLODE = ASSET_MANAGER.getAsset("./sprites/weapons/rocket_explosion.png");
    IN_DMG = 300;
    OUT_DMG = 140;

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.innerDamage = this.IN_DMG;
        this.outerDamage = this.OUT_DMG;
        this.sprite = this.EXPLODE;
        this.removetime = false;
        setTimeout(() => {this.removetime = true}, 200);
        this.updateBoundBox();
    }

    updateBoundBox() {
        // this.BB = new BoundingBox(this.x, this.y, 24, 24);
    };

    update() {
        if(!this.game.pauseb) {
            var that = this;
        }
        if(this.removetime == true) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        ctx.drawImage(this.sprite, this.x - this.game.camera.x, this.y - this.game.camera.y,this.sprite.width * 2.5,this.sprite.height *2.5)
    };
}