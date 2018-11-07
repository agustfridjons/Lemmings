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



Grid.prototype.createGrid = function(){

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


Grid.prototype.render = function(ctx){
    var cob = new Image();
    var back = new Image();
    back.src = "https://notendur.hi.is/~fth29/Kalli//BackgroundImg/sprite_Background0.png";
    cob.src = "https://notendur.hi.is/~fth29/Kalli//BackgroundImg/background.png";

    for (var i = 0; i < this.colLength; i++) {
        for (var j = 0; j < this.rowLength; j++) {
            if (this.currentLevel[i][j] === 1) {
                ctx.drawImage(cob, this.position[i][j].cx - this.halfWidth,
                             this.position[i][j].cy - this.halfHeight,
                              this.halfWidth*2, this.halfHeight*2);
            } else {
                ctx.drawImage(back, this.position[i][j].cx - this.halfWidth,
                            this.position[i][j].cy - this.halfHeight,
                            this.halfWidth*2, this.halfHeight*2);
            }
        }
    }
};

Grid.prototype.findNearestBlocks = function(xPos, yPos){
    
};

Grid.prototype.isColliding = function(xPos, yPos, radius, velX, velY) {
    
};

