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

Sprite.prototype._calcPosition = function(pivot) {
	var result = { x : 0, y : 0 };
	if ( pivot === Sprite.pivot.LEFTTOP ) { 
		return result;
	}
	if ( this.animation ) {
		if ( pivot === Sprite.pivot.CENTER ) {
			result.x = -this.frameWidth/2;
			result.y = -this.frameHeight/2;
		} else if ( pivot === Sprite.pivot.CENTERBOTTOM ) {
			result.x = -this.frameWidth/2;
			result.y = -this.frameHeight;
		}
	} else {
		if ( pivot === Sprite.pivot.CENTER ) {
			result.x = -this.width/2;
			result.y = -this.height/2;
		} else if ( pivot === Sprite.pivot.CENTERBOTTOM ) {
			result.x = -this.width/2;
			result.y = -this.height;
		}
	}
	return result;
};

Sprite.prototype.draw = function(inX, inY) {
	if ( this.isReady() && Sprite.context !== null ) {
		var pivot, x, y;
		//================================================================
		// Input
		//================================================================
		if ( typeof inX === 'number' && typeof inY === 'number' ) {
			pivot = Sprite.pivot.NONE;
			x     = inX;
			y     = inY;
		} else if ( typeof inX === 'number' && typeof inY === 'undefined' ) {
			pivot = inX;
		} else {
			pivot = Sprite.pivot.CENTER;
		}
		//================================================================
		// Calc pivot
		//================================================================
		if ( pivot !== Sprite.pivot.NONE ) {
			var position = this._calcPosition(pivot);
			x = position.x;
			y = position.y;
		}
		//================================================================
		// Draw
		//================================================================
		if ( this.animation ) {
			var diff         = this.time.now() - this.startTime;
			var passedFrames = Math.round(diff/this.tpf);
			this.curFrame    = passedFrames % this.frames;
			Sprite.context.drawImage(this.img, this.frameWidth*this.curFrame, 0, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
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
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3
};
