class hud {


    constructor(game,x,y,masterchief) {
        Object.assign(this, {game, x, y, masterchief});
        this.masterchief = masterchief;
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {

    }

    draw(ctx) {
        //console.log("Hello");
        //ctx.font = 56 + 'px "Alegreya Sans"';
        ctx.fillStyle = "Black";
        ctx.strokeStyle = "Black";
        //ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Arial"';
        ctx.font = 'bold 48px serif';
        ctx.fillText((this.masterchief.ammo+"/"+this.masterchief.AMMO_DEFAULT), 25, 50);
        //ctx.fillText(("🛡️ "+this.masterchief.armor), 850, 50);
        //ctx.fillText(("➕ "+this.masterchief.health), 850, 110);
        var ratio = this.masterchief.health / this.masterchief.MAX_HEALTH;
        ctx.font = 'bold 24px serif';
        ctx.fillText(("➕"), 815, 105);
        ctx.fillStyle = "Red";
        ctx.fillRect(850, 75, 150*ratio, 40);
        var ratio2 = this.masterchief.armor / this.masterchief.MAX_ARMOR;
        ctx.fillText(("🛡️"), 820, 55);
        ctx.fillStyle = "Blue";
        ctx.fillRect(850, 25, 150*ratio2, 40);
        ctx.font = 'bold 48px serif';
        if (PARAMS.DEBUG == true) {
            ctx.fillStyle = "Black";
            ctx.strokeStyle = "Black";
            ctx.font = 'bold 48px serif';
            ctx.fillText(("🛡️ "+this.masterchief.armor), 850, 50);
            ctx.fillText(("➕ "+this.masterchief.health), 850, 110);
            var ratio3 = this.masterchief.ammo / this.masterchief.AMMO_DEFAULT;
            ctx.fillRect(50, 25, 150*ratio3, 40);
        }
        //ctx.strokeText((this.masterchief.ammo+"ammo"), 1000, 500);



    }
}