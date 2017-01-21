QQ.Sprite = class Sprite {
	
	constructor(readyImg) {
		if ( readyImg.complete === false) {
			alert('QQ.Sprite: img must be complete');
		}
		this._width       = readyImg.width;
		this._height      = readyImg.height;
		this._alpha       = 1;
		this._animation   = false;
		this._frameHeight = 0;
		this._frameWidth  = 0;
		this._fps         = 0;
		this._tpf         = 0;
		this._frames      = 0;
		this._curFrame    = 0;
		this._time        = null;
		this._startTime   = 0;
		this._img         = readyImg;
	}
	
	getRatio() {
		return this._width / this._height;
	}
	
	getSize() {
		return { width: this._width, height: this._height };
	}
	
	setAnimation(w, h, fps, time) {
		this._isAnimation = true;
		this._frameWidth  = w;
		this._frameHeight = h;
		this._fps         = fps;
		this._tpf         = Math.round(1000 / fps); // Time per frame
		this._time        = time;
		this._startTime   = this._time.now();
	}

	setAlpha(a) {
		this._alpha = a;
	}

	draw(inX, inY) {
		const isX = (typeof inX === 'number');
		const isY = (typeof inY === 'number');
		if ( QQ.Sprite.context ) {
			let pivot, x, y;
			//================================================================
			// Input
			//================================================================
			if ( isX && isY ) {
				pivot = QQ.Sprite.pivot.NONE;
				x     = inX;
				y     = inY;
			} else if ( isX && ! isY ) {
				pivot = inX;
			} else {
				pivot = QQ.Sprite.pivot.CENTER;
			}
			//================================================================
			// Calc pivot
			//================================================================
			if ( pivot !== QQ.Sprite.pivot.NONE ) {
				const position = this._calcPosition(pivot);
				x = position.x;
				y = position.y;
			}
			//================================================================
			// Draw
			//================================================================
			const alpha = QQ.Sprite.context.globalAlpha;
			QQ.Sprite.context.globalAlpha = this._alpha;
			if ( this._isAnimation ) {
				const diff         = this._time.now() - this._startTime;
				const passedFrames = Math.round(diff/this._tpf);
				this._curFrame     = passedFrames % this._frames;
				QQ.Sprite.context.drawImage(
						this._img, 
						this._frameWidth * this._curFrame, 0,
						this._frameWidth, this._frameHeight,
						x, y,
						this._frameWidth, this._frameHeight
					);
			} else {
				QQ.Sprite.context.drawImage(
						this._img,
						x, y,
						this._width, this._height
					);
			}
			QQ.Sprite.context.globalAlpha = alpha;
		}
	}
	
	getContext() {
		return QQ.Sprite.context;
	}
	
	_calcPosition(pivot) {
		const result = { x : 0, y : 0 };
		if ( pivot === QQ.Sprite.pivot.LEFTTOP ) { 
			return result;
		}
		if ( this._isAnimation ) {
			if ( pivot === QQ.Sprite.pivot.CENTER ) {
				result.x = -this._frameWidth/2;
				result.y = -this._frameHeight/2;
			} else if ( pivot === QQ.Sprite.pivot.CENTERBOTTOM ) {
				result.x = -this._frameWidth/2;
				result.y = -this._frameHeight;
			} else if ( pivot === QQ.Sprite.pivot.CENTERTOP ) {
				result.x = -this._frameWidth/2;
				result.y = 0;
			}
		} else {
			if ( pivot === QQ.Sprite.pivot.CENTER ) {
				result.x = -this._width/2;
				result.y = -this._height/2;
			} else if ( pivot === QQ.Sprite.pivot.CENTERBOTTOM ) {
				result.x = -this._width/2;
				result.y = -this._height;
			} else if ( pivot === QQ.Sprite.pivot.CENTERTOP ) {
				result.x = -this._width/2;
				result.y = 0;
			}
		}
		return result;
	}

};

QQ.Sprite.setContext = function(ctx) {
	QQ.Sprite.context = ctx;
};

QQ.Sprite.context = false;

QQ.Sprite.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
