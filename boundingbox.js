class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, {x, y, width, height});

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    drawMinimap(ctx, mmX, mmY) {
    };

    collide(theOther) {
        let isCollide = false;
        if (this.right >= theOther.left && this.left <= theOther.right && this.top <= theOther.bottom && this.bottom >= theOther.top) {
            isCollide = true;
        }
        return isCollide;
    };
};