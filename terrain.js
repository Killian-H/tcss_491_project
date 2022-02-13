class AbstractEnvironment {
    constructor(game, x, y) {
        Object.assign(game, x, y);
    }
}

class Tree extends AbstractEnvironment {

    PINE_TREE = ASSET_MANAGER.getAsset("./sprites/terrain/tree.png");

    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.BB = new BoundingBox(this.x + 13, this.y + 108, 36, 20);
    };

    update() {
        if(!this.game.pauseb){
        }
    };



    draw(ctx) {
        ctx.drawImage(this.PINE_TREE, this.x - this.game.camera.x, this.y - this.game.camera.y);
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class BigTree extends AbstractEnvironment {

    PINE_TREE = ASSET_MANAGER.getAsset("./sprites/terrain/big_tree.png");

    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.BB = new BoundingBox(this.x + 28, this.y + 13, 200, 226);
    };

    update() {
        if(!this.game.pauseb){
        }
    };



    draw(ctx) {
        ctx.drawImage(this.PINE_TREE, this.x - this.game.camera.x, this.y - this.game.camera.y);
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Rock extends AbstractEnvironment {

    ROCK = ASSET_MANAGER.getAsset("./sprites/terrain/rock.png");

    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.BB = new BoundingBox(this.x, this.y + 2, 40, 34);
    };

    update() {
        if(!this.game.pauseb){
        }
    };

    draw(ctx) {
        ctx.drawImage(this.ROCK, this.x - this.game.camera.x, this.y - this.game.camera.y);
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class WallTop extends AbstractEnvironment {

    WALL_TOP = ASSET_MANAGER.getAsset("./sprites/terrain/dirt_wall_top.png");

    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.BB = new BoundingBox(this.x, this.y + 8, 128, 120);
    };

    update() {
        if(!this.game.pauseb){
        }
    };

    draw(ctx) {
        ctx.drawImage(this.WALL_TOP, this.x - this.game.camera.x, this.y - this.game.camera.y);
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Wall extends AbstractEnvironment {

    WALL = ASSET_MANAGER.getAsset("./sprites/terrain/dirt_wall.png");

    constructor(game, x, y) {
        super(game, x, y);
        Object.assign(this, {game, x, y});
        this.BB = new BoundingBox(this.x, this.y, 128, 128);
    };

    update() {
        if(!this.game.pauseb){
        }
    };

    draw(ctx) {
        ctx.drawImage(this.WALL, this.x - this.game.camera.x, this.y - this.game.camera.y);
        if (PARAMS.DEBUG == true) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Terrain {

    GRASS_1 = ASSET_MANAGER.getAsset("./sprites/terrain/grass_1.png");
    GRASS_2 = ASSET_MANAGER.getAsset("./sprites/terrain/grass_2.png");
    GRASS_3 = ASSET_MANAGER.getAsset("./sprites/terrain/grass_3.png");

    TYPES = [this.GRASS_1,this.GRASS_2,this.GRASS_3];

    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y});
        this.grassType = this.TYPES[type];
    };

    update() {
        if(!this.game.pauseb){
        }
    };

    draw(ctx) {
        ctx.drawImage(this.grassType, this.x - this.game.camera.x, this.y - this.game.camera.y);
    };
}

class Dirt {
    DIRT = ASSET_MANAGER.getAsset("./sprites/terrain/dirt.png");

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
    };

    update() {
        if(!this.game.pauseb){
        }
    };

    draw(ctx) {
        ctx.drawImage(this.DIRT, this.x - this.game.camera.x, this.y - this.game.camera.y);
    };
}