QQ.Seizures.SeizureGame.Alien = class Alien extends QQ.SubjectPhysics {
	
	constructor(config, game) {
		super({}, 'img/aliens/parrot.png', 50, 50);
		this.setPosition(
			config.pos.x, config.pos.y,
			QQ.Math.pivot.CENTERBOTTOM
		);
		this.setPhysics(config.pos.x, config.pos.y, 50, 50);
		this._game         = game;
		this._timeToEscape = 300;
		this._startEscape  = 0;
		this._jumped       = false;
		this.tick(0);
	}
	
	escape() {
		if ( this._startEscape === 0 ) {
			this._startEscape = Date.now();
		}
	}
	
	jump() {
		const body     = this._physicsBody;
		const surfaces = this._game.getSurfaces();
		const surfs    = [];
		for ( let surface of surfaces ) {
			surfs.push(surface.getPhysicsBody());
		}
		const collisions = this._game.getWorld().getCollisions();
		for ( let collision of collisions ) {
			var isBodyA =
					collision.bodyA === body &&
					collision.bodyA.position.y > collision.bodyB.bounds.max.y &&
					surfs.indexOf(collision.bodyB) >= 0;
			var isBodyB =
					collision.bodyB === body &&
					collision.bodyB.position.y > collision.bodyA.bounds.max.y &&
					surfs.indexOf(collision.bodyA) >= 0;
			if ( isBodyA || isBodyB ) {
				const x = body.velocity.x;
				Matter.Body.setVelocity(body, { x : x*1.5, y : 10 });
				if ( body.angularSpeed < 1e-5 ) {
					const angularSpeed = QQ.Math.rand(-1, 1, false) / 1000;
					Matter.Body.setAngularVelocity(body, angularSpeed);
				}
				this._jumped = true;
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
			if ( this._game.isClicked() && ! this._jumped ) {
				this.jump();
			}
			if ( ! this._game.isClicked() && this._jumped ) {
				this._jumped = false;
			}
		}
		super.tick(delta);
	}
	
	click() {
	}
	
	type() {
		return 'alien';
	}
	
};
