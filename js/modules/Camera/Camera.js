//================================================================
// Name: QQ.Camera
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.Camera = class Camera {
	
	constructor(canvas, width, height, x = 0, y = 0) {
		this._scroll = {
			isActive : false,
			prevM1   : false
		};
		this._posEpsilon = 5;
		this._canvas     = canvas;
		this._width      = width;
		this._height     = height;
		this._x          = x;
		this._y          = y;
		this._mainMatrix = 0;
		this._clip       = null;
		
		this._calcMainMatrix();
		window.addEventListener('resize', () => this._calcMainMatrix() );
	}
	
	draw(subjects) {
		//this._cleanCanvas();
		for ( const subj of subjects ) {
			let pos   = subj.getPosition();
			let scale = subj.getScale();
			let angle = subj.getAngle();
			let M     = QQ.Matrix.getIdentity();
				M     = QQ.Matrix.mul(M, QQ.Matrix.getScale(scale.x, -scale.y));
				M     = QQ.Matrix.mul(M, QQ.Matrix.getRotate(-angle));
				M     = QQ.Matrix.mul(M, QQ.Matrix.getMove(pos.x, pos.y));
				M     = QQ.Matrix.mul(M, this._mainMatrix);

			this._canvas.getContext('2d').setTransform(
					M[0][0], M[0][1], 
					M[1][0], M[1][1], 
					M[2][0], M[2][1]
				);
			subj.draw();
			M = QQ.Matrix.getIdentity();
			this._canvas.getContext('2d').setTransform(
					M[0][0], M[0][1], 
					M[1][0], M[1][1], 
					M[2][0], M[2][1]
				);
		}
		//this._drawAxis();
	}
	
	drawHud(huds) {
		for ( const hud of huds ) {
			let pos    = hud.getPosition();
			let scale  = hud.getScale();
			let scaleX = this.widthPercent(scale.x);
			let scaleY = this.heightPercent(scale.y);
			if ( scaleY === 0 ) {
				scaleY = scaleX;
			}
			let M = QQ.Matrix.getIdentity();
				M = QQ.Matrix.mul(M, QQ.Matrix.getScale(scaleX, scaleY));
			    M = QQ.Matrix.mul(M, QQ.Matrix.getMove(
						this.widthPercent(pos.x), 
						this.heightPercent(pos.y))
					);
			this._canvas.getContext('2d').setTransform(
					M[0][0], M[0][1], 
					M[1][0], M[1][1], 
					M[2][0], M[2][1]
				);
			hud.draw();
		}
	}
	
	isScrolling() {
		return this._scroll.isActive; 
	}
	
	tickScroll(x, y, m1) {
		let scroll = this._scroll;
		if ( x >= 0 && y >= 0 ) {
			if ( ! scroll.prevM1 && m1 ) {
				scroll.prevM1   = m1;
				scroll.isActive = false;
				scroll.startX   = x;
				scroll.startY   = y;
				return;
			}
			if ( scroll.prevM1 && ! m1 ) {
				scroll.prevM1   = m1;
				scroll.isActive = false;
				return;
			}
			let isClose = this._isPositionsClose(
					x,             y, 
					scroll.startX, scroll.startY
				);
			if ( m1 && ! scroll.isActive && ! isClose ) {
				let position    = this.getWorldPoint(x, y);
				scroll.isActive = true;
				({x: scroll.scrollX, y: scroll.scrollY} = position);
			}
			if ( scroll.isActive ) {
				let position = this.getWorldPoint(x, y);
				this.addPos(
						scroll.scrollX - position.x, 
						scroll.scrollY - position.y
					);
				let newPosition = this.getWorldPoint(x, y);
				({x: scroll.scrollX, y: scroll.scrollY} = newPosition);
			}
		} else {
			scroll.prevM1   = false;
			scroll.isActive = false;
		}
	}
	
	getViewRect() {
		return { 
			x1: this._x - this._width/2, 
			y1: this._y + this._height/2, 
			x2: this._x + this._width/2, 
			y2: this._y - this._height/2 
		};
	}
	
	getWorldPoint(x, y) {
		let M = QQ.Matrix.mul(
				[[x, y, 1]], 
				QQ.Matrix.inverse(this._mainMatrix)
			);
		return {x: M[0][0], y: M[0][1]};
	}
	
	getPosition() {
		return { x: this._x, y: this._y };
	}
		
	setClip(maxX, minX, maxY, minY) {
		this._clip = {
			maxX : maxX,
			minX : minX,
			maxY : maxY,
			minY : minY
		};
	}
	
	setPos(x, y) {
		this._x = x;
		this._y = y;
		this._calcMainMatrix();
	}
	
	addPos(x, y) {
		this._x += x;
		this._y += y;
		this._calcMainMatrix();
	}
	
	addView(w, h) {
		this._width  += w;
		this._height += h;
		this._calcMainMatrix();
	}
	
	setView(w, h) {
		this._width  = w;
		this._height = h;
		this._calcMainMatrix();
	}
	
	widthToPercent(x) {
		return x / (this._canvas.width/100);
	}

	heightToPercent(y) {
		return y / (this._canvas.height/100);
	}
	
	widthPercent(x) {
		return this._canvas.width*x / 100;
	}

	heightPercent(y) {
		return this._canvas.height*y / 100;
	}
	
	_isPositionsClose(x1, y1, x2, y2) {
		return  Math.abs(x1 - x2) < this._posEpsilon && 
				Math.abs(y1 - y2) < this._posEpsilon;
	}
	
	_fixClip() {
		if ( this._clip !== null ) {
			if ( this._x > this._clip.maxX ) { this._x = this._clip.maxX; };
			if ( this._x < this._clip.minX ) { this._x = this._clip.minX; };
			if ( this._y > this._clip.maxY ) { this._y = this._clip.maxY; };
			if ( this._y < this._clip.minY ) { this._y = this._clip.minY; };
		}
	}
	
	_calcMainMatrix() {
		this._fixClip();
		this._mainMatrix = QQ.Matrix.mul(
				this._getInverseMatrix(), 
				this._getScreenMatrix()
			);
	}

	_drawAxis() {
		let M   = this._mainMatrix;
		let ctx = this._canvas.getContext('2d');
		ctx.setTransform(M[0][0], M[0][1], M[1][0], M[1][1], M[2][0], M[2][1]);
		for ( let i = -10; i <= 10; i++ ) {
			ctx.beginPath();
			ctx.moveTo(-10, i);
			ctx.lineTo( 10, i);
			ctx.lineWidth   = 0.1;
			ctx.strokeStyle = '#00ff00';
			ctx.stroke();
		}
		for ( let i = -10; i <= 10; i++ ) {
			ctx.beginPath();
			ctx.moveTo(i, -10);
			ctx.lineTo(i,  10);
			ctx.lineWidth   = 0.1;
			ctx.strokeStyle = '#00ff00';
			ctx.stroke();
		}
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(-0.1, -0.1, 0.2, 0.2);
		ctx.fillStyle = "#0000FF";
		ctx.fillRect(10, 10, 0.2, 0.2);
	}

	_getMatrix() {
		let M = QQ.Matrix.getIdentity();
			M = QQ.Matrix.mul(M, QQ.Matrix.getScale(1, 1));
			M = QQ.Matrix.mul(M, QQ.Matrix.getRotate(0));
			M = QQ.Matrix.mul(M, QQ.Matrix.getMove(this._x, this._y));
		return M;
	}
	
	_getInverseMatrix() {
		return QQ.Matrix.inverse( this._getMatrix() );
	}

	_getScreenMatrix() {
		let M = QQ.Matrix.getIdentity();
			M = QQ.Matrix.mul(M, QQ.Matrix.getRotate(0));
			M = QQ.Matrix.mul(M, QQ.Matrix.getScale(
					 this._canvas.width  / this._width, 
					-this._canvas.height / this._height
				));
			M = QQ.Matrix.mul(M, QQ.Matrix.getMove(
					this._canvas.width  / 2,
					this._canvas.height / 2
				));
		return M;
	}
	
	_cleanCanvas() {
		let ctx       = this._canvas.getContext('2d');
		ctx.fillStyle = 'gray';
		ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
	}
	
};
