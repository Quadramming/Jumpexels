//================================================================
// Name: QQ.Sprite
// Version: 20.08.16
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Sprite = function(img) {
		this.width       = 0;
		this.height      = 0;
		this.ready       = false;
		this.alpha       = 1;
		
		this.animation   = false;
		this.frameHeight = 0;
		this.frameWidth  = 0;
		this.fps         = 0;
		this.tpf         = 0;
		this.frames      = 0;
		this.curFrame    = 0;
		this.time        = null;
		this.startTime   = 0;
		this.img         = img;
};

QQ.Sprite.prototype.getRatio = function() {
	if ( ! this.isReady() ) {
		console.log('Warning: Try QQ.Sprite.getRatio() when not ready');
		return 0;
	}
	return this.width/this.height;
};

QQ.Sprite.prototype.getSize = function() {
	if ( ! this.isReady() ) {
		console.log('Warning: Try QQ.Sprite.getSize() when not ready');
	}
	return { width: this.width, height: this.height };
};

QQ.Sprite.prototype.isReady = function() {
	if ( this.ready === false && this.img.complete  ) {
		this.width   = this.img.width;
		this.height  = this.img.height;
		if ( this.isAnimation ) {
			this.frames = this.width / this.frameWidth;
		}
		this.ready = true;
	}
	return this.ready;
};

QQ.Sprite.prototype.setAnimation = function(w, h, fps, time) {
	this.isAnimation = true;
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

QQ.Sprite.prototype.setAlpha = function(a) {
	this.alpha = a;
};

QQ.Sprite.prototype._calcPosition = function(pivot) {
	var result = { x : 0, y : 0 };
	if ( pivot === QQ.Sprite.pivot.LEFTTOP ) { 
		return result;
	}
	if ( this.isAnimation ) {
		if ( pivot === QQ.Sprite.pivot.CENTER ) {
			result.x = -this.frameWidth/2;
			result.y = -this.frameHeight/2;
		} else if ( pivot === QQ.Sprite.pivot.CENTERBOTTOM ) {
			result.x = -this.frameWidth/2;
			result.y = -this.frameHeight;
		} else if ( pivot === QQ.Sprite.pivot.CENTERTOP ) {
			result.x = -this.frameWidth/2;
			result.y = 0;
		}
	} else {
		if ( pivot === QQ.Sprite.pivot.CENTER ) {
			result.x = -this.width/2;
			result.y = -this.height/2;
		} else if ( pivot === QQ.Sprite.pivot.CENTERBOTTOM ) {
			result.x = -this.width/2;
			result.y = -this.height;
		} else if ( pivot === QQ.Sprite.pivot.CENTERTOP ) {
			result.x = -this.width/2;
			result.y = 0;
		}
	}
	return result;
};

QQ.Sprite.prototype.draw = function(inX, inY) {
	if ( this.isReady() && QQ.Sprite.context !== null ) {
		var pivot, x, y;
		//================================================================
		// Input
		//================================================================
		if ( typeof inX === 'number' && typeof inY === 'number' ) {
			pivot = QQ.Sprite.pivot.NONE;
			x     = inX;
			y     = inY;
		} else if ( typeof inX === 'number' && typeof inY === 'undefined' ) {
			pivot = inX;
		} else {
			pivot = QQ.Sprite.pivot.CENTER;
		}
		//================================================================
		// Calc pivot
		//================================================================
		if ( pivot !== QQ.Sprite.pivot.NONE ) {
			var position = this._calcPosition(pivot);
			x = position.x;
			y = position.y;
		}
		//================================================================
		// Draw
		//================================================================
		var alpha = QQ.Sprite.context.globalAlpha;
		QQ.Sprite.context.globalAlpha = this.alpha;
		if ( this.isAnimation ) {
			var diff         = this.time.now() - this.startTime;
			var passedFrames = Math.round(diff/this.tpf);
			this.curFrame    = passedFrames % this.frames;
			QQ.Sprite.context.drawImage(this.img, this.frameWidth*this.curFrame, 0, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
		} else {
			QQ.Sprite.context.drawImage(this.img, x, y, this.width, this.height);
		}
		QQ.Sprite.context.globalAlpha = alpha ;
	}
};

QQ.Sprite.setContext = function(ctx) {
	QQ.Sprite.context = ctx;
};

QQ.Sprite.context = null;

QQ.Sprite.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
