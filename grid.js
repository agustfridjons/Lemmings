//Grid
function Grid(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Grid.prototype.halfWidth = 20;
Grid.prototype.halfHeight = 20;

Grid.prototype.createGrid = function(width,height){
    var blocks = []
    for(var i = this.halfHeight; i < height; i+=this.halfHeight*2){
        for(var j = this.halfWidth; j < width; j+=this.halfWidth*2){
            blocks.push([i,j,false]);
        }
    }
    return blocks;
};

Grid.prototype.render = function(ctx,blocks){
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    for(var i = 0; i < blocks.length; i++){
        var Boi = blocks[i];
        if(Boi[2]){
            ctx.fillRect(Boi[0]-20,Boi[1]-20,this.halfWidth*2,this.halfHeight*2);
        } else {
        }
    }
};


Grid.prototype.findNearestBlock = function(xPos, yPos){
    for(var i = 0; i < blocks.length; i++){
        var Boi = blocks[i];
        if(Boi[0] + this.halfWidth > xPos 
            && Boi[0] - this.halfWidth < xPos
            && Boi[1] + this.halfHeight > yPos
            && Boi[1] - this.halfHeight < yPos){
                return i;
        }
    }
};
