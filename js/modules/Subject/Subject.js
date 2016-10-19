//================================================================
// Name: QQ.Subject
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Subject = function(imgSrc, inWidth, inHeight, inX, inY) {
	
	function init() {
		sprite  = new QQ.Sprite( QQ.imgManager.get(imgSrc) );
	};
	
	//================================
	// Public methods
	//================================
	
	this.draw = function() {
		if ( sprite ) {
			sprite.draw();
		}
	};
	
	this.getRect = function() {
		// Do all
		return { x1: x-width/2, y1: y+height/2, x2: x+width/2, y2: y-height/2 };
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
	
	this.onClick = function(fn) {
		onClickFn = fn;
	};
	
	this.click = function() {
		if ( onClickFn ) {
			onClickFn();
		}
	};
	
	//================================
	// Private methods
	//================================

	function cMethod() {
		// this - is 'window'
		// Use self.oMethod()
		//alert('close method ' + private);
	};
		
	//================================
	// Private vars
	//================================
	
	var self      = this;
	
	var x         = inX      || 0;
	var y         = inY      || 0;
	var width     = inWidth  || 1;
	var height    = inHeight || 1;
	var sprite    = null;
	var physics   = null;
	var pivot     = QQ.Subject.pivot.NONE;
	var onClickFn = null;
	
	init(); 
};

QQ.Subject.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3
};
