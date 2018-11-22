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
    menuState : 0,
    levelUnlocked: 10,
    finalLevel:  10,    
    buttonHalfW : 100,
    buttonHalfH : 25,
    currentS : 0,
    currentC : 0,
    currentCl : 0,
    renderContr : false,
    mpress: false,
    cColumnX1: 20,
    cColumnX2: 300,
    cColumnX3: 330,
    buttonMargin: 50,
    margin: 30,
    results: {}
};

    menu.nextLevel = function(){
        if (this.currentLevel === this.finalLevel){
            this.menuState = 3;
        } else if(this.levelUnlocked === this.currentLevel) {
            this.levelUnlocked++;
            this.currentLevel = this.levelUnlocked;
            this.menuState = 1;
        }
    };

    menu.notnextLevel = function() {
        this.menuState = 2;
    };

    menu.changeLevel = function(level){
        if((this.currentLevel + level) < 1 || 
           (this.currentLevel + level) > this.levelUnlocked){
            return;
        }else{
            this.currentLevel += level;
        }
    };

    menu.setResults = function(saved, total) {
        this.results = {
            saved : saved,
            total  : total
        }
    };

    menu.getCurrentLevel = function() {
        return this.currentLevel;
    };

    menu.levelString = function(){
        return "Level " + this.currentLevel;
    };

    menu.update = function(du){
        if (this.menuState === 0) {
            this.update1(du);
        } else {
            this.update2(du);
        }
    };

    menu.update1 = function(du) {
        g_menuSong.fadeIN();

        this.currentS = 0;
        this.currentC = 2;
        this.currentCl = 4;

        //Arrow buttons handeling
        if(menu.mouseOnButton(370, 75, 30, 20) && this.mpress){
            this.mpress = false;
            menu.changeLevel(-1);
        }
        if(menu.mouseOnButton(390, 75, 30, 20) && this.mpress){
            this.mpress = false;
            menu.changeLevel(1);
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

    menu.update2 = function(du) {
        // keyrist þegar leikmaður vinnur
        this.currentCl = 4;

        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 160,
            this.buttonHalfW*2,this.buttonHalfH*2)){
            this.currentCl++;
        }

        if(menu.mouseOnButton(g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 160,
            this.buttonHalfW*2,this.buttonHalfH*2) && this.mpress){
            this.menuState = 0;
            this.mpress = false;
        }
    };

    menu.render = function(ctx){
        if (this.menuState === 0) {
            this.render1(ctx);
        } else if (this.menuState === 1) {
            this.render2(ctx);
        } else if (this.menuState === 2) {
            this.render3(ctx);
        } else if (this.menuState === 3) {
            this.render4(ctx);
        }
    };

    menu.render1 = function(ctx) {
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

    menu.render2 = function(ctx) {
        // keyrist þegar leikmaður vinnur

        util.clearCanvas(ctx);
        util.fillBox(ctx, 0, 0, ctx.canvas.width, 
            ctx.canvas.height,"#080f21");
            
        util.fillBox(ctx, 0, 60-5,ctx.canvas.width, 
            (ctx.canvas.height / 4) + 10,"#4c7264");

        util.fillBox(ctx, 0, 60, ctx.canvas.width, 
            ctx.canvas.height / 4,"#aa1e70");

        
        var win1 = "Congratulations!";
        var win2 = "You have unlocked level " + this.currentLevel + "!";
        
        util.drawText(ctx, '30px Georgia',"#10021A", win1 ,
        ctx.canvas.width/2 - 120, 100);

        util.drawText(ctx, '30px Georgia',"#10021A", win2 ,
        ctx.canvas.width/2 - 170, 140);

        ctx.drawImage(menu.getImage(this.currentCl), g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 160);
    };

    menu.render3 = function(ctx) {
        // keyrist þegar leikmaður tapar

        util.clearCanvas(ctx);
        util.fillBox(ctx, 0, 0, ctx.canvas.width, 
            ctx.canvas.height,"#080f21");
            
        util.fillBox(ctx, 0, 60-5,ctx.canvas.width, 
            (ctx.canvas.height / 4) + 10,"#4c7264");

        util.fillBox(ctx, 0, 60, ctx.canvas.width, 
            ctx.canvas.height / 4,"#aa1e70");

        
        var win1 = "Lemmings saved: " + this.results.saved + "/" + this.results.total;
        var win2 = "Press Close and try again!";
        
        util.drawText(ctx, '30px Georgia',"#10021A", win1 ,
        ctx.canvas.width/2 - 140, 100);

        util.drawText(ctx, '30px Georgia',"#10021A", win2 ,
        ctx.canvas.width/2 - 170, 140);

        ctx.drawImage(menu.getImage(this.currentCl), g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 160);
    };

    menu.render4 = function(ctx) {
        // keyrist þegar leikmaður tapar

        util.clearCanvas(ctx);
        util.fillBox(ctx, 0, 0, ctx.canvas.width, 
            ctx.canvas.height,"#080f21");
            
        util.fillBox(ctx, 0, 60-5,ctx.canvas.width, 
            (ctx.canvas.height / 4) + 10,"#4c7264");

        util.fillBox(ctx, 0, 60, ctx.canvas.width, 
            ctx.canvas.height / 4,"#aa1e70");

        
        var win1 = "Congratulations!";
        var win2 = "You beat the game!";
        
        util.drawText(ctx, '30px Georgia',"#10021A", win1 ,
        ctx.canvas.width/2 - 110, 100);

        util.drawText(ctx, '30px Georgia',"#10021A", win2 ,
        ctx.canvas.width/2 - 130, 140);

        ctx.drawImage(menu.getImage(this.currentCl), g_canvas.width/2 - this.buttonHalfW, g_canvas.height - 160);
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

        util.drawText(ctx, '13px Fipps',"#10021A",menu.getText(9),
                      this.cColumnX3, posY);
        util.drawText(ctx, '13px Fipps',"#10021A",menu.getText(10),
                      this.cColumnX3, posY + this.margin);

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
                    "6 Key: Gun",
                    "Tip!: Gun shoots a lazer",
                    "that breaks solid blocks."];
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