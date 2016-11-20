//================================================================
// Name: QQ.MainMenu
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Application.get().addSeizure('MainMenu', function(app) {
	
	function init() {
		world.addBackground( new QQ.Subject('img/backgrounds/tmpMenu.png') );
		
		var logo = new QQ.Subject('img/logo.png', 10, 10);
		logo.click = function() {
			QQ.Application.get().setSeizure('Levels');
		};
		world.addSubject(logo);
		
		var title = new QQ.Subject('img/title.png', 20, 20/7);
		title.setPosition(0, 12);
		world.addSubject(title);
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
	var camera  = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);

	init(); 
});