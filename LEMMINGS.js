// =========
// LEMMINGS
// =========
/*
HAlós
Siggi
Flóki gerði þetta 

A sort-of-playable version of the classic arcade game.


HOMEWORK INSTRUCTIONS:

You have some "TODO"s to fill in again, particularly in:

spatialManager.js

But also, to a lesser extent, in:

Rock.js
Bullet.js
Ship.js


...Basically, you need to implement the core of the spatialManager,
and modify the Rock/Bullet/Ship to register (and unregister)
with it correctly, so that they can participate in collisions.

Be sure to test the diagnostic rendering for the spatialManager,
as toggled by the 'X' key. We rely on that for marking. My default
implementation will work for the "obvious" approach, but you might
need to tweak it if you do something "non-obvious" in yours.
*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =====================
// Gamestate
// =====================
var gamestate = 0;

function setGamestate(state) {
    gamestate = state;
}

// ====================
// CREATE INITIAL Lemming
// ====================
/*function createInitialLemming() {
    entityManager.generateLemming({
        cx : 200,
        cy : 200,
        radius : g_images.img0.width / 2
    });
}
*/
// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

    // Prevent perpetual firing!
    
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');
var KEY_3 = keyCode('3');
var KEY_4 = keyCode('4');
var KEY_5 = keyCode('5');
var KEY_6 = keyCode('6');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.changeChoice(0);

    if (eatKey(KEY_1)) entityManager.changeChoice(1);

    if (eatKey(KEY_2)) entityManager.changeChoice(2); 
    if (eatKey(KEY_3)) entityManager.changeChoice(3);
    if (eatKey(KEY_4)) entityManager.changeChoice(4);  
    if (eatKey(KEY_5)) entityManager.changeChoice(5);  
    if (eatKey(KEY_6)) entityManager.changeChoice(6);  

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        /*img0   : "https://notendur.hi.is/~fth29/Kalli/LemmingSprite/sprite_lemmings0.png",
        img1  : "https://notendur.hi.is/~fth29/Kalli/LemmingSprite/sprite_lemmings1.png",
        img2   : "https://notendur.hi.is/~fth29/Kalli/LemmingSprite/sprite_lemmings2.png",
        img3   : "https://notendur.hi.is/~fth29/Kalli/LemmingSprite/sprite_lemmings3.png",
        */
        img0 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm0.png",
        img1 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm1.png",
        img2 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm2.png",
        img3 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm3.png",
        img4 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm4.png",
        img5 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm5.png",
        img6 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm6.png",
        img7 : "https://notendur.hi.is/~fth29/Kalli/NewLemm/sprite_NewLemm7.png",
        img8 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_0.png",
        img9 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_1.png",
        img10 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_2.png",
        img11 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_3.png",
        img12 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_4.png",
        img13 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_5.png",
        img14 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_6.png",
        img15 : "https://notendur.hi.is/~fth29/Kalli/Reverse/sprite_7.png",

        backside : "https://notendur.hi.is/~fth29/Kalli/New%20Piskel.png",

        fire1   : "https://notendur.hi.is/~fth29/Kalli/FireSprite/Layer 1_sprite_fire1.png",
        fire2   : "https://notendur.hi.is/~fth29/Kalli/FireSprite/Layer 1_sprite_fire2.png",
        fire3   : "https://notendur.hi.is/~fth29/Kalli/FireSprite/Layer 1_sprite_fire3.png",
        fire4   : "https://notendur.hi.is/~fth29/Kalli/FireSprite/Layer 1_sprite_fire4.png",

        water1  : "https://notendur.hi.is/~fth29/Kalli/WaterSprites/sprite_Water0.png",
        water2  : "https://notendur.hi.is/~fth29/Kalli/WaterSprites/sprite_Water1.png",
        water3  : "https://notendur.hi.is/~fth29/Kalli/WaterSprites/sprite_Water2.png",
        water4  : "https://notendur.hi.is/~fth29/Kalli/WaterSprites/sprite_Water3.png",

        door1   : "https://notendur.hi.is/~fth29/Kalli/DoorSprites/sprite_Doors0.png",
        door2   : "https://notendur.hi.is/~fth29/Kalli/DoorSprites/sprite_Doors1.png",

        jump1   : "https://notendur.hi.is/~fth29/Kalli/JumpSprite/sprite_Jump0.png",
        jump2   : "https://notendur.hi.is/~fth29/Kalli/JumpSprite/sprite_Jump1.png",
        jump3   : "https://notendur.hi.is/~fth29/Kalli/JumpSprite/sprite_Jump2.png",
        jump4   : "https://notendur.hi.is/~fth29/Kalli/JumpSprite/sprite_Jump3.png",

        smalljump1 : "https://notendur.hi.is/~fth29/Kalli/SmallJump/sprite_SmallJump0.png",
        smalljump2 : "https://notendur.hi.is/~fth29/Kalli/SmallJump/sprite_SmallJump1.png",
        smalljump3 : "https://notendur.hi.is/~fth29/Kalli/SmallJump/sprite_SmallJump2.png",
        smalljump4 : "https://notendur.hi.is/~fth29/Kalli/SmallJump/sprite_SmallJump3.png",

        side1   : "https://notendur.hi.is/~fth29/Kalli/SideJumpSprite/sprite_SideJump0.png",
        side2   : "https://notendur.hi.is/~fth29/Kalli/SideJumpSprite/sprite_SideJump1.png",
        side3   : "https://notendur.hi.is/~fth29/Kalli/SideJumpSprite/sprite_SideJump2.png",
        side4   : "https://notendur.hi.is/~fth29/Kalli/SideJumpSprite/sprite_SideJump3.png",
        
        right1  : "https://notendur.hi.is/~fth29/Kalli/JumpRightSprite/sprite_JumpRight0.png",
        right2  : "https://notendur.hi.is/~fth29/Kalli/JumpRightSprite/sprite_JumpRight1.png",
        right3  : "https://notendur.hi.is/~fth29/Kalli/JumpRightSprite/sprite_JumpRight2.png",
        right4  : "https://notendur.hi.is/~fth29/Kalli/JumpRightSprite/sprite_JumpRight3.png",

        button0 : "https://notendur.hi.is/~fth29/Kalli/Buttons/StartButton0.png",
        button1 : "https://notendur.hi.is/~fth29/Kalli/Buttons/StartButton1.png",
        button2 : "https://notendur.hi.is/~fth29/Kalli/Buttons/ControlButton0.png",
        button3 : "https://notendur.hi.is/~fth29/Kalli/Buttons/ControlButton1.png",

        explosion0 : "https://notendur.hi.is/~fth29/Kalli/Explosion/sprite_Explosion0.png",
        explosion1 : "https://notendur.hi.is/~fth29/Kalli/Explosion/sprite_Explosion1.png",
        explosion2 : "https://notendur.hi.is/~fth29/Kalli/Explosion/sprite_Explosion2.png",
        explosion3 : "https://notendur.hi.is/~fth29/Kalli/Explosion/sprite_Explosion3.png",

        gun : "https://notendur.hi.is/~fth29/Kalli/Gun.png",

        background : "https://notendur.hi.is/~fth29/Kalli/BackgroundImg/background.png",
        block : "https://notendur.hi.is/~fth29/Kalli/BackgroundImg/sprite_Background0.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
var background;
var block;

function preloadDone() {
    var images = [g_images.img0, g_images.img1, g_images.img2, g_images.img3,g_images.img4,g_images.img5,g_images.img6,g_images.img7,g_images.backside];
    var reverse = [g_images.img8, g_images.img9, g_images.img10, g_images.img11,g_images.img12,g_images.img13,g_images.img14,g_images.img15,g_images.backside];
    var fire = [g_images.fire1,g_images.fire2,g_images.fire3,g_images.fire4];
    var water = [g_images.water1,g_images.water2,g_images.water3,g_images.water4];
    var door = [g_images.door1,g_images.door2];
    var jump = [g_images.jump1,g_images.jump2,g_images.jump3,g_images.jump4];
    var smallJump = [g_images.smalljump1,g_images.smalljump2,g_images.smalljump3,g_images.smalljump4];
    var side = [g_images.side1,g_images.side2,g_images.side3,g_images.side4];
    var right = [g_images.right1,g_images.right2,g_images.right3,g_images.right4];
    var buttons = [g_images.button0,g_images.button1,g_images.button2,g_images.button3];
    var explosion = [g_images.explosion0,g_images.explosion1,g_images.explosion2,g_images.explosion3];
    var gun = [g_images.gun];
    g_sprites.gun = new Sprite(gun);
    g_sprites.reverse = new Sprite(reverse);
    g_sprites.img0 = new Sprite(images);
    g_sprites.fire1 = new Sprite(fire);
    g_sprites.water1 = new Sprite(water);
    g_sprites.door1 = new Sprite(door);
    g_sprites.jump1 = new Sprite(jump);
    g_sprites.smalljump = new Sprite(smallJump);
    g_sprites.side1 = new Sprite(side);
    g_sprites.right1 = new Sprite(right);
    g_sprites.button1 = new Sprite(buttons);
    g_sprites.explosion = new Sprite(explosion);
    //g_sprites.ship  = new Sprite(g_images.ship);
    //g_sprites.ship2 = new Sprite(g_images.ship2);
    //g_sprites.rock  = new Sprite(g_images.rock);

    //g_sprites.bullet = new Sprite(g_images.ship);
    //g_sprites.bullet.scale = 0.25;

    entityManager.init();
    main.init();
}

// Kick it off
requestPreloads();
