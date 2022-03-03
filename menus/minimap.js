class Minimap {
    constructor(game, x, y, w, h) {
        Object.assign(this, {game, x, y, w, h});
    }

    update() {

    }

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        for (var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    }
}