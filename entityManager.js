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
grid      : Object,
// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._lemmings,this._entities];
},
/*
generateShip : function(descr) {
    this._ships.push(new Ship(descr));
},
*/
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
    this._entities.push(new Door(descr));
},

generateJump   : function(descr){
    this._entities.push(new Jump(descr));
},

generateLeftJump : function(descr) {
    this._entities.push(new SideJump(descr));
},

generateRightJump : function(descr) {
    this._entities.push(new RightJump(descr));
},

init: function() {
    this.generateGrid();
    this.grid.level1();
    /*
    
    this.generateLemming({
        cx : 122,
        cy : 277    
    });
    */
    //this._generateRocks();
    //this._generateShip();
},

resetShips: function() {
    //this._forEachOf(this._ships, Ship.prototype.reset);
},

generateGrid: function(){
    this.grid = new Grid();
    this.grid.createGrid();
},

update: function(du) {
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
},

render: function(ctx) {
    this.grid.render(ctx);
    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
    
}
}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();