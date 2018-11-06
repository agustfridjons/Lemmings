//---------
// MENU
//---------
 
function Menu(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    } 
}

Menu.prototype.currentLevel = 1;
Menu.prototype.KEY_MENU  = 'M'.charCodeAt(0);
Menu.prototype.showMenu = false;

Menu.prototype.sprite = g_sprites.button;
Menu.prototype.buttonW = 200;
Menu.prototype.buttonH = 50;
Menu.prototype.button1 = 0; 
Menu.prototype.button2 = 2;



Menu.prototype.nextLevel = function(){
    this.currentLevel++;
};

Menu.prototype.levelString = function(){
    return "Level " + this.currentLevel;
};

Menu.prototype.update = function(){
    console.log("update");
    //if mouse is hovering a button change sprites
    if(this.mouseOnButton(200,150,this.buttonW,this.buttonH)){
        this.button1 = 1; 
    }else{
        this.button1 = 0;
    }
    if(this.mouseOnButton(200,250,this.buttonW,this.buttonH)){
        this.button1 = 3; 
    }else{
        this.button1 = 2;
    }

    if(eatKey(this.KEY_MENU)){
        console.log("show");
        this.showMenu = !this.showMenu;
    }
};

Menu.prototype.render = function(ctx){
    //if(!this.showMenu) return;
    util.fillBox(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height,"#704F5F");
    util.drawText(ctx, '700 25px Arial',"#E2E2E2",
                  this.levelString(), ctx.canvas.width/2 - 100, 100);
    this.sprite.drawCenteredAt(ctx, 200+this.buttonW/2,
                               150+this.buttonH/2,this.button1);
    this.sprite.drawCenteredAt(ctx, 200+this.buttonW/2,
                                250+this.buttonH/2,this.button2);                           
};

Menu.prototype.buttonPress = function(press){
    return press;
};

Menu.prototype.mouseOnButton = function(x, y, w, h){
    if(x < g_mouseX 
       && mouseX < x + w
       && y < g_mouseY
       && g_mousey < y + h){
        return true;
       }
    return false;
};