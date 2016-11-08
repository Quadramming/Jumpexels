//================================================================
// Name: QQ.World
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var Matter = Matter || alert('Need Matter enging');
var QQ = QQ || {};

QQ.World = function() {
	
	function init() {		
	};
	
	//================================
	// Public methods
	//================================
	
	this.addBackground = function(subj) {
		background = subj;
	};
	
	this.addSubject = function(subj) {
		subjects.push(subj);
		if ( subj.isPhysicsBody() ) {
			Matter.World.add(physics.world, [subj.getPhysicsBody()]);
		}
	};

	this.tick = function(delta) {
		for ( var i in subjects ) {
			subjects[i].tick(delta);
		}
	};
	
	this.createPhysics = function() {
		physics = Matter.Engine.create();
		physics.world.gravity.y = -0.0098;
		Matter.Engine.run(physics);
	};
	
	this.getSubjectsInRect = function(rect) {
		var result = [];
		if ( background !== null ) {
			background.fitInRect(rect);
			result.push(background);
		}
		for ( var i in subjects ) {
			var subj = subjects[i];
			if ( QQ.Math.isIntersect(rect, subj.getRect()) ) {
				result.push(subj); 
			}
		}
		return result;
	};
	
	this.getSubjectAtPoint = function(x, y) {
		for ( var i = subjects.length-1 ; i >= 0 ; --i ) {
			var subj = subjects[i];
			if ( QQ.Math.isInside(subj.getRect(), x, y) ) {
				return subj; 
			}
		}
	};
	
	this.getSubjects = function(pred) {
		var subjs = [];
		subjects.forEach(function (subj) {
			if ( pred === undefined || pred(subj) ) {
				subjs.push(subj);
			}
		});
		return subjs;
	};
	
	//================================
	// Private methods
	//================================

	

	//================================
	// Private vars
	//================================
	
	var self       = this;
	
	var subjects   = [];
	var background = null;
	var physics    = null;

	init(); 
};