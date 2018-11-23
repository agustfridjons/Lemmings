// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


// RANGES are cool
// ======

clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
	value = lowBound;
    } else if (value > highBound) {
	value = highBound;
    }
    return value;
},

// MISC
// ====

square: function(x) {
    return x*x;
},

// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

fillTriangle: function (ctx, cx, cy, style) {

    var x1 = cx - 10;
    var y1 = cy;

    var x2 = x1 + 20;
    var y2 = y1 - 10;

    var x3 = x2;
    var y3 = y1 + 10;

    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();

    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x1, y1);
    ctx.stroke();
},

fillreverseTriangle: function (ctx, cx, cy, style) {

    var x1 = cx + 10;
    var y1 = cy;

    var x2 = x1 - 20;
    var y2 = y1 - 10;

    var x3 = x2;
    var y3 = y1 + 10;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = style;
    ctx.fill();
    
    ctx.fillStyle = "BLACK";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x1, y1);
    ctx.stroke();

},

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

drawText: function(ctx, font, style, string, x, y){
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "BLACK";
    ctx.font = font;
    ctx.fillText(string, x, y);
    ctx.fillStyle = oldStyle;
}

};
