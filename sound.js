function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("muted", "muted");
    this.sound.style.display = "none";
    this.sound.volume = 0;
    document.body.appendChild(this.sound);
    // Play song
    this.play = function(){
        this.sound.play();
    }
    // Play sound effect
    this.playSoundE = function(){
        this.sound.volume = 1;
        this.sound.play();
    } 
    // Stop playing
    this.stop = function(){
        this.sound.pause();
    }
    // Loop song
    this.loop = function(){
        this.sound.setAttribute("loop", "true");
    }
    // Fade in sound
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
    // Fade out sound
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
    // Get current time of sound
    this.getTime = function() {
        return this.sound.currentTime;
    }
    // Reset sound
    this.resetTime = function() {
        this.sound.currentTime = 0;
    }
}