'use strict';

QQ.Seizures.SeizureGame.Alien = class Alien extends QQ.Subject {
	
	constructor(config, game) {
		super('./img/animals/parrotSquare.png', 50, 50);
		this.setPosition(
				config.pos.x, config.pos.y, 
				QQ.Subject.pivot.CENTERBOTTOM
			);
		this.setPhysics(config.pos.x, config.pos.y, 50, 50);
		this._game         = game;
		this._timeToEscape = 300;
		this._startEscape  = 0;
	}
	
	escape() {
		if ( this._startEscape === 0 ) {
			this._startEscape = Date.now();
		}
	}
	
	jump() {
		const body     = this._physicsBody;
		const surfaces = this._game.getSurfaces();
		const pairs    = [];
		for ( const surface of surfaces ) {
			pairs.push([ body, surface.getPhysicsBody() ]);
		}
		const collisions = Matter.Detector.collisions(
				pairs, 
				this._game.getWorldPhysics()
			);
		for ( const collision of collisions ) {
			if ( collision.bodyA === body || collision.bodyB === body ) {
				const x = body.velocity.x;
				Matter.Body.setVelocity(body, { x : x, y : 10 });
			}
		}
	}
	
	tick(delta) {
		if ( this._startEscape > 0 ) {
			const alpha = 1 - QQ.Math.calcProgress(
					this._startEscape, 
					this._timeToEscape
				);
			this.setAlpha(alpha);
			if ( alpha === 0 ) {
				this._game.getWorld().deleteSubject(this);
			}
		} else {
			if ( this._game.getApp().isM1Pressed() ) {
				this.jump();
			}
		}
		this._physicsTick(delta);
	}
	
	type() {
		return 'alien';
	}
	
};
