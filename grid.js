//Grid
function Grid(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Grid.prototype.halfWidth = 10;
Grid.prototype.halfHeight = 10;
Grid.prototype.blocks = [];

Grid.prototype.createGrid = function(ctx){
    var g_width = ctx.width;
    var g_height = ctx.height;

    for(var i = 0; i < g_height; i+=10){
        for(var j = 0; j < g_width; j+=10){
            this.blocks.push([i,j]);
        }
    }
}