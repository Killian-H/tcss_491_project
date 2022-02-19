class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, {x, y, width, height});

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(theOther) {
        let isCollide = false;
        if (this.right > theOther.left && this.left < theOther.right && this.top < theOther.bottom && this.bottom > theOther.top) {
            isCollide = true;
        }
        return isCollide;
    };

    update() {

    };

    draw(ctx) {
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.left - this.game.camera.x, this.top - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
};