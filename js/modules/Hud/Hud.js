//================================================================
// Name: QQ.
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Hud = function(imgSrc, inWidth, inHeight) {

	//================================
	// Public methods
	//================================

	this.isHit = function(inX, inY) {
		return QQ.Math.isInside(this.getRect(), inX, inY);
	};
	
	this.click = function() {
		if ( onClick ) {
			onClick();
		}
	};
	
	this.setClick = function(fn) {
		onClick = fn;
	};
	
	this.getRect = function() {
		return { 
			x1: x - width/2, 
			y1: y + height/2, 
			x2: x + width/2, 
			y2: y - height/2 
		};
	};

	this.draw = function() {
		if ( sprite ) {
			sprite.draw();
		}
	};
	
	this.getPosition = function() {
		return { x : x, y : y };
	};
	
	this.getRatio = function() {
		var ratio = 0;
		if ( sprite && sprite.isReady() ) {
			ratio = sprite.getRatio();
		}
		return ratio;
	};
	
	this.getScale = function() {
		var scaleX = 0;
		var scaleY = 0;
		if ( sprite ) {
			if ( sprite.isReady() ) {
				var size = sprite.getSize();
				scaleX   = width  / size.width;
				if ( height !== 0 ) {
					scaleY = height / size.height;
				}
			}
		}
		return { x : scaleX, y : scaleY };
	};
	
	this.setPosition = function(inX, inY, inPivot) {
		if ( ! sprite.isReady() ) {
			setTimeout(this.setPosition.bind(this), 1, inX, inY, inPivot);
		} else {
			fixSize();
			if ( inX !== undefined) {
				if ( inPivot !== undefined ) {
					if ( inPivot === QQ.Hud.pivot.CENTERTOP ) {
						x = inX;
					} else if ( inPivot === QQ.Hud.pivot.CENTERBOTTOM ) {
						x = inX;
					} else if ( inPivot === QQ.Hud.pivot.CENTER ) {
						x = inX;
					} else if ( inPivot === QQ.Hud.pivot.LEFTTOP ) {
						x = inX+width/2;
					}
				} else {
					x = inX;
				}
			}
			if ( inY !== undefined ) {
				if ( inPivot !== undefined ) {
					if ( inPivot === QQ.Hud.pivot.CENTERTOP ) {
						y = inY+height/2;
					} else if ( inPivot === QQ.Hud.pivot.CENTERBOTTOM ) {
						y = inY-height/2;
					} else if ( inPivot === QQ.Hud.pivot.CENTER ) {
						y = inY;
					} else if ( inPivot === QQ.Hud.pivot.LEFTTOP ) {
						y = inY+height/2;
					}
				} else {
					y = inY;
				}
			}
		}
	};
	
	//================================
	// Private methods
	//================================
	
	function fixSize() {
		if ( sprite.isReady() ) {
			if ( height === 0 ) {
				height = (width/self.getRatio())*QQ.Hud.canvasRatio;
			}
		}
	};
	
	//================================
	// Private vars
	//================================
	
	var self        = this;
	
	var sprite      = new QQ.Sprite( QQ.ImgManager.get(imgSrc) );
	var width       = inWidth  || 0;
	var height      = inHeight || 0;
	var canvasRatio = 0;
	var x           = 0;
	var y           = 0;
	var onClick     = null;
};

QQ.Hud.setCanvasRatio = function(ratio) {
	QQ.Hud.canvasRatio = ratio;
};

QQ.Hud.canvasRatio = null;

QQ.Hud.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3,
	CENTERTOP    : 4
};
