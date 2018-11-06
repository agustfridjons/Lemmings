//Fire
function Fire(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

function Fire(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.img0;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
};