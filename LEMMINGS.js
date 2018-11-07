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


// ====================
// CREATE INITIAL Lemming
// ====================
function createInitialLemming() {
    entityManager.generateLemming({
        cx : 200,
        cy : 200,
        radius : g_images.img0.width / 2
    });
}

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

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship});

    if (eatKey(KEY_2)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship2
        });

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
        img0   : "/LemmingSprite/sprite_lemmings0.png",
        img1  : "/LemmingSprite/sprite_lemmings1.png",
        img2   : "/LemmingSprite/sprite_lemmings2.png",
        img3   : "/LemmingSprite/sprite_lemmings3.png",
        fire1   : "/FireSprite/Layer 1_sprite_fire1.png",
        fire2   : "/FireSprite/Layer 1_sprite_fire2.png",
        fire3   : "/FireSprite/Layer 1_sprite_fire3.png",
        fire4   : "/FireSprite/Layer 1_sprite_fire4.png",
        water1  : "/WaterSprites/sprite_Water0.png",
        water2  : "/WaterSprites/sprite_Water1.png",
        water3  : "/WaterSprites/sprite_Water2.png",
        water4  : "/WaterSprites/sprite_Water3.png",
        door1   : "/DoorSprites/sprite_Doors0.png",
        door2   : "/DoorSprites/sprite_Doors1.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    var images = [g_images.img0, g_images.img1, g_images.img2, g_images.img3];
    var fire = [g_images.fire1,g_images.fire2,g_images.fire3,g_images.fire4];
    var water = [g_images.water1,g_images.water2,g_images.water3,g_images.water4];
    var door = [g_images.door1,g_images.door2];
    g_sprites.img0 = new Sprite(images);
    g_sprites.fire1 = new Sprite(fire);
    g_sprites.water1 = new Sprite(water);
    g_sprites.door1 = new Sprite(door);
    //g_sprites.ship  = new Sprite(g_images.ship);
    //g_sprites.ship2 = new Sprite(g_images.ship2);
    //g_sprites.rock  = new Sprite(g_images.rock);

    //g_sprites.bullet = new Sprite(g_images.ship);
    //g_sprites.bullet.scale = 0.25;

    entityManager.init();
    //createInitialLemming();

    main.init();
}

// Kick it off
requestPreloads();
