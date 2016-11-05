//================================================================
// Name: QQ.Subject
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Subject = function(imgSrc, inWidth, inHeight, inX, inY, inPivot) {

	//================================
	// Public methods
	//================================
	
	this.draw = function() {
		if ( sprite ) {
			sprite.draw();
		}
	};
	
	this.getRect = function() {
		if ( pivot === QQ.Subject.pivot.CENTERTOP ) {
			return { 
				x1: x-width/2, 
				y1: y+height, 
				x2: x+width/2, 
				y2: y 
			};
		} else if ( pivot === QQ.Subject.pivot.CENTERBOTTOM ) {
			return { 
				x1: x-width/2, 
				y1: y, 
				x2: x+width/2, 
				y2: y-height 
			};
		} else if ( pivot === QQ.Subject.pivot.CENTER ) {
			return { 
				x1: x-width/2, 
				y1: y+height/2, 
				x2: x+width/2, 
				y2: y-height/2 
			};
		} else if ( pivot === QQ.Subject.pivot.LEFTTOP ) {
			return { 
				x1: x, 
				y1: y, 
				x2: x+width, 
				y2: y-height 
			};
		}
	};
	
	this.fitInRect = function(rect) {
		width  = rect.x2 - rect.x1;
		height = rect.y1 - rect.y2;
		x      = rect.x1 + width/2;
		y      = rect.y2 + height/2;
	};
	
	this.setPos = function(inX, inY) {
		x = inX;
		if ( inY ) {
			y = inY;
		}
	};
	
	this.getCenterPos = function() {
		if ( pivot === QQ.Subject.pivot.CENTERTOP ) {
			return { x : x, y : y-height/2 };
		} else if ( pivot === QQ.Subject.pivot.CENTERBOTTOM ) {
			return { x : x, y : y+height/2 };
		} else if ( pivot === QQ.Subject.pivot.CENTER ) {
			return { x : x, y : y };
		} else if ( pivot === QQ.Subject.pivot.LEFTTOP ) {
			return { x : x+width/2, y : y-height/2 };
		}
	};
	
	this.getPos = function() {
		return { x : x, y : y };
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
	
	this.click = function() { /* Empty */ };
	this.tick  = function() { /* Empty */ };
	
	//================================
	// Private vars
	//================================
	
	var self      = this;
	
	var x         = inX      || 0;
	var y         = inY      || 0;
	var width     = inWidth  || 1;
	var height    = inHeight || 1;
	var pivot     = inPivot  || QQ.Subject.pivot.CENTER;
	var sprite    = new QQ.Sprite( QQ.imgManager.get(imgSrc) );
	var physics   = null;
};

QQ.Subject.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
