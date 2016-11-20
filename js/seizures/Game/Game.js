//================================================================
// Name: QQ.Levels
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var Matter  = Matter || {};
var QQ      = QQ     || {};

QQ.GameSeizure = function(app, level) {

	function init() {
		QQ.Includer.js('js/seizures/Game/Alien.js');
		QQ.Includer.js('js/seizures/Game/EscapeShip.js');
		QQ.Includer.js('js/seizures/Game/Ground.js');
		QQ.Includer.js('js/seizures/Game/Ramp.js');
		QQ.Includer.js('js/levels/level'+level+'.js', true);
		QQ.Includer.onLoad(function() {
			world.createPhysics();
			camera = new QQ.Camera(
					app.getCanvas(), 
					QQ.level.camera.size.w,   QQ.level.camera.size.h, 
					QQ.level.camera.lookAt.x, QQ.level.camera.lookAt.y
				);
		
			world.addBackground( new QQ.Subject(QQ.level.backGround.img) );
		
			world.addSubject(self.makeEscapeShip(QQ.level.escapeShip));
			
			for ( var i in QQ.level.grounds ) {
				world.addSubject(self.makeGround(QQ.level.grounds[i]));
			}
			
			for ( var i in QQ.level.ramps ) {
				world.addSubject(self.makeRamp(QQ.level.ramps[i]));
			}
			
			for ( var i in QQ.level.aliens ) {
				world.addSubject(self.makeAlien(QQ.level.aliens[i]));
			}
			
			var backHud = new QQ.Hud('img/back.png', 15);
			backHud.setPosition(0, 0, QQ.Hud.pivot.LEFTTOP );
			backHud.setClick(function() {
					QQ.Application.get().setSeizure('Levels');
				});
			huds.push(backHud);
			
			started = true;
		});
	};
	
	//================================
	// Public methods
	//================================

	this.tick = function(delta) {
		if ( ! started ) return;
		
		var aliens = getSubjectsByType('alien');
		if ( aliens.length === 0 ) {
			QQ.Application.get().setSeizure('Levels');
		}
		if ( world ) {
			world.tick(delta);
		}
	};
	
	this.draw = function() {
		if ( camera ) {
			var rect   = camera.getViewRect();
			var toDraw = world.getSubjectsInRect(rect);
			camera.draw(toDraw);
			camera.drawHud(huds);
		}
	};
	
	this.click = function(x, y) {
		for ( var i in huds ) {
			var isHit = huds[i].isHit(
					camera.widthToPercent(x), 
					camera.heightToPercent(y)
				);
			if ( isHit ) {
				huds[i].click();
			}
		}
		/*
		var units = world.getSubjects(function(subj) {
				return subj.type() === 'alien';
			});
		units.forEach(function(alien) {
				alien.jump();
			});
			
		if ( camera ) {
			var point   = camera.getWorldPoint(x, y);
			var clicked = world.getSubjectAtPoint(point.x, point.y);
			if ( clicked ) {
				clicked.click();
			}
		}
		*/
	};
	
	this.getWorld = function() {
		return world;
	};
	
	this.getWorldPhysics = function() {
		return world.getPhysics();
	};
	
	this.getSurfaces = function() {
		var grounds = getSubjectsByType('ground');
		var ramps = getSubjectsByType('ramp');
		return [].concat(grounds, ramps);
	};
	
	this.getApp = function() {
		return app;
	};
	
	//================================
	// Private methods
	//================================

	function getSubjectsByType(type) {
		var units = world.getSubjects(function(subj) {
				return subj.type() === type;
			});
		return units;
	};
		
	//================================
	// Private vars
	//================================
	var self    = this;
	
	var huds    = [];
	var world   = new QQ.World();
	var camera  = null;
	var started = false;

	init(); 
};

QQ.Application.get().addSeizure('Game', QQ.GameSeizure);
