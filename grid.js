//Grid
function Grid(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Grid.prototype.halfWidth = 20;
Grid.prototype.halfHeight = 20;
Grid.prototype.blocks = [];


Grid.prototype.createGrid = function(width,height){
    for(var i = -this.halfHeight; i <= height+this.halfHeight; i+=this.halfHeight*2){
        for(var j = -this.halfWidth; j <= width+this.halfWidth; j+=this.halfWidth*2){
            this.blocks.push([i,j,0]);
        }
    }
};

Grid.prototype.level1 = function(){
    for(var i = 0; i < 12; i++){
        this.blocks[i][2] = 1;
    }
    for(var i = 12; i <= 144; i += 12){
        this.blocks[i][2] = 1;
    }
    for(var i = 11; i <= 143; i += 12){
        this.blocks[i][2] = 1;
    }
    for(var i = 192; i < 204; i++){
        this.blocks[i][2] = 1;
    }
    for(var i = 22; i < 192; i+=12){
        this.blocks[i][2] = 1;
    }
    for(var i = 176; i <= 188; i +=12){
        this.blocks[i][2] = 1;
    }

    this.makeFire(187);
    this.makeWater(106);
    this.makeDoor(21);
    this.makeJump(165);
    this.makeJump(93);
    this.makeLeftJump(175);
    this.makeRightJump(117);

    /*for(var i = 0;i< 10; i++){
        this.blocks[i][2] = 1;
    }    
    for(var i = 140;i< 150; i++){
        this.blocks[i][2] = 1;
    }
    for(var i = 0; i < 140; i +=10){
        this.blocks[i][2] = 1;
    }
    for(var i = 1; i < 31; i+=10){
        this.blocks[i][2] = 1;
    }
    for(var i = 33; i < 63; i+=10){
        this.blocks[i][2]=1;
    }
    for(var i = 64; i < 94; i+=10){
        this.blocks[i][2]=1;
    }
    for(var i = 96; i < 126; i+=10){
        this.blocks[i][2]=1;
    }
    for(var i = 137; i < 147; i+=10){
        this.blocks[i][2] = 1;
    }
    for(var i = 9; i < 150; i+=10){
        this.blocks[i][2] = 1;
    }
    this.makeFire(this.blocks[48][0],this.blocks[48][1],48);
    this.makeFire(this.blocks[108][0],this.blocks[108][1],108);
    */
};
Grid.prototype.makeFire = function(index){
    this.blocks[index][2] = 2;
    entityManager.generateFire({
        cx  :   this.blocks[index][0],
        cy  :   this.blocks[index][1]
    });
};

Grid.prototype.makeWater = function(index){
    this.blocks[index][2] = 3;
    entityManager.generateWater({
        cx  :   this.blocks[index][0],
        cy  :   this.blocks[index][1]
    });
};

Grid.prototype.makeDoor = function(index){
    this.blocks[index][2] = 4;
    entityManager.generateDoor({
        cx  :   this.blocks[index][0],
        cy  :   this.blocks[index][1]
    });
};

Grid.prototype.makeJump = function(index){
    this.blocks[index][2] = 5;
    entityManager.generateJump({
        cx  :   this.blocks[index][0],
        cy  :   this.blocks[index][1]
    });
};


Grid.prototype.makeLeftJump = function(index){
    this.blocks[index][2] = 6;
    entityManager.generateLeftJump({
        cx  :   this.blocks[index][0],
        cy  :   this.blocks[index][1]
    });
};

Grid.prototype.makeRightJump = function(index){
    this.blocks[index][2] = 6;
    entityManager.generateRightJump({
        cx  :   this.blocks[index][0],
        cy  :   this.blocks[index][1]
    });
};

    

Grid.prototype.render = function(ctx){
    var cob = new Image();
    var back = new Image();
    back.src = "https://notendur.hi.is/~fth29/Kalli//BackgroundImg/sprite_Background0.png";
    cob.src = "https://notendur.hi.is/~fth29/Kalli//BackgroundImg/background.png"
    for(var i = 0; i < this.blocks.length; i++){
        var Boi = this.blocks[i];
        if(Boi[2]===1){
            ctx.drawImage(cob,Boi[0]-20,Boi[1]-20,40,40);
        }else {
            ctx.drawImage(back,Boi[0]-20,Boi[1]-20,40,40);
        }
    }
};

Grid.prototype.returnFireIndex = function(){
    var fires = [];
    for(var i = 0; i < this.blocks.length; i++){
        if(this.blocks[i][2] === 2){
            fires.push(i);
        }
    }
    return fires;
};


Grid.prototype.findNearestBlock = function(xPos, yPos){
    for(var i = 0; i < this.blocks.length; i++){
        var Boi = this.blocks[i];
        if(Boi[0] + this.halfWidth >= xPos 
            && Boi[0] - this.halfWidth <= xPos
            && Boi[1] + this.halfHeight >= yPos
            && Boi[1] - this.halfHeight <= yPos){
                return i;
        }
    }
};

Grid.prototype.findAdBlocks = function(xPos,yPos, radius){
    if (yPos + radius + this.halfHeight > g_canvas.height ||
        yPos - radius - this.halfHeight < 0) {
            return -1;
        }
    var i = this.findNearestBlock(xPos,yPos);


    var blockID = [this.blocks[i][2],      // middle
                   this.blocks[i-1][2],    // top middle
                   this.blocks[i+1][2],      // bottom middle
                   this.blocks[i+10][2],    //right
                   this.blocks[i-10][2]];   //left   
    
    var blockPosY = [this.blocks[i][0],  
                     this.blocks[i-1][0], 
                     this.blocks[i+1][0],
                     this.blocks[i+10][0]];

    var blockPosX = [this.blocks[i][1],  
                     this.blocks[i-1][1], 
                     this.blocks[i+1][1],
                     this.blocks[i+10][1]];

    return {
        blocks : blockID,
        posX: blockPosY,
        posY: blockPosX,
        blockWidth: this.halfWidth
    }
};
