const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const SCENE_MANAGER = new SceneManager();

ASSET_MANAGER.queueDownload("./sprites/TestMap.png");


// Grunt
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_arms.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_arm_plasma_pistol.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_dead.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_head.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_idle.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_scared.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_walk.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_dead_left.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_idle_left.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_scared_left.png");
ASSET_MANAGER.queueDownload("./sprites/grunt/grunt_walk_left.png");

// Chief
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_head_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_head_top_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_head_bottom_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_arms_assault_rifle.png");
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
	
	PARAMS.CANVAS_WIDTH = canvas.width;

	gameEngine.init(ctx);
	
	gameEngine.addEntity(new Grunt(gameEngine, 200, 200));
	gameEngine.addEntity(new Grunt(gameEngine, 100, 300));
	gameEngine.addEntity(new Grunt(gameEngine, 173, 97));
    gameEngine.addEntity(new masterchief(gameEngine, 100, 100));

	new SceneManager(gameEngine);
	gameEngine.start();

	
});