class Minimap {
    constructor(game, x, y, w, h) {
        Object.assign(this, {game, x, y, w, h});
    }

    drawMinimap(ctx, mmX, mmY) {
        for (var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
        //this.game.entities.forEach(function (entity) {
            //console.log(mmX);
            //entity.drawMinimap(ctx, mmX, mmY);
       // });
        //console.log("HEllo");
    };

    update() {

    }

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        //for (var i = 0; i < this.game.entities.length; i++) {
        this.drawMinimap(ctx, this.x, this.y);
        //}
    }
}