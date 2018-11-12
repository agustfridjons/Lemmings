//---------
// MENU
//---------
 
/*function Menu(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    } 
}
*/
function Menu(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = this.sprite || g_sprites.button1;
};

Menu.prototype = new Entity();

Menu.prototype.currentLevel = 1;

Menu.prototype.KEY_MENU  = 'M'.charCodeAt(0);
Menu.prototype.doMenu = false;

Menu.prototype.buttonW = 200;
Menu.prototype.buttonH = 50;
Menu.prototype.imageS = 0;
Menu.prototype.imageC = 0;

Menu.prototype.nextLevel = function(){
    this.currentLevel++;
};

Menu.prototype.levelString = function(){
    return "Level " + this.currentLevel;
};

Menu.prototype.update = function(du){
    this.imageS = 0;
    this.imageC = 2;
    //if mouse is hovering a button changes sprites
    if(this.mouseOnButton(200,150,this.buttonW,this.buttonH)){
        this.imageS++;
    }if(this.mouseOnButton(200,250,this.buttonW,this.buttonH)){
        this.imageC++;
    }

    if(eatKey(this.KEY_MENU)){
        this.doMenu = !this.doMenu;
    }
};

Menu.prototype.render = function(ctx){
    if(!this.doMenu) return;
    console.log("menu");
    util.fillBox(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height,"#704F5F");
    util.drawText(ctx, '700 25px Arial',"#E2E2E2",
                  this.levelString(), ctx.canvas.width/2 - 100, 100);
    this.sprite.drawAt(ctx, 200, 150, this.imageS);
    this.sprite.drawAt(ctx, 200, 250, this.imageC);                           
};

Menu.prototype.buttonPress = function(press){
    return press;
};

Menu.prototype.mouseOnButton = function(x, y, w, h){
    if(x < g_mouseX 
       && g_mouseX < x + w
       && y < g_mouseY
       && g_mouseY < y + h){
        return true;
       }
    return false;
};