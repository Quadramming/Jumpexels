//================================================================
// Name: QQ.
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.Hud = class Hud {
	
	constructor(imgSrc, width = 0, height = 0) {
		this._sprite      = new QQ.Sprite( QQ.imgManager.get(imgSrc) );
		this._width       = width;
		this._height      = height;
		this._canvasRatio = 0;
		this._x           = 0;
		this._y           = 0;
		this._onClick     = null;
	}
	
	isHit(inX, inY) {
		return QQ.Math.isInside(this.getRect(), inX, inY);
	}
	
	click() {
		if ( this._onClick ) {
			this._onClick();
		}
	}
	
	setClick(fn) {
		this._onClick = fn;
	}
	
	getRect() {
		return { 
			x1: this._x - this._width/2, 
			y1: this._y + this._height/2, 
			x2: this._x + this._width/2, 
			y2: this._y - this._height/2 
		};
	}

	draw() {
		this._sprite.draw();
	}
	
	getPosition() {
		return { x : this._x, y : this._y };
	}
	
	getRatio() {
		return this._sprite.getRatio();
	}
	
	getScale() {
		let scaleX = 0;
		let scaleY = 0;
		if ( this._sprite.isReady() ) {
			let size = this._sprite.getSize();
			scaleX   = this._width  / size.width;
			if ( this._height !== 0 ) {
				scaleY = this._height / size.height;
			}
		}
		return { x : scaleX, y : scaleY };
	}
	
	setPosition(inX, inY, inPivot) {
		if ( ! this._sprite.isReady() ) {
			setTimeout(this.setPosition.bind(this), 1, inX, inY, inPivot);
		} else {
			this._fixSize();
			if ( inX !== undefined) {
				if ( inPivot !== undefined ) {
					if ( inPivot === QQ.Hud.pivot.CENTERTOP ) {
						this._x = inX;
					} else if ( inPivot === QQ.Hud.pivot.CENTERBOTTOM ) {
						this._x = inX;
					} else if ( inPivot === QQ.Hud.pivot.CENTER ) {
						this._x = inX;
					} else if ( inPivot === QQ.Hud.pivot.LEFTTOP ) {
						this._x = inX+this._width/2;
					}
				} else {
					this._x = inX;
				}
			}
			if ( inY !== undefined ) {
				if ( inPivot !== undefined ) {
					if ( inPivot === QQ.Hud.pivot.CENTERTOP ) {
						this._y = inY+this._height/2;
					} else if ( inPivot === QQ.Hud.pivot.CENTERBOTTOM ) {
						this._y = inY-this._height/2;
					} else if ( inPivot === QQ.Hud.pivot.CENTER ) {
						this._y = inY;
					} else if ( inPivot === QQ.Hud.pivot.LEFTTOP ) {
						this._y = inY+this._height/2;
					}
				} else {
					this._y = inY;
				}
			}
		}
	}
	
	_fixSize() {
		if ( this._sprite.isReady() ) {
			if ( this._height === 0 ) {
				let ratio = QQ.Hud.canvasRatio();
				this._height = (this._width/this.getRatio())*ratio;
			}
		}
	}
	
};

QQ.Hud.canvasRatio = function(ratio) {
	if ( ratio !== undefined ) {
		QQ.Hud.canvasRatio.ratio = ratio;
	} else {
		return QQ.Hud.canvasRatio.ratio;
	}	
};

QQ.Hud.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
