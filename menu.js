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
    levelUnlocked: 4,
    buttonHalfW : 100,
    buttonHalfH : 25,
    currentS : 0,
    currentC : 0,
    currentCl : 0,
    renderContr : false,
    mpress: false,
    cColumnX1: 20,
    cColumnX2: 300,
    buttonMargin: 50,
    margin: 30
};

    menu.nextLevel = function(){
        if(this.currentLevel === this.levelUnlocked){
            this.levelUnlocked++;
            this.currentLevel = this.levelUnlocked;
        }
    };

    menu.changeLevel = function(level){
        if((this.currentLevel + level) < 1 || 
           (this.currentLevel + level) > this.levelUnlocked){
            return;
        }else{
            this.currentLevel += level;
            console.log("changelevel");
        }
    }

    menu.levelString = function(){
        return "Level " + this.currentLevel;
    };

    menu.update = function(du){

        g_menuSong.fadeIN();

        this.currentS = 0;
        this.currentC = 2;
        this.currentCl = 4;

        //Arrow buttons handeling
        if(menu.mouseOnButton(370, 75, 30, 20) && this.mpress){
            menu.changeLevel(-1);
            this.mpress = false;
        }
        if(menu.mouseOnButton(390, 75, 30, 20) && this.mpress){
            menu.changeLevel(1);
            this.mpress = false;
        } 

        //if mouse is hovering a button changes sprites
        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height/2 - 50,
                              this.buttonHalfW*2,this.buttonHalfH*2)){
            this.currentS++;
        }
        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height/2 + 50,
                              this.buttonHalfW*2,this.buttonHalfH*2)){
            this.currentC++;
        }
        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 70,
                              this.buttonHalfW*2,this.buttonHalfH*2)){
            this.currentCl++;
        }

        //react if buttons are clicked
        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height/2 - 50,
                               this.buttonHalfW*2,this.buttonHalfH*2) && this.mpress && !this.renderContr){
            entityManager.init(this.currentLevel);
            setGamestate(1);
            this.mpress = false;
        }
        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height/2 + 50,
                              this.buttonHalfW*2,this.buttonHalfH*2) && this.mpress && !this.renderContr){
            this.renderContr = true;
            this.mpress = false;
        }
        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 70,
                              this.buttonHalfW*2,this.buttonHalfH*2) 
                              && this.mpress && this.renderContr){
            this.renderContr = false;
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
        util.fillTriangle(ctx, 380, 85, "#8e1212");
        util.fillreverseTriangle(ctx, 410, 85, "#8e1212");
        util.drawText(ctx, '26px Fipps',"#10021A",this.levelString(),
                      ctx.canvas.width/2 - 100, 100);
        ctx.drawImage(menu.getImage(this.currentS), g_canvas.width/2 - this.buttonHalfW, g_canvas.height/2 - 50);
        ctx.drawImage(menu.getImage(this.currentC), g_canvas.width/2 - this.buttonHalfW, g_canvas.height/2 + 50);                           
    };

    menu.renderControls = function(ctx){
        util.fillBox(ctx, 0, 0, ctx.canvas.width, 
                     ctx.canvas.height,"#704F5F");
        util.drawText(ctx, '26px Fipps',"#10021A",menu.getText(0),
                     ctx.canvas.width/2 - 100, 50);
        util.drawText(ctx, '13px Fipps',"#10021A",menu.getText(1),
                     this.cColumnX1, 75);
        util.drawText(ctx, '13px Fipps',"#10021A",menu.getText(2),
                     this.cColumnX1, 95);
        var posY = 100;
        for(var i = 3; i < 9; i++){
            posY += this.margin; 
            util.drawText(ctx, '13px Fipps',"#10021A",menu.getText(i),
                          this.cColumnX1, posY);

        }
        posY = 80;
        for(var i = 6; i <= 11; i++){
            posY += this.margin;
            ctx.drawImage(menu.getImage(i),this.cColumnX2,posY);
        }
        ctx.drawImage(menu.getImage(this.currentCl), g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 70);

    };

    menu.mousePress = function(button){
        this.mpress = button;
    };

    menu.getText = function(index){
        var texts = ["CONTROLS",
                    "Use number keys 1 - 7 to select elements",
                    "to put on the map.",
                    "1 Key: Solid block",
                    "2 Key: Low jump",
                    "3 Key: High jump",
                    "4 Key: Right side jump",
                    "5 Key: Left side jump",
                    "6 Key: Gun"];
        return texts[index];
    }

    menu.getImage = function(index){
        var images =[g_images.button0,g_images.button1,
                    g_images.button2,g_images.button3,
                    g_images.button5,g_images.button4,
                    g_images.blockIMG,g_images.smalljump1,
                    g_images.jump1,g_images.right1,
                    g_images.side1,g_images.gun1];
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