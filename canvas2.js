var canvas2 = {

    margin : 10,

    isMuted : false,
    isPaused : false,
    volumeButtons    : {},
    pauseplayButtons : {},
    bombButton : 0,

    solutionGiven : false,

    blockCount     : "-",
    smalljumpCount : "-",
    largejumpCount : "-",
    rightjumpCount : "-",
    leftjumpCount  : "-",
    gunCount       : "-",

    powerUps : [],

    width     : g_canvas2.width,
    height    : g_canvas2.height,
    xInterval : g_canvas2.width / 2,
    yInterval : g_canvas2.height / 8,


    mouseStuff : function(x,y){
        console.log(x,y);
        if(y > 0 && y < this.yInterval){
            if(x > 610 && x < (610 + this.xInterval)){
                this.isMuted = !this.isMuted;
                if(this.isMuted){
                    g_gameSong.stop();
                } else {
                    g_gameSong.play();
                }
            } else if(x > 610 + this.xInterval && x < 610 + this.xInterval*2) {
                entityManager.killALL = true;
            }
        } else if(y > this.yInterval && y < this.yInterval*2){
            if(x > 610 && x < (610 + this.xInterval)){
                this.isPaused = !this.isPaused;
                g_isUpdatePaused = !g_isUpdatePaused;
            } else if(x > 610 + this.xInterval && x < 610 + this.xInterval*2){
                if(!this.solutionGiven) {
                    console.log("BOOM");
                    entityManager.grid.giveSolution();
                    this.solutionGiven = true;
                }
            }
        }
    },

    init : function() {
        this.volumeButtons = {
            mute   : g_images.mute,
            unmute : g_images.unmute
        }
        this.pauseplayButtons = {
            pause : g_images.pause,
            play  : g_images.play
        }

        this.bombButton = g_images.bomb;
        this.powerUps = [this.blockCount, this.smalljumpCount,
                         this.largejumpCount, this.rightjumpCount,
                         this.leftjumpCount, this.gunCount];
        this.powerUpIMGs = [g_images.blockIMG, g_images.smalljump1,
                            g_images.jump1, g_images.right1,
                            g_images.side1, g_images.gun1];
    },

    update : function() {

    },

    setGrid : function(ctx) {
        ctx.fillStyle = "BLACK";
        ctx.beginPath();
        ctx.moveTo(this.width / 2, 0);
        ctx.lineTo(this.width / 2, this.yInterval * 2);
        ctx.stroke();

        var y = 0;
        for (var i = 0; i < 8; i++) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
            y += this.yInterval;
        }
    },

    setGiveUp : function(ctx) {
        ctx.font="16px Georgia";
        ctx.fillText("I", this.xInterval + 20, this.yInterval + 16);
        ctx.fillText("GIVE", this.xInterval + 5, this.yInterval + 30);
        ctx.fillText("UP", this.xInterval + 15, this.yInterval + 45);
    },

    setNumbers : function(ctx) {
        ctx.font="18px Georgia";

        var cx = this.xInterval + this.xInterval / 1.5;
        var cy = (this.yInterval * 2) + this.yInterval / 2;

        for (var i = 0; i < this.powerUps.length; i++) {
            ctx.fillText(this.powerUps[i], cx, cy);
            cy += this.yInterval;
        }
    },

    setImgs : function(ctx) {
        var cx = this.margin / 2;
        var cy = (this.yInterval * 2) + this.margin / 2;

        var cxSaved = cx;
        var cySaved = cy;

        for (var i = 0; i < this.powerUpIMGs.length; i++) {
            for (var j = 0; j < this.powerUps[i]; j++) {
                ctx.drawImage(this.powerUpIMGs[i], cx, cy, 20, 20);
                cx += 10;
                cy += 4;
            }
            cx = cxSaved;
            cy = cySaved;
            cy += this.yInterval;
            cySaved = cy;
        }
    },

    render : function(ctx) {

        util.fillBox(ctx, 0, 0, this.width, this.height, "#514545");

        this.setGrid(ctx);

        if (this.isMuted) {
            ctx.drawImage(this.volumeButtons.mute, this.margin, this.margin,
                 this.xInterval - (this.margin * 2), this.yInterval - (this.margin * 2));
        } else {
            ctx.drawImage(this.volumeButtons.unmute, this.margin, this.margin,
                 this.xInterval- (this.margin * 2), this.yInterval - (this.margin * 2));
        }

        if (this.isPaused) {
            ctx.drawImage(this.pauseplayButtons.play, this.margin, this.xInterval + this.margin,
                this.xInterval - (this.margin * 2), this.yInterval - (this.margin * 2));            
        } else {
            ctx.drawImage(this.pauseplayButtons.pause, this.margin, this.xInterval + this.margin,
                 this.xInterval - (this.margin * 2), this.yInterval - (this.margin * 2));
        }

        ctx.drawImage(this.bombButton, this.xInterval + this.margin, this.margin,
            this.xInterval - (this.margin * 2), this.yInterval - (this.margin * 2));

        // (ctx, font, style, string, x, y)
        this.setGiveUp(ctx);
        this.setNumbers(ctx);
        this.setImgs(ctx);


    }

};