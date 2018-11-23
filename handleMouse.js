// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    entityManager.changeMouse(g_mouseX,g_mouseY);
    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;

    if (!button) return;

    //telling the menu when a button is pressed
    menu.mousePress(button);

    //placeing blocks 
    try {
        entityManager.grid.changeBlock(g_mouseX,g_mouseY);

    } catch (undefined) {
        console.log("waiting for init");
    }

    canvas2.mouseStuff(g_mouseX,g_mouseY);
}


// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
