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
	
	this.deleteSubject = function(subj) {
		var i = subjects.indexOf(subj);
		if ( subjects[i].isPhysicsBody() ) {
			Matter.Composite.remove(physics.world, subjects[i].getPhysicsBody());
		}
		if ( i > 0 ) {
			subjects.splice(i, 1);
		}
	};
	
	this.getSubjectByPhysics = function(body) {
		for ( var i in subjects ) {
			if ( subjects[i].getPhysicsBody() === body ) {
				return subjects[i];
			}
		}
	};
	
	this.tick = function(delta) {
		deltaAccum += delta;
		var ticksDone = 0;
		if ( deltaAccum < pauseTime ) {
			while ( deltaAccum > (maxTicks+1)*timeStep ) {
				deltaAccum -= timeStep;
			}
			while ( deltaAccum > timeStep ) {
				deltaAccum -= timeStep;
				for ( var i in subjects ) {
					subjects[i].tick(timeStep);
				}
				if ( physics ) {
					Matter.Engine.update(physics, QQ.Math.secToMs(timeStep));
				}
				ticksDone++;
			}
		} else {
			deltaAccum = 0;
			c('pause');
		}
		//c(ticksDone);
	};
	
	this.getPhysics = function() {
		return physics;
	};
	
	this.createPhysics = function() {
		physics = Matter.Engine.create();
		physics.world.gravity.y = -1;
		
		/*
		var render = Matter.Render.create({
			element: document.body,
			engine: physics,
			options: {
				width: 800,
				height: 600,
				pixelRatio: 1,
				background: '#fafafa',
				wireframeBackground: '#222',
				hasBounds: false,
				enabled: true,
				wireframes: true,
				showSleeping: true,
				showDebug: false,
				showBroadphase: false,
				showBounds: false,
				showVelocity: false,
				showCollisions: false,
				showSeparations: false,
				showAxes: false,
				showPositions: false,
				showAngleIndicator: false,
				showIds: false,
				showShadows: false,
				showVertexNumbers: false,
				showConvexHulls: false,
				showInternalEdges: false,
				showMousePosition: false
			}
		});
		Matter.Render.run(render);
		*/
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
	
	var maxTicks   = 5;
	var timeStep   = 0.0166;
	var deltaAccum = 0;
	var subjects   = [];
	var background = null;
	var physics    = null;
	var pauseTime  = 0.1;

	init(); 
};