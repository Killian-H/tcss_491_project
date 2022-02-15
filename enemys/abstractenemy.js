class AbstractEnemy {
    
    constructor(game, x, y) {
        Object.assign(game, x, y);
        this.velocity = { x: 0, y: 0};
    }
    moveTowards(entity) {
        let isMovingX = false;
        let isMovingY = false;
        if(entity.x > this.x) { //move right
            this.velocity.x = this.SET_VELOCITY.x * this.game.clockTick;
            isMovingX = true;
        } else if(entity.x < this.x) { //move left
            this.velocity.x = -1 * (this.SET_VELOCITY.x * this.game.clockTick);
            isMovingX = true;
        } else {
            this.velocity.x = 0;
            isMovingX = false;
        }
        
        if(entity.y > this.y) { //move down
            this.velocity.y = this.SET_VELOCITY.y * this.game.clockTick;
            isMovingY = true;
        } else if(entity.y < this.y) { //move up
            this.velocity.y = -1 * (this.SET_VELOCITY.y * this.game.clockTick);
            isMovingY = true;
        } else {
            this.velocity.y = 0;
            isMovingY = false
        }
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        return isMovingX || isMovingY;
    }
}