QQ.Hud = class Hud {
	
	constructor(imgSrc, width = 0, height = 0) {
		this._sprite      = new QQ.Sprite( QQ.imgManager.get(imgSrc) );
		this._width       = width;
		this._height      = height;
		this._canvasRatio = 0;
		this._x           = 0;
		this._y           = 0;
		this._onClick     = null;
		this._fixSize();
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
		let size   = this._sprite.getSize();
		scaleX     = this._width  / size.width;
		scaleY     = this._height / size.height;
		return { x : scaleX, y : scaleY };
	}
	
	setPosition(x, y, p) {
		if ( x !== undefined ) {
			this._x = p ? QQ.Math.calcPivotX(p, x, this._width) : x;
		}
		if ( y !== undefined ) {
			this._y = p ? QQ.Math.calcPivotY(p, y, this._height, -1) : y;
		}
	}
	
	_fixSize() {
		if ( this._height === 0 ) {
			let ratio = QQ.Hud.canvasRatio();
			this._height = (this._width/this.getRatio())*ratio;
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
