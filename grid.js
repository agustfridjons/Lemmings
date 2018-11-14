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
Grid.prototype.solution = [];

Grid.prototype.deadLemmings = 0;
Grid.prototype.savedLemmings = 0;

Grid.prototype.totalLemmings = 0;
Grid.prototype.lemmingsInPlay = 0;

Grid.prototype.startingPos = {};

Grid.prototype.background = new Image();
Grid.prototype.blockIMG = new Image();


Grid.prototype.time = 0;

/*
0 = enginn kubbur
1 = kubbur
2 = eldur
3 = vatn
4 = hurð
5 = hopp
6 = vinstri hopp
7 = hægri hopp
8 = byssa
9 = lítið hopp
*/

Grid.prototype.createGrid = function(){

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
    this.background.src = "https://notendur.hi.is/~fth29/Kalli/Forest.png";
    this.startingPos = this.position[9][1];
    this.totalLemmings = 8;
    this.currentLevel = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
                         [1,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,1],
                         [1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1],
                         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    
    this.solution = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                     [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                     [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                     [1,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,1],
                     [1,0,0,0,1,1,1,9,0,0,0,0,0,0,0,0,1],
                     [1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1],
                     [1,0,0,0,0,0,0,0,0,0,0,0,0,6,0,2,1],
                     [1,0,0,0,0,0,0,0,0,0,0,9,0,1,1,1,1],
                     [1,0,0,0,0,0,9,0,0,0,9,1,0,0,0,0,1],
                     [1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1],
                     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    
    this.currentLevel = this.solution;

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
            } else if (this.currentLevel[i][j] === 8) {
                this.makeGun(this.position[i][j]);
            } else if(this.currentLevel[i][j] === 9){
                this.makeSmallJump(this.position[i][j]);
            }
        }
    }
    entityManager.jumpsLeft = 5;
    entityManager.blocksLeft = 3;
    entityManager.leftLeft = 2;
    entityManager.rightLeft = 2;
};

Grid.prototype.level2 = function(){
    this.background.src = "https://notendur.hi.is/~fth29/Kalli/Forest.png";
    this.startingPos = this.position[9][8];
    this.totalLemmings = 5;
    this.currentLevel = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
                         [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,2,0,0,1,1,1,1,1,1,1,0,0,2,0,1],
                         [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
                         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    this.solution = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                     [1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,1],
                     [1,0,0,0,0,9,0,1,1,1,0,9,0,0,0,0,1],
                     [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
                     [1,0,0,7,0,0,0,0,0,0,0,0,0,6,0,0,1],
                     [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
                     [1,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,1],
                     [1,0,2,0,0,1,1,1,1,1,1,1,0,0,2,0,1],
                     [1,0,1,7,0,0,0,0,0,0,0,0,0,6,1,0,1],
                     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    this.currentLevel = this.solution;

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
            } else if (this.currentLevel[i][j] === 8) {
                this.makeGun(this.position[i][j]);
            } else if(this.currentLevel[i][j] === 9){
                this.makeSmallJump(this.position[i][j]);
            }
        }
    }
    entityManager.jumpsLeft = 9;
    entityManager.blocksLeft = 3;
    entityManager.leftLeft = 3;
    entityManager.rightLeft = 4;
};

Grid.prototype.level3 = function() {
    this.background.src = "https://notendur.hi.is/~fth29/Kalli/Forest.png";
    this.startingPos = this.position[9][1];
    this.totalLemmings = 5;
    this.currentLevel = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                         [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
                         [1,4,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
                         [1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
                         [1,1,1,1,0,1,0,0,0,0,0,0,1,1,0,0,1],
                         [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
                         [1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1],
                         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    this.solution = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                     [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
                     [1,4,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
                     [1,1,0,1,1,1,1,1,1,1,1,1,9,0,0,0,1],
                     [1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
                     [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,6,1],
                     [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1],
                     [1,0,0,9,0,5,0,0,0,0,0,0,1,7,0,0,1],
                     [1,1,1,1,0,1,0,0,0,0,0,0,1,1,0,0,1],
                     [1,0,0,0,5,1,0,0,0,0,0,0,0,0,0,6,1],
                     [1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1],
                     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    this.currentLevel = this.solution;

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
            } else if (this.currentLevel[i][j] === 8) {
                this.makeGun(this.position[i][j]);
            } else if(this.currentLevel[i][j] === 9){
                this.makeSmallJump(this.position[i][j]);
            }
        }
    }
    entityManager.jumpsLeft = 9;
    entityManager.blocksLeft = 3;
    entityManager.leftLeft = 3;
    entityManager.rightLeft = 4;
};

Grid.prototype.removeLemming = function(dead) {
    if (dead) {
        this.deadLemmings++;
    } else {
        this.savedLemmings++;
    }
};

Grid.prototype.getResults = function() {
    if (this.totalLemmings === this.savedLemmings) {
        console.log("Congratulations! You saved them all!");
    } else {
        console.log("What the actual fuck, you couldnt save them all you piece of shit");
    }
    return this.totalLemmings === this.savedLemmings;

};

Grid.prototype.makeGun = function(pos){
    entityManager.generateGun({
        cx  :   pos.cx,
        cy  :   pos.cy
    });    
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

Grid.prototype.makeSmallJump = function(pos){
    entityManager.generateSmallJump({
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
        } else if(this.choice === 5){
            this.currentLevel[realy][realx] = 8;
            this.makeGun(this.position[realy][realx]);
        } else if(this.choice === 6){
            this.currentLevel[realy][realx] = 9;
            this.makeSmallJump(this.position[realy][realx]);
        }
    }
};

Grid.prototype.getBottomBlockID = function(cx, cy) {
    var currentBlockPos = this.findCurrentBlock(cx, cy);
    return [this.currentLevel[currentBlockPos.y + 1][currentBlockPos.x],
            this.currentLevel[currentBlockPos.y][currentBlockPos.x]];
};

Grid.prototype.print = function(){
};

Grid.prototype.update = function(du) {
    if(this.lemmingsInPlay < this.totalLemmings 
        && this.time % 25 === 0
        && this.time > 25){
        entityManager.generateLemming({
            cx : this.startingPos.cx,
            cy : this.startingPos.cy + 8,
            velX : 1.5
        });
        this.lemmingsInPlay++;
    }
    this.time++;

    if (this.totalLemmings === this.savedLemmings + this.deadLemmings) {
        var results = this.getResults();
        if (results) {
            menu.nextLevel();
        }
        gamestate = 0;
    }


};

Grid.prototype.reset = function() {
    this.deadLemmings = 0;
    this.savedLemmings = 0;
    this.lemmingsInPlay = 0;
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