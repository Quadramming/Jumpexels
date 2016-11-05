//================================================================
// Name: QQ.Levels
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ      = QQ          || {};
QQ.seizures = QQ.seizures || {};

QQ.seizures.Levels = function(canvas) {

	function init() {
		world.addBackground( new QQ.Subject('img/levels.png') );
		
		var level = new QQ.Subject('img/level.png', 5, 5, -5, 5);
		level.click = function() {
			QQ.application.setSeizure('Game', 1);
		};
		world.addSubject(level);
		
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
		var point = camera.getWorldPoint(x, y);
		var clicked = world.getSubjectAtPoint(point.x, point.y);
		if ( clicked ) {
			clicked.click();
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
	var world   = new QQ.World();
	var camera  = new QQ.Camera(canvas, 30, 40, 0, 0);

	init(); 
};