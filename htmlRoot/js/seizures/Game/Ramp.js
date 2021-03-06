game.seizures.Game.Ramp = class Ramp extends QQ.Subject.Physics {
	
	constructor(app, config) {
		super(
				app,
				{ isStatic: true },
				'img/ramp.png',
				config.size.w,
				config.size.h
			);
		this._time = config.time || 0;
		this._prev = {x : 0, y : 0};
		if ( config.pos ) {
			this._pivot  = { x : config.pos.x, y : config.pos.y };
			this._period = config.period;
			this._range  = config.travel;
		} else {
			this._f      = config.f;
			Matter.Body.setPosition(this._physicsBody, this._f(0));
		}
		this.tick(0);
	}
	
	tick(delta) {
		this._time     += delta;
		let pos         = {};
		if ( this._f ) {
			pos         = this._f(this._time);
		} else {
			this._a     = this._time/this._period * QQ.Math.PIx2;
			pos.x       = this._pivot.x + this._range * Math.sin(this._a);
			pos.y       = this._pivot.y;
		}
		Matter.Body.setVelocity(this._physicsBody, {
				x: pos.x - this._prev.x,
				y: pos.y - this._prev.y
			});
		Matter.Body.setPosition(this._physicsBody, pos);
		this._prev      = pos;
		super.tick(delta);
	}
	
	type() {
		return 'ramp';
	}
	
};
