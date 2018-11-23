// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `images`,
//
function Sprite(images) {
    this.images = images;

    this.width = images[0].width;
    this.height = images[0].height;
    this.scale = 1;
}

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, img) {

    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    //console.log(img);
    ctx.drawImage(this.images[img],
                  -w/2, -h/2);
    
    ctx.restore();
};

