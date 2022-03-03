class BoundingCircle {
    constructor(x, y, radius) {
        Object.assign(this, {x, y, radius});
        this.initialPoint = {x, y};
        this.radius = radius;
    };

    drawMinimap(ctx, mmX, mmY) {
    };

    collisionCircle(theOther) {
        let isCollide = false;
        var top = theOther.top + this.radius;
        var left = theOther.left + this.radius;
        var right = theOther.right + this.radius;
        var bottom = theOther.bottom + this.radius;
        if (this.initialPoint.x > left && this.initialPoint.x < right && this.initialPoint.y > top && this.initialPoint.y < bottom) {
            isCollide = true;
        }
        return isCollide;
    };
}