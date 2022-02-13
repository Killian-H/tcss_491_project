const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// images
ASSET_MANAGER.queueDownload("./sprites/TestMap.png");
ASSET_MANAGER.queueDownload("./images/menu pic.jpg");
ASSET_MANAGER.queueDownload("./images/troy.jpg");
ASSET_MANAGER.queueDownload("./images/gameoverscreen.jpg");
ASSET_MANAGER.queueDownload("./images/creditsimage.jpg");
ASSET_MANAGER.queueDownload("./images/controlsimage.jpg");
ASSET_MANAGER.queueDownload("./images/chiefheadimage.png");


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

// Elite
ASSET_MANAGER.queueDownload("./sprites/elite/elite_idle_right.png");
ASSET_MANAGER.queueDownload("./sprites/elite/elite_walk_right.png");
ASSET_MANAGER.queueDownload("./sprites/elite/elite_die_right.png");
ASSET_MANAGER.queueDownload("./sprites/elite/elite_arm_plasma_rifle.png");
ASSET_MANAGER.queueDownload("./sprites/elite/plasma_rifle_shot.png");
ASSET_MANAGER.queueDownload("./sprites/elite/elite_idle_left.png");
ASSET_MANAGER.queueDownload("./sprites/elite/elite_walk_left.png");
ASSET_MANAGER.queueDownload("./sprites/elite/elite_die_left.png");

// Chief
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_head_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_head_top_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_head_bottom_right.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/chief_arms_assault_rifle.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/arms_plasma_rifle.png");
ASSET_MANAGER.queueDownload("./sprites/weapons/plasma_rifle_red_shot.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/arms_pistol.png");
ASSET_MANAGER.queueDownload("./sprites/weapons/pistol_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/arms_dmr.png");
ASSET_MANAGER.queueDownload("./sprites/weapons/dmr_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/master_chief/arms_shotgun.png");
ASSET_MANAGER.queueDownload("./sprites/weapons/shotgun_pellet.png");
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
ASSET_MANAGER.queueDownload("./audio/weapons/ar reload.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/pr reload.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/pr single shot.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/pr switch.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/ar switch.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/pistol switch.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/pistol reload.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/pistol shot.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/plasma pistol shot.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/ar single.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/shotgun reload.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/shotgun shot.mp3");
ASSET_MANAGER.queueDownload("./audio/weapons/shotgun switch.mp3");

ASSET_MANAGER.queueDownload("./audio/click.wav");
ASSET_MANAGER.queueDownload("./audio/mcdeath.mp3");
ASSET_MANAGER.queueDownload("./audio/gameover.mp3");
ASSET_MANAGER.queueDownload("./audio/walking.mp3");
ASSET_MANAGER.queueDownload("./audio/stopping.mp3");

ASSET_MANAGER.queueDownload("./audio/grunt/gruntscream.mp3");
ASSET_MANAGER.queueDownload("./audio/grunt/gruntpee.mp3");
ASSET_MANAGER.queueDownload("./audio/grunt/gruntdiedevil.mp3");
ASSET_MANAGER.queueDownload("./audio/grunt/gruntitdies.mp3");
ASSET_MANAGER.queueDownload("./audio/grunt/gruntlookout.mp3");

ASSET_MANAGER.queueDownload("./audio/elite/elitelaugh1.mp3");
ASSET_MANAGER.queueDownload("./audio/elite/elitewut.mp3");
ASSET_MANAGER.queueDownload("./audio/elite/elitemad.mp3");
ASSET_MANAGER.queueDownload("./audio/elite/eliteRIH.mp3");


// terrain
ASSET_MANAGER.queueDownload("./sprites/terrain/grass_1.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/grass_2.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/grass_3.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/tree.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/rock.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/big_tree.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/dirt_wall_top.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/dirt_wall.png");
ASSET_MANAGER.queueDownload("./sprites/terrain/dirt.png");

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