class Minimap {
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w});
    }

    update() {

    }

    draw(ctx) {
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.w, 50);
        for (var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    }
}