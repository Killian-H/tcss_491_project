const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/master_chief/arms_1.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_idle_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_idle_left.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_walk_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_walk_left.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_crouch_idle_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_crouch_idle_left.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_crouch_move_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_crouch_move_left.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_walk_left.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_melee_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_melee_left.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_die_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_die_left.png");
ASSET_MANAGER.queueDownload("./sprites/bullet.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	
	gameEngine.addEntity(new masterchief(gameEngine));

	new SceneManager(gameEngine);
	gameEngine.start();

	
});