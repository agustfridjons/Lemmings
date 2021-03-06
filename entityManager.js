/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids".


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/

var entityManager = {

    // "PRIVATE" DATA

    _blocks   : [],
    _lemmings : [],
    _entities : [],
    _doors    : [],
    _portals  : [],
    mouseX    : 0,
    mouseY    : 0,
    sjumpLeft : 0,
    jumpsLeft : 0,
    rightLeft : 0,
    leftLeft  : 0,
    blocksLeft: 0,
    killALL   : false,
    gunsLeft  : 0,
    isChosen  : false,
    rotation  : false,
    portalSp  : true,
    grid      : Object,

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!
    //
    KILL_ME_NOW : -1,

    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
    //
    deferredSetup : function () {
        this._categories = [this._doors,this._lemmings,this._entities];
    },

    //all the entitie generators
    generateLemming : function(descr) {
        this._lemmings.push(new lemming(descr));
    },

    generateFire :  function(descr) {
        this._entities.push(new Fire(descr)); 
    },

    generateWater :  function(descr) {
        this._entities.push(new Water(descr)); 
    },

    generateDoor  : function(descr) {
        this._doors.push(new Door(descr));
    },

    generateGun : function(descr){
        this._entities.push(new Gun(descr));
    },

    generateJump   : function(descr){
        this._entities.push(new Jump(descr));
    },

    generateSmallJump   : function(descr){
        this._entities.push(new SmallJump(descr));
    },

    generateLeftJump : function(descr) {
        this._entities.push(new SideJump(descr));
    },

    generateRightJump : function(descr) {
        this._entities.push(new RightJump(descr));
    },

    generateBullet : function(descr){
        this._entities.push(new Bullet(descr));
    },

    generateBlockExplosion : function(descr){
        this._entities.push(new BlockExplosion(descr));
    },

    generatePortal : function(descr){
        this._portals.push(new Portal(descr));
    },
    

    //get information from the global array that tells players
    //how many guns/jumps are in each level
    getLevelInfo : function() {
        return {
            blocks     : this.blocksLeft,
            smalljumps : this.sjumpLeft,
            bigjumps   : this.jumpsLeft,
            rightjumps : this.rightLeft,
            leftjumps  : this.leftLeft,
            gunsleft   : this.gunsLeft
        }
    },

    changeMouse : function(x,y){
        this.mouseX = x;
        this.mouseY = y;
    },

    changeChoice : function(type){
        this.choice = type;
        this.grid.changeChoice(type);
        this.isChosen = true;
    },

    //split our entities into 3 
    clearCatagories: function() {
        this._doors = [];
        //entities holds all jumps/fires/guns/water
        this._entities = [];
        this._portals = [];
    },

    init: function(level) {
        this.resetStuff();  
        this.pickLevel(level);
    },

    resetStuff: function(){
        this.clearCatagories();
        canvas2.solutionGiven = false;
        this.generateGrid();
        this.isChosen = false;
        this.killALL = false;
        this.portalSp = true;
    },

    pickLevel: function(level){
        if (level === 1) {
            this.grid.level1();
        } else if (level === 2) {
            this.grid.level2();
        } else if (level === 3) {
            this.grid.level3();
        } else if (level === 4) {
            this.grid.level4();
        } else if (level === 5) {
            this.grid.level5();
        } else if (level === 6){
            this.grid.level6();
        } else if (level === 7){
            this.grid.level7();
        } else if (level === 8){
            this.grid.level8();
        } else if (level === 9){
            this.grid.level9();
        } else if (level === 10){
            this.grid.level10();
        }
    },


    generateGrid: function(){
        this.grid = new Grid();
        this.grid.createGrid();
    },

    update: function(du) {
        if(!canvas2.isPaused) this.grid.update();
        //update doors
        var i = 0;
        while (i < this._doors.length) {
            var status = this._doors[i].update(du);
            if (status === this.KILL_ME_NOW) {
                this._doors.splice(i,1);
            } else {
                ++i;
            }
        }
        //update portals
        i = 0;
        while (i < this._portals.length) {
            var status = this._portals[i].update(du);
            if (status === this.KILL_ME_NOW) {
                this._portals.splice(i,1);
            } else {
                ++i;
            }
        }
        //for pause button is on dont update lemmings 
        if(!canvas2.isPaused){
            i = 0;
            while (i < this._lemmings.length) {
                var status = this._lemmings[i].update(du);
                if (status === this.KILL_ME_NOW) {
                    this._lemmings.splice(i,1);
                } else {
                    ++i;
                }
            }
        }
        i = 0;
        //updates rest of entities
        while (i < this._entities.length) {
            var status = this._entities[i].update(du);
            if (status === this.KILL_ME_NOW) {
                this._entities.splice(i,1);
            } else {
                ++i;
            }
        }
    },

    render: function(ctx) {

        this.grid.render(ctx);

        for (var i = 0; i < this._doors.length; i++) {
            this._doors[i].render(ctx);
        }

        //portal sound
        if(!canvas2.getIsMuted() && this.portalSp){   
            var S = new sound ("Sounds/portal.ogg");
            S.playSoundE(); 
            this.portalSp = false;
        }

        for(var i = 0; i < this._portals.length; i++){
            this._portals[i].render(ctx);
        }
        for (var i = 0; i < this._lemmings.length; i++) {
            this._lemmings[i].render(ctx);
        }
        for (var i = 0; i < this._entities.length; i++) {
            this._entities[i].render(ctx);
        }

        //render what space is beging hoverd with a jump/gun selected
        if(this.isChosen){
            ctx.globalAlpha = 0.65;
            try{
            var i = this.grid.findCurrentBlock(this.mouseX,this.mouseY);
            if(this.choice === 1 && this.blocksLeft !== 0){
                ctx.drawImage(this.grid.blockIMG,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
            } else if(this.choice === 3 && this.jumpsLeft !== 0){
                ctx.drawImage(g_images.jump1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
            } else if(this.choice === 5 && this.leftLeft !== 0){
                ctx.drawImage(g_images.side1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
            } else if(this.choice === 4 && this.rightLeft !== 0){
                ctx.drawImage(g_images.right1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
            } else if(this.choice === 6 && this.gunsLeft !== 0){
                ctx.drawImage(g_images.gun2,this.grid.position[i.y][i.x].cx-11,this.grid.position[i.y][i.x].cy-11,22,22);
            } else if(this.choice === 2 && this.sjumpLeft !== 0){
                ctx.drawImage(g_images.smalljump1,this.grid.position[i.y][i.x].cx-20,this.grid.position[i.y][i.x].cy-20,40,40);
            }
        } catch(undefined){
                
        }
            ctx.globalAlpha = 1;
        }
    }

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();