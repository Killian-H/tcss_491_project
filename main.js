const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// images
ASSET_MANAGER.queueDownload("./sprites/TestMap.png");
ASSET_MANAGER.queueDownload("./images/menu pic.jpg");
ASSET_MANAGER.queueDownload("./images/troy.jpg");
ASSET_MANAGER.queueDownload("./images/gameoverscreen.jpg");

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
ASSET_MANAGER.queueDownload("./sprites/grunt/plasma_shot.png");

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

// bullet
ASSET_MANAGER.queueDownload("./sprites/bullet.png");

// music
ASSET_MANAGER.queueDownload("./music/halo 3 theme.mp3");

// sound effects
ASSET_MANAGER.queueDownload("./audio/ar reload.mp3");
ASSET_MANAGER.queueDownload("./audio/ar fire.mp3");
ASSET_MANAGER.queueDownload("./audio/walking.mp3");
ASSET_MANAGER.queueDownload("./audio/stopping.mp3");
ASSET_MANAGER.queueDownload("./audio/ar single.mp3");
ASSET_MANAGER.queueDownload("./audio/gruntscream.mp3");
ASSET_MANAGER.queueDownload("./audio/gruntpee.mp3");
ASSET_MANAGER.queueDownload("./audio/plasma pistol shot.mp3");
ASSET_MANAGER.queueDownload("./audio/mcdeath.mp3");
ASSET_MANAGER.queueDownload("./audio/gameover.mp3");

// terrain
ASSET_MANAGER.queueDownload("./sprites/terrain/grass_1.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/grass_2.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/grass_3.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/tree.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/rock.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	PARAMS.CANVAS_WIDTH = canvas.width;	
	
	gameEngine.init(ctx);

	this.scene = new SceneManager(gameEngine);
	gameEngine.addEntity(scene);
	this.scene.loadStartMenu(); 
	//this.scene.loadDeathMenu(); //for testing death menu
	gameEngine.start();

	
});