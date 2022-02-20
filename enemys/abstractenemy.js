class AbstractEnemy {
    
    constructor(game, x, y) {
        Object.assign(game, x, y);
        this.velocity = { x: 0, y: 0};
    }

    chooseDirection(entity, distMin, distMax) {
        let direction = false;
        let distance = getDistance(this.x, this.y, entity.x, entity.y);
        if (distance > distMax) {
            direction = this.moveTowards(entity);
        } else if (distance < distMin) {
            direction = this.moveAway(entity);
        } else {
            direction = this.randomMovement(entity);
        }
        return direction;
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
        if (isMovingX && isMovingY) {
            this.velocity.x = (this.velocity.x / 2) * Math.sqrt(2);
            this.velocity.y = (this.velocity.y / 2) * Math.sqrt(2);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        return isMovingX || isMovingY;
    };

    moveAway(entity) {
        let isMovingX = false;
        let isMovingY = false;
        if(entity.x > this.x) { //move right
            this.velocity.x = -this.SET_VELOCITY.x * this.game.clockTick;
            isMovingX = true;
        } else if(entity.x < this.x) { //move left
            this.velocity.x = (this.SET_VELOCITY.x * this.game.clockTick);
            isMovingX = true;
        } else {
            this.velocity.x = 0;
            isMovingX = false;
        }
        
        if(entity.y > this.y) { //move down
            this.velocity.y = -this.SET_VELOCITY.y * this.game.clockTick;
            isMovingY = true;
        } else if(entity.y < this.y) { //move up
            this.velocity.y = (this.SET_VELOCITY.y * this.game.clockTick);
            isMovingY = true;
        } else {
            this.velocity.y = 0;
            isMovingY = false
        }
        
        if (isMovingX && isMovingY) {
            this.velocity.x = (this.velocity.x / 2) * Math.sqrt(2);
            this.velocity.y = (this.velocity.y / 2) * Math.sqrt(2);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    return isMovingX || isMovingY;
    };

    randomMovement(entity) {
        let randomDirection = getRandomRange(-150, 150);
        let isMovingX = false;
        let isMovingY = false;
        if(entity.x + randomDirection > this.x) { //move right
            this.velocity.x = this.SET_VELOCITY.x * this.game.clockTick;
            isMovingX = true;
        } else if(entity.x + randomDirection < this.x) { //move left
            this.velocity.x = -1 * (this.SET_VELOCITY.x * this.game.clockTick);
            isMovingX = true;
        } else {
            this.velocity.x = 0;
            isMovingX = false;
        }
        
        if(entity.y + randomDirection > this.y) { //move down
            this.velocity.y = this.SET_VELOCITY.y * this.game.clockTick;
            isMovingY = true;
        } else if(entity.y + randomDirection < this.y) { //move up
            this.velocity.y = -1 * (this.SET_VELOCITY.y * this.game.clockTick);
            isMovingY = true;
        } else {
            this.velocity.y = 0;
            isMovingY = false
        }
        if (isMovingX && isMovingY) {
            this.velocity.x = (this.velocity.x / 2) * Math.sqrt(2);
            this.velocity.y = (this.velocity.y / 2) * Math.sqrt(2);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        return isMovingX || isMovingY;
    };
}