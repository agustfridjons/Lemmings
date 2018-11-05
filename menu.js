//---------
// MENU
//---------
 
var menu = { 

    halfWidth : 150,
    halfHeight : 150,

    showMenu: function(ctx){
        console.log("menu");
        util.fillBox(ctx, g_canvas.width/2 - this.halfWidth,
                          g_canvas.height/2 - this.halfHeight,
                          this.halfWidth*2, this.halfHeight*2,"#704F5F");

    }

};
