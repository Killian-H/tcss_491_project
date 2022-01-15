class masterchief {

    X_DEFAULT = 250;
    Y_DEFAULT = 250;
    ARMS_DEFAULT = ASSET_MANAGER.getAsset("./sprites/master_chief/arms_1.png");

    constructor(game) {
        this.game = game;
        this.armRotation = 0;
        this.x = this.X_DEFAULT;
        this.y = this.Y_DEFAULT;
        this.armImg = this.ARMS_DEFAULT;
        //this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/master_chief/arms_1.png"), 3, 0, 38, 70, 1, 0.2);
        
    };

    update() {

        if(this.game.mouse != null) {
            this.armRotation = Math.atan2 (
                this.game.mouse.x - this.x, 
                - (this.game.mouse.y - this.y)
            ) - 1.5708;
        }
    };

    draw(ctx) {
        //this.animator.drawFrame(this.game.clockTick, ctx, 100, 100);
        ctx.save();
        ctx.translate(
            this.x,
            this.y
        );
        ctx.rotate(this.armRotation);
        ctx.drawImage(this.armImg, -this.armImg.width / 2, -this.armImg.height/2);
        ctx.restore();

    };

}