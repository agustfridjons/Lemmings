//---------
// MENU
//---------
 
/*function Menu(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    } 
}
*/
var menu = {
    currentLevel : 1,
    buttonW : 200,
    buttonH : 50,
    currentS : 0,
    currentC : 0,
    renderContr: false,
    mpress: false
};

    menu.nextLevel = function(){
        this.currentLevel++;
    };

    menu.levelString = function(){
        return "Level " + this.currentLevel;
    };

    menu.update = function(du){

        this.currentS = 0;
        this.currentC = 2;
        //if mouse is hovering a button changes sprites
        if(menu.mouseOnButton(200,150,this.buttonW,this.buttonH)){
            this.currentS++;
        }
        if(menu.mouseOnButton(200,250,this.buttonW,this.buttonH)){
            this.currentC++;
        }

        //react if buttons are clicked
        if(menu.mouseOnButton(200,150,this.buttonW,this.buttonH) 
           && this.mpress){
            setGamestate(1);
            this.mpress = false;
        }
        if(menu.mouseOnButton(200,250,this.buttonW,this.buttonH) 
           && this.mpress){
            this.renderContr = true;
            this.mpress = false;
        }
    };

    menu.render = function(ctx){
        util.clearCanvas(ctx);
        if(this.renderContr){
            menu.renderControls(ctx);
            return;
        }
        util.fillBox(ctx, 0, 0, ctx.canvas.width, 
                     ctx.canvas.height,"#704F5F");
        util.drawText(ctx, '26px Fipps',"#E",this.levelString(),
                      ctx.canvas.width/2 - 75, 100);
        ctx.drawImage(menu.getImage(this.currentS), 200, 150);
        ctx.drawImage(menu.getImage(this.currentC), 200, 250);                           
    };

    menu.renderControls = function(ctx){
        util.fillBox(ctx, 0, 0, ctx.canvas.width, 
                     ctx.canvas.height,"#704F5F");
        util.drawText(ctx, '26px Fipps',"#E",getText(0),
                     ctx.canvas.width/2 - 75, 100);
        util.drawText(ctx, '13px Fipps',"#E",getText(1),
                     ctx.canvas.width/2 - 75, 150);
    };

    menu.mousePress = function(button){
        this.mpress = button;
    };

    menu.getText = function(index){
        var texts = ["CONTROLS",
                     "Use number keys 1 - 5 to select elements to put on the map."];
        return texts[index];
    }

    menu.getImage = function(index){
        var images = [g_images.button0,g_images.button1,
                      g_images.button2,g_images.button3];
        return images[index];
    };

    menu.mouseOnButton = function(x, y, w, h){
        if(x < g_mouseX 
        && g_mouseX < x + w
        && y < g_mouseY
        && g_mouseY < y + h){
            return true;
        }
        return false;
    };