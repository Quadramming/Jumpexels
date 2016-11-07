//================================================================
// Name: QQ.Subject
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Subject = function(imgSrc, inWidth, inHeight) {

	//================================
	// Public methods
	//================================
	
	this.draw = function() {
		if ( sprite ) {
			sprite.draw();
		}
	};
	
	this.getRect = function() {
		return { 
			x1: x - width/2, 
			y1: y + height/2, 
			x2: x + width/2, 
			y2: y - height/2 
		};
	};
	
	this.fitInRect = function(rect) {
		width  = rect.x2 - rect.x1;
		height = rect.y1 - rect.y2;
		x      = rect.x1 + width/2;
		y      = rect.y2 + height/2;
	};
	
	this.setPosition = function(inX, inY, inPivot) {
		if ( inX !== undefined) {
			if ( inPivot !== undefined ) {
				if ( inPivot === QQ.Subject.pivot.CENTERTOP ) {
					x = inX;
				} else if ( inPivot === QQ.Subject.pivot.CENTERBOTTOM ) {
					x = inX;
				} else if ( inPivot === QQ.Subject.pivot.CENTER ) {
					x = inX;
				} else if ( inPivot === QQ.Subject.pivot.LEFTTOP ) {
					x = inX+width/2;
				}
			} else {
				x = inX;
			}
		}
		if ( inY !== undefined ) {
			if ( inPivot !== undefined ) {
				if ( inPivot === QQ.Subject.pivot.CENTERTOP ) {
					y = inY-height/2;
				} else if ( inPivot === QQ.Subject.pivot.CENTERBOTTOM ) {
					y = inY+height/2;
				} else if ( inPivot === QQ.Subject.pivot.CENTER ) {
					y = inY;
				} else if ( inPivot === QQ.Subject.pivot.LEFTTOP ) {
					y = inY-height/2;
				}
			} else {
				y = inY;
			}
		}
	};
	
	this.getPosition = function() {
		return { x : x, y : y };
	};
	
	this.getAngle = function() {
		return angle;
	};
	
	this.getScale = function() {
		var scaleX = 0;
		var scaleY = 0;
		if ( sprite ) {
			if ( sprite.isReady() ) {
				var size = sprite.getSize();
				scaleX   = width  / size.width;
				scaleY   = height / size.height;
			}
		}
		return { x : scaleX, y : scaleY };
	};
	
	this.type = function() {
		return 'subject';
	};
	
	this.setPhysics = function(x, y, w, h, isStatic) {
		isStatic    = isStatic || false;
		physicsBody = Matter.Bodies.rectangle(x, y, w, h, { isStatic: isStatic });
	};
	
	this.getPhysicsBody = function() {
		return physicsBody;
	};
	
	this.isPhysicsBody = function() {
		return physicsBody !== null;
	};
	
	this.click = function() { 
		// Empty
	};
	
	this.tick  = function() {
		if ( this.isPhysicsBody() ) {
			this.setPosition(physicsBody.position.x, physicsBody.position.y);
			angle = physicsBody.angle;
		}
	};
	
	this.test = function() {
		Matter.Body.setVelocity(physicsBody, { x : 0, y : 0.15 });
	};
	
	//================================
	// Private vars
	//================================
	
	var self        = this;
	
	var x           = 0;
	var y           = 0;
	var width       = inWidth  || 1;
	var height      = inHeight || 1;
	var angle       = 0;
	var sprite      = new QQ.Sprite( QQ.imgManager.get(imgSrc) );
	var physicsBody = null;
};

QQ.Subject.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
