'use strict';

QQ.Seizures.SeizureGame.Ramp = class Ramp extends QQ.Subject {
	
	constructor(config) {
		super('./img/ramp.png', config.size.w, config.size.h);
		this.setDefaultPhysics({ isStatic: true});
		this._pivotX = config.pos.x;
		this._prevX  = this._pivotX;
		this._pivotY = config.pos.y;
		this._period = config.period;
		this._time   = config.time || 0;
		this._range  = config.travel;
		this._angle  = 0;
	}
	
	
	tick(delta) {
		this._time += delta;
		this._time  = QQ.Math.devidePeriod(this._time, this._period);
		this._angle = this._time/this._period * QQ.Math.PIx2;
		const x = this._pivotX + this._range * Math.sin(this._angle);
		Matter.Body.setVelocity(this.getPhysicsBody(), { 
				x: x-this._prevX, 
				y: 0 
			});
		Matter.Body.setPosition(this.getPhysicsBody(), {
				x: x, 
				y: this._pivotY 
			});
		this._prevX = x;
		this._physicsTick(delta);
	}
	
	type() {
		return 'ramp';
	}
	
};
