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
Menu.prototype.buttonStart = [g_images.button0,g_images.button1]; 
Menu.prototype.buttonContr = [g_images.button2,g_images.button3];
Menu.prototype.imageS = 0;
Menu.prototype.imageC = 0;

Menu.prototype.nextLevel = function(){
    this.currentLevel++;
};

Menu.prototype.levelString = function(){
    return "Level " + this.currentLevel;
};

Menu.prototype.update = function(du){
    console.log("update");
    //if mouse is hovering a button changes sprites
    this.imageS = this.mouseOnButton(200,150,this.buttonW,this.buttonH);
    this.imageC = this.mouseOnButton(200,250,this.buttonW,this.buttonH);
    

    if(eatKey(this.KEY_MENU)){
        console.log("show");
        this.showMenu = !this.showMenu;
    }
};

Menu.prototype.render = function(ctx){
    if(!this.showMenu) return;
    util.fillBox(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height,"#704F5F");
    util.drawText(ctx, '700 25px Arial',"#E2E2E2",
                  this.levelString(), ctx.canvas.width/2 - 100, 100);
    ctx.drawImage(this.buttonStart[this.imageS], 200, 150);
    ctx.drawImage(this.buttonContr[this.imageC], 200, 250);                           
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