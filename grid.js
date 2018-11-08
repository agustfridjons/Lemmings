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
Grid.prototype.isChosen = false;
Grid.prototype.background = new Image();
Grid.prototype.blockIMG = new Image();



Grid.prototype.createGrid = function(){

    this.background.src = "https://notendur.hi.is/~fth29/Kalli//BackgroundImg/sprite_Background0.png";
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


    this.currentLevel = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,1],
                         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
                         [1,4,0,0,0,0,0,5,0,7,0,0,0,5,0,0,1],
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

Grid.prototype.changeBlock = function(x,y){
    var realx = this.findCurrentBlock(x,y).x;
    var realy = this.findCurrentBlock(x,y).y;
    if(this.isAllowed(realx,realy)){
        if(this.choice === 1){
            this.currentLevel[realy][realx] = 1;
            console.log("HAlló");
        } else if(this.choice === 2){
            this.currentLevel[realy][realx] = 5;
            this.makeJump(this.position[realy][realx]);
        }
    }
};


Grid.prototype.render = function(ctx){


    for (var i = 0; i < this.colLength; i++) {
        for (var j = 0; j < this.rowLength; j++) {
            if (this.currentLevel[i][j] === 1) {
                ctx.drawImage(this.blockIMG, this.position[i][j].cx - this.halfWidth,
                             this.position[i][j].cy - this.halfHeight,
                              this.halfWidth*2, this.halfHeight*2);
            } else {
                ctx.drawImage(this.background, this.position[i][j].cx - this.halfWidth,
                            this.position[i][j].cy - this.halfHeight,
                            this.halfWidth*2, this.halfHeight*2);
            }
        }
    }
};

Grid.prototype.update = function(){
    
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
    var topL = this.currentLevel[curr.y -1][curr.x-1];
    var topM = this.currentLevel[curr.y -1][curr.x];
    var topR = this.currentLevel[curr.y -1][curr.x+1];
    var midL = this.currentLevel[curr.y][curr.x-1];
    var midM = this.currentLevel[curr.y][curr.x];
    var midR = this.currentLevel[curr.y][curr.x+1];
    var botL = this.currentLevel[curr.y + 1][curr.x-1];
    var botM = this.currentLevel[curr.y + 1][curr.x];
    var botR = this.currentLevel[curr.y + 1][curr.x+1]
    return [[topL,topM,topR],
            [midL,midM,midR],
            [botL,botM,botR]];
};

Grid.prototype.isColliding = function(xPos, yPos, radius, velX, velY) {
    
};

