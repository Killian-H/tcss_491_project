class Tree {

    PINE_TREE = ASSET_MANAGER.getAsset("./sprites/terrain/tree.png");

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    };
    
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.PINE_TREE, this.x, this.y);
    };
};

class Terrain {

    GRASS_1 = ASSET_MANAGER.getAsset("./sprites/terrain/grass_1.png");
    GRASS_2 = ASSET_MANAGER.getAsset("./sprites/terrain/grass_2.png");
    GRASS_3 = ASSET_MANAGER.getAsset("./sprites/terrain/grass_3.png");

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game = game;
        this.x = x;
        this.y = y;
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.GRASS_1, this.x, this.y);
    };
}