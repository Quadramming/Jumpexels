'use strict';

QQ.Seizures.SeizureGame.EscapeShip = class EscapeShip extends QQ.Subject {
	
	constructor(config, game) {
		super('img/spaceShip.png', config.size.w, config.size.h);
		this.setDefaultPhysics({ isStatic: true, isSensor: true });
		
		const world   = game.getWorld();
		this._a       = 0;
		this._time    = 0;
		this._pivot   = config.pos;
		this._travel  = config.travel;
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
		this.tick(0);
	}
	
	tick(delta) {
		this._time += delta;
		this._time  = QQ.Math.devidePeriod(this._time, this._period);
		this._a     = this._time/this._period * QQ.Math.PIx2;
		Matter.Body.setPosition(this.getPhysicsBody(), {
			x: this._pivot.x + this._travel.w * Math.sin(this._a  ),
			y: this._pivot.y + this._travel.h * Math.sin(this._a*2)
		});
		this._physicsTick(delta);
	}
	
	type() {
		return 'escapeShip';
	}
	
};
