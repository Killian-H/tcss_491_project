class hud {

    SHIELD_PIC = ASSET_MANAGER.getAsset("./sprites/hud_display/hud_image_shield1.png");
    HEALTH_PIC = ASSET_MANAGER.getAsset("./sprites/hud_display/hud_image_health1.png");
    COVENANT_PIC = ASSET_MANAGER.getAsset("./sprites/hud_display/hud_logo_covenant.png");
    HAPPY_PIC = ASSET_MANAGER.getAsset("./images/happy.png");

    constructor(game,x,y,masterchief) {
        Object.assign(this, {game, x, y, masterchief});
    }

    update() {
        if(this.game.pauseb){
            if (this.game.mouse != null) {
                if ((this.game.mouse.x - this.game.camera.x >= 400 && this.game.mouse.x - this.game.camera.x <= 600) && (this.game.mouse.y - this.game.camera.y >= 145 && this.game.mouse.y - this.game.camera.y <= 185) 
                    && (this.game.click)) {
                    ASSET_MANAGER.playAsset("./audio/click.wav");
                    this.game.camera.loadLevel(levelOne);
                }
                if ((this.game.mouse.x - this.game.camera.x >= 450 && this.game.mouse.x - this.game.camera.x <= 553) && (this.game.mouse.y - this.game.camera.y >= 225 && this.game.mouse.y - this.game.camera.y <= 265)
                    && (this.game.click)) {
                    ASSET_MANAGER.playAsset("./audio/click.wav");
                    this.game.camera.loadStartMenu();
                }
            }
        }

    }

    draw(ctx) {
        if(!this.game.pauseb){
        //console.log("Hello");
        //ctx.font = 56 + 'px "Alegreya Sans"';
        ctx.fillStyle = "Black";
        ctx.strokeStyle = "Black";
        //ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Arial"';
        ctx.font = 'bold 20px "Black Ops One"';
        ctx.fillText((this.masterchief.weapon.ammo+"/"+this.masterchief.weapon.AMMO_DEFAULT), 65, 50);
        ctx.drawImage(this.masterchief.weapon.ammotype, 25, 40, this.masterchief.weapon.ammotype.width * this.masterchief.weapon.ammotypescale, this.masterchief.weapon.ammotype.height * this.masterchief.weapon.ammotypescale);
        ctx.drawImage(this.masterchief.weapon.gun, 25, 65, this.masterchief.weapon.gun.width * 2.5, this.masterchief.weapon.gun.height * 2.5);
        ctx.fillText(("Enemies remaining "+this.game.enemiesInLevel), 400, 50);
        ctx.drawImage(this.COVENANT_PIC, 365, 25, this.COVENANT_PIC.width * 0.07, this.COVENANT_PIC.height * 0.07);
        //ctx.fillText(("🛡️ "+this.masterchief.armor), 850, 50);
        //ctx.fillText(("➕ "+this.masterchief.health), 850, 110);
        var ratio = this.masterchief.health / this.masterchief.MAX_HEALTH;
        ctx.font = 'bold 12px "Black Ops One"';
        //ctx.fillText(("➕"), 815, 105);
        ctx.drawImage(this.HEALTH_PIC, 815, 82, this.HEALTH_PIC.width * 0.2, this.HEALTH_PIC.height * 0.2);
        ctx.fillStyle = "FireBrick";
        ctx.fillRect(850, 75, 150*ratio, 40);
        var ratio2 = this.masterchief.armor / this.masterchief.MAX_ARMOR;
        //ctx.fillText(("🛡️"), 820, 55);
        ctx.drawImage(this.SHIELD_PIC, 810, 25, this.SHIELD_PIC.width * 0.2, this.SHIELD_PIC.height * 0.2);
        ctx.fillStyle = "DodgerBlue";
        ctx.fillRect(850, 25, 150*ratio2, 40);
        ctx.fillStyle = "White";
        var ratio4 = this.masterchief.weapon.reloadTime / this.masterchief.weapon.defaultReloadTime;
        ctx.fillRect(this.masterchief.positionx-13 , this.masterchief.positiony+55, 50000*ratio4, 5);
        ctx.fillStyle = "White";
        if(this.masterchief.weapon.ammo == 0 && this.masterchief.weapon.canshoot){
            ctx.fillText(("R -> Reload"), this.masterchief.positionx-38, this.masterchief.positiony+75);
        }
        ctx.font = 'bold 48px "Black Ops One"';
        if (PARAMS.DEBUG == true) {
            ctx.fillStyle = "Black";
            ctx.strokeStyle = "Black";
            ctx.font = 'bold 16px "Black Ops One"';
            ctx.fillText(("🛡️ "+this.masterchief.armor), 850, 50);
            ctx.fillText(("➕ "+this.masterchief.health), 850, 110);
            ctx.drawImage(this.HAPPY_PIC, 645, 25, this.HAPPY_PIC.width * 0.17, this.HAPPY_PIC.height * 0.17);
            //var ratio3 = this.masterchief.ammo / this.masterchief.AMMO_DEFAULT;
            //ctx.fillRect(50, 25, 150*ratio3, 40);
        }
        //ctx.strokeText((this.masterchief.ammo+"ammo"), 1000, 500);
        }
        else if(this.game.pauseb){
            ctx.font = 'bold 48px "Black Ops One"';
            ctx.fillStyle = "Red";
            ctx.fillText(("PAUSED"), 400, 105);
            if (this.game.mouse != null) {
                if ((this.game.mouse.x - this.game.camera.x >= 400 && this.game.mouse.x - this.game.camera.x <= 600) && (this.game.mouse.y - this.game.camera.y >= 145 && this.game.mouse.y - this.game.camera.y <= 185)) {
                    ctx.fillStyle = "Black";
                    ctx.fillText("Restart", 400, 185);
                }
                else {
                    ctx.fillStyle = "Red";
                    ctx.fillText("Restart", 400, 185);
                }
                if ((this.game.mouse.x - this.game.camera.x >= 450 && this.game.mouse.x - this.game.camera.x <= 553) && (this.game.mouse.y - this.game.camera.y >= 225 && this.game.mouse.y - this.game.camera.y <= 265)) {
                    ctx.fillStyle = "Black";
                    ctx.fillText("Quit", 450, 265);
                }
                else {
                    ctx.fillStyle = "Red";
                    ctx.fillText("Quit", 450, 265);
                }
            }
        }

    }
}