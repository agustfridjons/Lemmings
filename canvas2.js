var canvas2 = {

    muted : false,

    blockCount     : 4,
    smalljumpCount : 4,
    largejumpCount : 4,
    rightjumpCount : 4,
    leftjumpCount  : 4,
    gunCount       : 4,

    width     : g_canvas2.width,
    height    : g_canvas2.height,
    xInterval : g_canvas2.width / 2,
    yInterval : g_canvas2.height / 8,

    update : function() {

    },


    render : function(ctx) {

        ctx.fillStyle = "BLACK";
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);

        ctx.stroke();

    }

};