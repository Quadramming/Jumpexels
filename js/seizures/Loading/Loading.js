//================================================================
// Name: QQ.Loading
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.LoadingSeizure = function(canvas) {

	function init() {
		world.addBackground( new QQ.Subject('img/loading.png') );
	};
	
	//================================
	// Public methods
	//================================

	this.tick = function(delta) {
		if ( world ) {
			world.tick(delta);
		}
	};
	
	this.draw = function() {
		if ( camera ) {
			var rect   = camera.getViewRect();
			var toDraw = world.getSubjectsInRect(rect);
			camera.draw(toDraw);
		}
	};
	
	this.click = function(x, y) {
	};
	
	//================================
	// Private methods
	//================================

	function cMethod() {
		// this - is 'window'
		// Use self.oMethod()
	};
		
	//================================
	// Private vars
	//================================
	
	var self    = this;
	var world   = new QQ.World();
	var camera  = new QQ.Camera(canvas, 30, 40, 0, 0);

	init(); 
};