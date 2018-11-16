function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("muted", "muted");
    this.sound.style.display = "none";
    this.sound.volume = 0;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    this.loop = function(){
        this.sound.setAttribute("loop", "true");
    }
    this.fadeIN = function(){
        var howLoud = this.sound.volume;
        if (howLoud < 1) {
            howLoud += 0.001;
        }
        if (howLoud > 1) {
            howLoud = 1;
        }
        this.sound.volume = howLoud;
     }
    this.fadeOUT = function() {
        var howLoud = this.sound.volume;
        if (howLoud > 0) {
            howLoud -= 0.01;
        }
        if (howLoud < 0) {
            howLoud = 0;
        }
        this.sound.volume = howLoud;
    }
    this.getTime = function() {
        return this.sound.currentTime;
    }
    this.resetTime = function() {
        this.sound.currentTime = 0;
    }
}