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

QQ.seizures.Game = function(canvas, level) {

	function init() {
		QQ.includer.js('js/levels/level'+level+'.js');
		QQ.includer.onLoad(function() {
			camera = new QQ.Camera(
					canvas, 
					QQ.level.camera.size.w,   QQ.level.camera.size.h, 
					QQ.level.camera.lookAt.x, QQ.level.camera.lookAt.y
				);
		
			world.addBackground( new QQ.Subject(QQ.level.backGround.img) );
			
			world.addSubject(makeGround(QQ.level.ground));
			world.addSubject(makeEscapeShip(QQ.level.escapeShip));
			
			for ( var i in QQ.level.ramps ) {
				world.addSubject(makeRamp(QQ.level.ramps[i]));
			}
			
			for ( var i in QQ.level.aliens ) {
				world.addSubject(makeAlien(QQ.level.aliens[i]));
			}
		});
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
		if ( camera ) {
			camera.addView(3, 4);
			var point   = camera.getWorldPoint(x, y);
			var clicked = world.getSubjectAtPoint(point.x, point.y);
			if ( clicked ) {
				clicked.click();
			}
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
	var camera  = null;

	init(); 
};

//================================================================
// Escape Ship
//================================================================

function makeEscapeShip(config) {
	var obj = new QQ.Subject('./img/spaceShip.png', 4, 4);
	
	obj.type = function() {
		return 'escapeShip';
	};
	
	var angle   = 0;
	var pivotX  = config.pos.x;
	var pivotY  = config.pos.y;
	var travelX = config.travel.w;
	var travelY = config.travel.h;
	var period  = config.period;
	var time    = Math.random();
	
	obj.tick = function(delta) {
		time += delta;
		time  = QQ.Math.devidePeriod(time, period);
		angle = time/period * QQ.Math.PIx2;

		this.setPos(
				pivotX + travelX * Math.sin(angle  ),	
				pivotY + travelY * Math.sin(angle*2)
			);
	};
	
	return obj;
}

function makeAlien(config) {
	var obj = new QQ.Subject('./img/animals/elephant.png', 1, 1, config.pos.x, config.pos.y);
	
	obj.type = function() {
		return 'alien';
	};
	
	return obj;
}

function makeGround(config) {
	var obj = new QQ.Subject('./img/earth.png', config.size.w, config.size.h, config.pos.x, config.pos.y);
	
	obj.type = function() {
		return 'ground';
	};
	
	return obj;
}

function makeRamp(config) {
	var obj = new QQ.Subject('./img/earth.png', config.size.w, config.size.h, config.pos.x, config.pos.y);
	
	var pivotX = config.pos.x;
	var pivotY = config.pos.y;
	var period = config.period;
	var time   = config.time || 0;
	var range  = config.travel;
	var angle  = 0;
	
	obj.type = function() {
		return 'ramp';
	};
	
	obj.tick = function(delta) {
		time += delta;
		time  = QQ.Math.devidePeriod(time, period);
		angle = time/period * QQ.Math.PIx2;
	
		var x = pivotX + range * Math.sin(angle);
	
		this.setPos(x);
	};
	
	return obj;
}

