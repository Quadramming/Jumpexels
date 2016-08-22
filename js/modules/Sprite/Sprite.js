//================================================================
// Name: Sprite
// Version: 20.08.16
// 
// Interface:
// 
//================================================================

function Sprite(img) {
		var self        = this;
		this.width      = 0;
		this.height     = 0;
		this.ready      = false;
		
		this.animation   = false;
		this.frameHeight = 0;
		this.frameWidth  = 0;
		this.fps         = 0;
		this.tpf         = 0;
		this.frames      = 0;
		this.curFrame    = 0;
		this.time        = null;
		this.startTime   = 0;
		
		this.img        = img;
		this.img.onload = function() {
			self.width  = this.width;
			self.height = this.height;
			self.ready  = true;
			if ( self.animation ) {
				self.frames = self.width / self.frameWidth;
			}
		};
};

Sprite.prototype.isReady = function() {
	return this.ready;
};

Sprite.prototype.setAnimation = function(w, h, fps, time) {
	this.animation   = true;
	this.frameWidth  = w;
	this.frameHeight = h;
	this.fps         = fps;
	this.tpf         = Math.round(1000 / fps); // Time per frame
	this.time        = time;
	this.startTime   = this.time.now();
	if ( this.isReady() ) {
		this.frames = this.width / this.frameWidth;
	}
};

Sprite.prototype.draw = function(x, y) {
	if ( this.isReady() && Sprite.context !== null ) {
		if ( this.animation ) {
			var diff         = this.time.now() - this.startTime;
			var passedFrames = Math.round(diff/this.tpf);
			this.curFrame    = passedFrames % this.frames;

			Sprite.context.drawImage(this.img, this.frameWidth*this.curFrame, 0, this.frameHeight, this.frameWidth, x, y, this.frameHeight, this.frameWidth);
		} else {
			Sprite.context.drawImage(this.img, x, y, this.width, this.height);
		}
	}
};

Sprite.setContext = function(ctx) {
	Sprite.context = ctx;
};

Sprite.context = null;

Sprite.pivot = {
	CENTER       : 0,
	LEFTTOP      : 1,
	CENTERBOTTOM : 2
};
