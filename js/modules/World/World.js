//================================================================
// Name: QQ.World
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global Matter */
'use strict';

QQ.World = class World {
	
	constructor() {
		this._maxTicks   = 5;
		this._timeStep   = 0.0166;
		this._deltaAccum = 0;
		this._subjects   = [];
		this._background = null;
		this._physics    = null;
		this._pauseTime  = 0.5;
		this._pauseable  = false;
		this._collisions = [];
	}
	
	setPauseable(v) {
		this._pauseable = v;
	}
	
	addBackground(url) {
		this._background = new QQ.Subject(url);
	}
	
	addSubject(subj) {
		this._subjects.push(subj);
		if ( subj.isPhysicsBody() ) {
			Matter.World.add(this._physics.world, [subj.getPhysicsBody()]);
		}
	}
	
	deleteSubject(subj) {
		const i = this._subjects.indexOf(subj);
		if ( this._subjects[i].isPhysicsBody() ) {
			Matter.Composite.remove(
					this._physics.world, 
					this._subjects[i].getPhysicsBody()
				);
		}
		if ( i > 0 ) {
			this._subjects.splice(i, 1);
		}
	}
	
	getSubjectByPhysics(body) {
		for ( const subj of this._subjects ) {
			if ( subj.getPhysicsBody() === body ) {
				return subj;
			}
		}
	}
	
	tick(delta) {
		this._deltaAccum += delta;
		let ticksDone = 0;
		if ( this._deltaAccum < this._pauseTime ) {
			while ( this._deltaAccum > (this._maxTicks+1)*this._timeStep ) {
				this._deltaAccum -= this._timeStep;
			}
			while ( this._deltaAccum > this._timeStep ) {
				this._deltaAccum -= this._timeStep;
				for ( const subj of this._subjects ) {
					subj.tick(this._timeStep);
				}
				if ( this._physics ) {
					this._collisions = [];
					Matter.Engine.update(
							this._physics, 
							QQ.Math.secToMs(this._timeStep)
						);
				}
				ticksDone++;
			}
		} else {
			this._deltaAccum = 0;
			if ( this._pauseable ) {
				QQ.application.pause();
			}
		}
	}
	
	getPhysics() {
		return this._physics;
	}
	
	createPhysics() {
		this._physics = Matter.Engine.create();
		this._physics.velocityIterations = 3;
		this._physics.positionIterations = 3;
		this._physics.world.gravity.y    = -1;
		this._physics.timing.timeScale   = 1;
		
		
		const fillCollisions = (collisions) => {
			for ( const pair of collisions.pairs ) {
				this._collisions.push(pair);
			}
		};
		Matter.Events.on(this._physics, "collisionStart",  fillCollisions);
		Matter.Events.on(this._physics, "collisionActive", fillCollisions);
		
		/*
		const render = Matter.Render.create({
			element: document.body,
			engine: this._physics,
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
				showCollisions: true,
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
	}
	
	getCollisions() {
		return this._collisions;
	}
	
	getSubjectsInRect(rect) {
		const result = [];
		if ( this._background !== null ) {
			this._background.fitInRect(rect);
			result.push(this._background);
		}
		for ( const subj of this._subjects ) {
			if ( QQ.Math.isIntersect(rect, subj.getRect()) ) {
				result.push(subj); 
			}
		}
		return result;
	}
	
	getSubjectAtPoint(x, y) {
		for ( let i = this._subjects.length-1 ; i >= 0 ; --i ) {
			const subj = this._subjects[i];
			if ( QQ.Math.isInside(subj.getRect(), x, y) ) {
				return subj; 
			}
		}
	}
	
	getSubjects(pred = ()=>true) {
		const subjs = [];
		this._subjects.forEach(function (subj) {
			if ( pred(subj) ) {
				subjs.push(subj);
			}
		});
		return subjs;
	}
	
};
