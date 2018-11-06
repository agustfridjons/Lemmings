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
    for(var i = this.halfHeight; i < height; i+=this.halfHeight*2){
        for(var j = this.halfWidth; j < width; j+=this.halfWidth*2){
            this.blocks.push([i,j,0]);
            console.log(i,j);
        }
    }
};

Grid.prototype.level1 = function(){
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
    for(var i = 137; i < 157; i+=10){
        this.blocks[i][2] = 1;
    }
    for(var i = 9; i < 150; i+=10){
        if(i !== 49 && i !== 109){
            this.blocks[i][2] = 1;
        }
    }
    this.makeFire(this.blocks[49][0],this.blocks[49][1],49);
    this.makeFire(this.blocks[109][0],this.blocks[109][1],109);
};
Grid.prototype.makeFire = function(x,y,index){
    this.blocks[index][2] = 2;
    entityManager.generateFire({
        cx  :   x,
        cy  :   y
    });
};

    

Grid.prototype.render = function(ctx){
    var cob = new Image();
    var back = new Image();
    back.src = "/BackgroundImg/sprite_Background0.png";
    cob.src = "/BackgroundImg/background.png"
    for(var i = 0; i < this.blocks.length; i++){
        var Boi = this.blocks[i];
        if(Boi[2]===1){
            ctx.drawImage(cob,Boi[0]-20,Boi[1]-20,40,40);
        } else if(Boi[2] === 2){
            ctx.fillStyle = "orange";
            ctx.globalAlpha = 0.3;
            ctx.fillRect(Boi[0]-20,Boi[1]-20,this.halfWidth*2,this.halfHeight*2);
            ctx.globalAlpha = 1;
        } else {
            ctx.drawImage(back,Boi[0]-20,Boi[1]-20,40,40);
        }
    }
};

Grid.prototype.update = function(du){
    
};

Grid.prototype.returnFireIndex = function(){
    var fires = [];
    for(var i = 0; i < this.blocks.length; i++){
        if(this.blocks[i][2] === 2){
            fires.push(i);
        }
    }
    return fires;
}


Grid.prototype.findNearestBlock = function(xPos, yPos){
    for(var i = 0; i < this.blocks.length; i++){
        var Boi = this.blocks[i];
        if(Boi[0] + this.halfWidth > xPos 
            && Boi[0] - this.halfWidth < xPos
            && Boi[1] + this.halfHeight > yPos
            && Boi[1] - this.halfHeight < yPos){
                return i;
        }
    }
};

Grid.prototype.findAdBlocks = function(xPos,yPos){
    var i = this.findNearestBlock(xPos,yPos);
    var types = [this.blocks[i-1][2],
                this.blocks[i+9][2],
                this.blocks[i+10][2],
                this.blocks[i+11][2],
                this.blocks[i+1][2],
                this.blocks[i-9][2],
                this.blocks[i-10][2],
                this.blocks[i-11][2],
                ];
    return types;
}
