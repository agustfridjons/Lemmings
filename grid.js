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
            this.blocks.push([i,j,false,0]);
        }
    }
};

Grid.prototype.level1 = function(){
    for(var i = 1; i < 31; i+=10){
        this.blocks[i][2] = true;
    }
    for(var i = 33; i < 63; i+=10){
        this.blocks[i][2]=true;
    }
    for(var i = 64; i < 94; i+=10){
        this.blocks[i][2]=true;
    }
    for(var i = 96; i < 126; i+=10){
        this.blocks[i][2]=true;
    }
    for(var i = 137; i < 157; i+=10){
        this.blocks[i][2] = true;
    }
    for(var i = 9; i < 150; i+=10){
        if(i !== 49 && i !== 109){
            this.blocks[i][2] = true;
        }
    }
};

Grid.prototype.render = function(ctx){
    for(var i = 0; i < this.blocks.length; i++){
        var Boi = this.blocks[i];
        if(Boi[2]){
            ctx.fillStyle = "pink";
            ctx.fillRect(Boi[0]-20,Boi[1]-20,this.halfWidth*2,this.halfHeight*2);
        } else {
            ctx.strokeStyle = "lightgray";
            ctx.strokeRect(Boi[0]-20,Boi[1]-20,this.halfWidth*2,this.halfHeight*2);
        }
    }
};


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
