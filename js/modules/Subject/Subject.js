//================================================================
// Name: QQ.Subject
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global Matter */
'use strict';

QQ.Subject = class Subject {
	
	constructor(imgSrc, width=1, height=1) {
		this._x           = 0;
		this._y           = 0;
		this._width       = width;
		this._height      = height;
		this._angle       = 0;
		this._sprite      = new QQ.Sprite( QQ.imgManager.get(imgSrc) );
		this._physicsBody = null;
	}
	
	draw() {
		this._sprite.draw();
	}
	
	getRect() { // TODO: MB TOP LEFT BOTTOM RIGHT
		return {
			x1: this._x - this._width/2, 
			y1: this._y + this._height/2, 
			x2: this._x + this._width/2, 
			y2: this._y - this._height/2 
		};
	}
	
	fitInRect(rect) {
		this._width  = rect.x2 - rect.x1;
		this._height = rect.y1 - rect.y2;
		this._x      = rect.x1 + this._width/2;
		this._y      = rect.y2 + this._height/2;
	}
	
	getPosition() {
		return {x: this._x, y: this._y};
	}
	
	getAngle() {
		return this._angle;
	}
	
	type() {
		return 'subject';
	}
	
	setPhysics(x, y, w, h, options) {
		this._physicsBody = Matter.Bodies.rectangle(x, y, w, h, options);
	}
	
	setDefaultPhysics(options) {
		this._physicsBody = Matter.Bodies.rectangle(
				this._x,     this._y, 
				this._width, this._height, 
				options
			);
	}
	
	getPhysicsBody() {
		return this._physicsBody;
	}
	
	isPhysicsBody() {
		return this._physicsBody !== null;
	}
	
	click() { 
		// Empty
	}
	
	tick(delta) {
		this._physicsTick(delta);
	}
	
	setAlpha(a) {
		this._sprite.setAlpha(a);
	}
	
	getScale() {
		let scaleX = 0;
		let scaleY = 0;
		if ( this._sprite.isReady() ) {
			let size = this._sprite.getSize();
			scaleX   = this._width  / size.width;
			scaleY   = this._height / size.height;
		}
		return {x : scaleX, y : scaleY};
	}
	
	setPosition(inX, inY, inPivot) {
		if ( inX !== undefined) {
			if ( inPivot !== undefined ) {
				if ( inPivot === QQ.Subject.pivot.CENTERTOP ) {
					this._x = inX;
				} else if ( inPivot === QQ.Subject.pivot.CENTERBOTTOM ) {
					this._x = inX;
				} else if ( inPivot === QQ.Subject.pivot.CENTER ) {
					this._x = inX;
				} else if ( inPivot === QQ.Subject.pivot.LEFTTOP ) {
					this._x = inX+this._width/2;
				}
			} else {
				this._x = inX;
			}
		}
		if ( inY !== undefined ) {
			if ( inPivot !== undefined ) {
				if ( inPivot === QQ.Subject.pivot.CENTERTOP ) {
					this._y = inY-this._height/2;
				} else if ( inPivot === QQ.Subject.pivot.CENTERBOTTOM ) {
					this._y = inY+this._height/2;
				} else if ( inPivot === QQ.Subject.pivot.CENTER ) {
					this._y = inY;
				} else if ( inPivot === QQ.Subject.pivot.LEFTTOP ) {
					this._y = inY-this._height/2;
				}
			} else {
				this._y = inY;
			}
		}
	}
	
	_physicsTick(delta) {
		if ( this.isPhysicsBody() ) {
			this.setPosition(this._physicsBody.position.x, this._physicsBody.position.y);
			this._angle = this._physicsBody.angle;
		}
	}
	
};

QQ.Subject.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
