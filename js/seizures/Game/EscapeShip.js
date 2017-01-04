'use strict';

QQ.Seizures.SeizureGame.EscapeShip = class EscapeShip extends QQ.Subject {
	
	constructor(config, game) {
		super('img/spaceShip.png', config.size.w, config.size.h);
		this.setDefaultPhysics({ isStatic: true, isSensor: true });
		
		const world   = game.getWorld();
		this._a       = 0;
		this._time    = 0;
		this._pivotX  = config.pos.x;
		this._pivotY  = config.pos.y;
		this._travelX = config.travel.w;
		this._travelY = config.travel.h;
		this._period  = config.period;
		
		Matter.Events.on(game.getWorldPhysics(), 'collisionStart', 
			(event) => {
				const pairs = event.pairs;
				const me    = this.getPhysicsBody();
				for ( let i = 0, j = pairs.length; i !== j; ++i ) {
					const pair = pairs[i];
					let escaped = null;
					if ( pair.bodyA === me ) {
						escaped = world.getSubjectByPhysics(pair.bodyB);
					} else if ( pair.bodyB === me ) {
						escaped = world.getSubjectByPhysics(pair.bodyA);
					}
					if ( escaped ) {
						escaped.escape();
					}
				}
			}
		);

		this.tick(0); // init params
	}
	
	tick(delta) {
		this._time += delta;
		this._time  = QQ.Math.devidePeriod(this._time, this._period);
		this._a     = this._time/this._period * QQ.Math.PIx2;
		Matter.Body.setPosition(this.getPhysicsBody(), {
			x: this._pivotX + this._travelX * Math.sin(this._a  ),
			y: this._pivotY + this._travelY * Math.sin(this._a*2)
		});
		this._physicsTick(delta);
	}
	
	getAngle() {
		return 0;
	}
	
	type() {
		return 'escapeShip';
	}
	
};
