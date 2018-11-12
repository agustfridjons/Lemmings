//Grid
function Grid(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Grid.prototype.halfWidth = 20;
Grid.prototype.halfHeight = 20;
Grid.prototype.rowLength = 17;
Grid.prototype.colLength = 12;
Grid.prototype.blocks = [];
Grid.prototype.hardBlocks = [];
Grid.prototype.position = [];
Grid.prototype.currentLevel = [];
Grid.prototype.choice = 0;

Grid.prototype.background = new Image();
Grid.prototype.blockIMG = new Image();

Grid.prototype.numberOfLemmings = 0;
Grid.prototype.maxLemmings = 0;

Grid.prototype.time = 0;



Grid.prototype.createGrid = function(){

    this.background.src = "https://notendur.hi.is/~fth29/Kalli/Forest.png";
    this.blockIMG.src = "https://notendur.hi.is/~fth29/Kalli//BackgroundImg/background.png";

    this.position = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

    var x = -this.halfWidth;
    var y = -this.halfHeight;
    for (var i = 0; i < this.colLength; i++) {
        for (var j = 0; j < this.rowLength; j++) {
            this.position[i][j] = {
                cx : x,
                cy : y
            };
            x += (this.halfWidth*2);
        }
        y += (this.halfHeight*2);
        x = -this.halfWidth;
    }
};

Grid.prototype.level1 = function(){
    this.maxLemmings = 5;
    this.currentLevel = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,1,1,5,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,1,0,2,5,0,0,5,0,0,0,1],
                         [1,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,1,0,6,2,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
                         [1,0,0,0,0,0,0,5,0,0,0,0,0,5,0,0,1],
                         [1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1],
                         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    for (var i = 0; i < this.colLength; i++) {
        for (var j = 0; j < this.rowLength; j++) {
            if (this.currentLevel[i][j] === 2) {
                this.makeFire(this.position[i][j]);
            } else if (this.currentLevel[i][j] === 3) {
                this.makeWater(this.position[i][j]);
            } else if (this.currentLevel[i][j] === 4) {
                this.makeDoor(this.position[i][j]);
            } else if (this.currentLevel[i][j] === 5) {
                this.makeJump(this.position[i][j]);
            } else if (this.currentLevel[i][j] === 6) {
                this.makeLeftJump(this.position[i][j]);
            } else if (this.currentLevel[i][j] === 7) {
                this.makeRightJump(this.position[i][j]);
            }
        }
    }
    entityManager.jumpsLeft = 9;
    entityManager.blocksLeft = 3;
    entityManager.leftLeft = 3;
    entityManager.rightLeft = 4;
};
Grid.prototype.makeFire = function(pos){
    entityManager.generateFire({
        cx  :   pos.cx,
        cy  :   pos.cy
    });
};

Grid.prototype.makeWater = function(pos){
    entityManager.generateWater({
        cx  :   pos.cx,
        cy  :   pos.cy
    });
};

Grid.prototype.makeDoor = function(pos){
    entityManager.generateDoor({
        cx  :   pos.cx,
        cy  :   pos.cy
    });
};

Grid.prototype.makeJump = function(pos){
    entityManager.generateJump({
        cx  :   pos.cx,
        cy  :   pos.cy
    });
};

Grid.prototype.makeLeftJump = function(pos){
    entityManager.generateLeftJump({
        cx  :   pos.cx,
        cy  :   pos.cy
    });
};

Grid.prototype.makeRightJump = function(pos){
    entityManager.generateRightJump({
        cx  :   pos.cx,
        cy  :   pos.cy
    });
};

Grid.prototype.isAllowed = function(x,y){
    if(this.currentLevel[y][x] === 0 && this.currentLevel[y+1][x] === 1){
        return true;
    } else{
        return false;
    }
};
Grid.prototype.changeChoice = function(choice){
    this.choice = choice;
};

Grid.prototype.changeBlock = function(x,y){
    var realx = this.findCurrentBlock(x,y).x;
    var realy = this.findCurrentBlock(x,y).y;
    if(this.isAllowed(realx,realy)){
        if(this.choice === 1 && entityManager.blocksLeft !== 0){
            this.currentLevel[realy][realx] = 1;
            entityManager.blocksLeft--;
        } else if(this.choice === 2 && entityManager.jumpsLeft !== 0){
            this.currentLevel[realy][realx] = 5;
            this.makeJump(this.position[realy][realx]);
            entityManager.jumpsLeft--;
        } else if(this.choice === 3 && entityManager.leftLeft !== 0){
            this.currentLevel[realy][realx] = 6;
            this.makeLeftJump(this.position[realy][realx]);
            entityManager.leftLeft--;
        } else if(this.choice === 4 && entityManager.rightLeft !== 0){
            this.currentLevel[realy][realx] = 7;
            this.makeRightJump(this.position[realy][realx]);
            entityManager.rightLeft--;
        } 
    }
};

Grid.prototype.getBottomBlockID = function(cx, cy) {
    var currentBlockPos = this.findCurrentBlock(cx, cy);
    return [this.currentLevel[currentBlockPos.y + 1][currentBlockPos.x],
            this.currentLevel[currentBlockPos.y][currentBlockPos.x]];
};

Grid.prototype.print = function(){
    //console.log(this.maxLemmings,this.numberOfLemmings);
};

Grid.prototype.update = function(du) {
    //console.log(this.numberOfLemmings,this.maxLemmings);
    if(this.numberOfLemmings < this.maxLemmings 
        && this.time % 25 === 0
        && this.time > 25){
        entityManager.generateLemming({
            cx : 20,
            cy : 348,
            velX : 1.5
        });
        this.numberOfLemmings++;
    }
    this.time++;
};


Grid.prototype.render = function(ctx){

    ctx.drawImage(this.background,0,0,610,400);

    for (var i = 0; i < this.colLength; i++) {
        for (var j = 0; j < this.rowLength; j++) {
            if (this.currentLevel[i][j] === 1) {
                ctx.drawImage(this.blockIMG, this.position[i][j].cx - this.halfWidth,
                             this.position[i][j].cy - this.halfHeight,
                              this.halfWidth*2, this.halfHeight*2);
            } else {
                //ctx.drawImage(this.background, this.position[i][j].cx - this.halfWidth,
                  //          this.position[i][j].cy - this.halfHeight,
                    //        this.halfWidth*2, this.halfHeight*2);
            }
        }
    }
   
};


Grid.prototype.findCurrentBlock = function(xPos, yPos){
    var realX = Math.round((xPos+this.halfWidth)/(this.halfWidth*2));
    var realY = Math.round((yPos+this.halfHeight)/(this.halfHeight*2));
    
    return {
        x : realX,
        y : realY
    };
};

// Returns an array of adjecent blocks
// Example: [[left top, middle top,right top], 
//           left,middle,right],
//           [left bottom,middle bottom, right bottom]]
Grid.prototype.findAdjacentBlocks = function(xPos,yPos){
    var curr = this.findCurrentBlock(xPos,yPos);
    var topL = this.position[curr.y -1][curr.x-1];
    var topM = this.position[curr.y -1][curr.x];
    var topR = this.position[curr.y -1][curr.x+1];
    var midL = this.position[curr.y][curr.x-1];
    var midM = this.position[curr.y][curr.x];
    var midR = this.position[curr.y][curr.x+1];
    var botL = this.position[curr.y + 1][curr.x-1];
    var botM = this.position[curr.y + 1][curr.x];
    var botR = this.position[curr.y + 1][curr.x+1]
    return [[topL,topM,topR],
            [midL,midM,midR],
            [botL,botM,botR]];
};

Grid.prototype.collidesVertical = function(prevX, prevY, nextX, nextY, r, vel) {
    var adBlocks = this.findAdjacentBlocks(prevX, prevY);
    
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var blockPos = this.findCurrentBlock(adBlocks[i][j].cx, adBlocks[i][j].cy);
            var type = this.currentLevel[blockPos.y][blockPos.x];

            if (type === 1) {
                var blockEdge = adBlocks[i][j].cy;
                
                // Check which direction the lemming is going
                // to decide which brick side to check
                if (vel) {
                    blockEdge += this.halfHeight;
                } else {
                    blockEdge -= this.halfHeight;
                }
                
                
                // Check Y coords
                if ((nextY - r < blockEdge && prevY - r >= blockEdge) ||
                (nextY + r > blockEdge && prevY + r <= blockEdge)) {
                    // Check X coords
                    if (nextX + r >= adBlocks[i][j].cx - this.halfWidth &&
                        nextX - r <= adBlocks[i][j].cx + this.halfWidth) {
                            // It's a hit!
                            return true;
                        }
                    }
            }
        }
    }
        // It's a miss!
        return false;

};

Grid.prototype.collidesHorizontal = function(prevX, prevY, nextX, nextY, r, vel) {
    var adBlocks = this.findAdjacentBlocks(prevX, prevY);
    
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {

            var blockPos = this.findCurrentBlock(adBlocks[i][j].cx, adBlocks[i][j].cy);
            var type = this.currentLevel[blockPos.y][blockPos.x];

            if (type === 1) {
                var blockEdge = adBlocks[i][j].cx;
                
                // Check which direction the lemming is going
                // to decide which block side to check
                if (vel) {
                    blockEdge += this.halfHeight;
                } else {
                    blockEdge -= this.halfHeight;
                }
                
                // Check X coords
                if ((nextX - r < blockEdge && prevX - r >= blockEdge) ||
                (nextX + r > blockEdge && prevX + r <= blockEdge)) {
                    // Check Y coords
                    if (nextY + r >= adBlocks[i][j].cy - this.halfWidth &&
                        nextY - r <= adBlocks[i][j].cy + this.halfWidth) {
                            // It's a hit!
                            return true;
                        }
                    }
            }
        }
    }
        // It's a miss!
        return false;
};