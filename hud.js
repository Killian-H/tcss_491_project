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
        ctx.fillText(("🛡️ "+this.masterchief.armor), 850, 50);
        ctx.fillText(("➕ "+this.masterchief.health), 850, 110);
        //ctx.strokeText((this.masterchief.ammo+"ammo"), 1000, 500);



    }
}