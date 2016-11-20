//================================================================
// Name: QQ.Subject
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var Matter  = Matter || {};
var QQ      = QQ     || {};

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
	
	this.setPhysics = function(x, y, w, h, options) {
		physicsBody = Matter.Bodies.rectangle(x, y, w, h, options);
	};
	
	this.setDefaultPhysics = function(options) {
		physicsBody = Matter.Bodies.rectangle(x, y, width, height, options);
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
	
	this.setTick = function(tick) {
		customTick = tick;
	};
	
	this.tick = function(delta) {
		var isFinish = false;
		if ( customTick ) {
			isFinish = customTick.call(self, delta);
		}
		if ( isFinish === true || isFinish === undefined ) {
			commonTick(delta);
		}
	};
	
	this.setAlpha = function(a) {
		sprite.setAlpha(a);
	};
	
	//================================
	// Private methods
	//================================
	
	function commonTick(delta) {
		if ( self.isPhysicsBody() ) {
			self.setPosition(physicsBody.position.x, physicsBody.position.y);
			angle = physicsBody.angle;
		}
	};
	
	//================================
	// Private vars
	//================================
	
	var self        = this;
	
	var customTick  = undefined;
	var x           = 0;
	var y           = 0;
	var width       = inWidth  || 1;
	var height      = inHeight || 1;
	var angle       = 0;
	var sprite      = new QQ.Sprite( QQ.ImgManager.get(imgSrc) );
	var physicsBody = null;
};

QQ.Subject.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
