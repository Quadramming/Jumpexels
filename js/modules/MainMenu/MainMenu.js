//================================================================
// Name: QQ.MainMenu
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.MainMenu = function(canvas) {
	
	function init() {
		camera   = new QQ.Camera(canvas, 30, 40, 0, 0);
		world    = new QQ.World;
		
		var logo = new QQ.Subject('img/logo.png', 10, 10, 0, 0);
		world.addSubject( new QQ.Subject('img/background.png', 30, 40, 0, 0) );
		world.addSubject(logo);
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
	var world   = null;
	var camera  = null;

	init(); 
};